import {
  defaultSimulationSettings,
  occupationRequirements,
  pathwayTemplates,
} from "../data/mockData";
import type {
  CareerPathway,
  ConfidenceLevel,
  LearningAction,
  OccupationRequirement,
  SimulationResult,
  SimulationSettings,
  SkillGap,
  SkillProfile,
  UserProfile,
} from "../types";

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `acts-${Date.now()}-${Math.round(Math.random() * 1000)}`;
}

function normalizeTargetOccupation(targetOccupation: string): OccupationRequirement {
  const exactMatch = occupationRequirements.find(
    (item) => item.occupation === targetOccupation,
  );

  if (exactMatch) {
    return exactMatch;
  }

  return (
    occupationRequirements.find((item) =>
      targetOccupation.toLowerCase().includes(item.occupation.toLowerCase()),
    ) ?? occupationRequirements[0]
  );
}

function adjustProbabilities(
  basePathways: CareerPathway[],
  settings: SimulationSettings,
  readinessScore: number,
): CareerPathway[] {
  const topBoost = settings.riskPreference === "Conservative" ? 4 : readinessScore > 72 ? 2 : 0;
  const diversify =
    settings.riskPreference === "Exploratory"
      ? 3
      : settings.planningHorizon === "5 Years"
        ? 2
        : 0;

  const adjusted = basePathways.map((path, index) => {
    const probabilityShift = index === 0 ? topBoost : index === 2 ? diversify : 0;
    return {
      ...path,
      probability: Math.max(12, path.probability + probabilityShift - (index === 1 ? 1 : 0)),
    };
  });

  const total = adjusted.reduce((sum, item) => sum + item.probability, 0);

  return adjusted.map((item, index) => ({
    ...item,
    probability:
      index === adjusted.length - 1
        ? 100 -
          adjusted
            .slice(0, -1)
            .reduce(
              (sum, current) =>
                sum + Math.round((current.probability / total) * 100),
              0,
            )
        : Math.round((item.probability / total) * 100),
  }));
}

export function buildSkillGaps(
  skills: SkillProfile[],
  targetOccupation: string,
): SkillGap[] {
  const requirement = normalizeTargetOccupation(targetOccupation);

  return requirement.requiredSkills.map((required) => {
    const current = skills.find((skill) => skill.name === required.skill);
    const currentLevel = current?.proficiency ?? 1;
    const delta = required.requiredLevel - currentLevel;
    const status: SkillGap["status"] =
      delta <= 0 ? "Matched" : delta === 1 ? "Partial" : "Gap";
    const priority: SkillGap["priority"] =
      delta >= 2 ? "High" : delta === 1 ? "Medium" : "Low";

    return {
      skill: required.skill,
      category: required.category,
      currentLevel,
      requiredLevel: required.requiredLevel,
      status,
      priority,
      recommendation:
        status === "Matched"
          ? "Maintain evidence through projects or work samples."
          : status === "Partial"
            ? "Strengthen with a targeted case study or supervised practice."
            : "Prioritize guided learning and portfolio evidence before the next transition step.",
    };
  });
}

export function calculateReadinessScore(
  skills: SkillProfile[],
  targetOccupation: string,
): number {
  const gaps = buildSkillGaps(skills, targetOccupation);
  const totalPossible = gaps.reduce((sum, gap) => sum + gap.requiredLevel, 0);
  const currentTotal = gaps.reduce(
    (sum, gap) => sum + Math.min(gap.currentLevel, gap.requiredLevel),
    0,
  );

  return Math.round((currentTotal / totalPossible) * 100);
}

function buildLearningActions(targetOccupation: string): LearningAction[] {
  const requirement = normalizeTargetOccupation(targetOccupation);

  return requirement.certifications.map((certification, index) => ({
    title: certification,
    type: index === 0 ? "Certification" : "Course",
    duration: index === 0 ? "6-8 weeks" : "3-4 weeks",
    outcome:
      index === 0
        ? `Improves readiness for ${targetOccupation} transition checkpoints.`
        : `Builds supporting capability for ${targetOccupation} role expectations.`,
  }));
}

function buildTrajectories(pathways: CareerPathway[], settings: SimulationSettings) {
  return pathways.map((path) => ({
    id: path.id,
    scenario: path.label,
    probability: path.probability,
    timeline: path.transitions.map((item) => item.role).join(" -> "),
    industry: settings.preferredIndustries[0] ?? "Technology",
    readiness: path.expectedReadiness,
  }));
}

export function generateSimulationResult(
  profile: UserProfile,
  skills: SkillProfile[],
  providedSettings: SimulationSettings,
): SimulationResult {
  const settings = { ...defaultSimulationSettings, ...providedSettings };
  const requirement = normalizeTargetOccupation(settings.targetOccupation);
  const basePathways =
    pathwayTemplates[requirement.occupation] ?? pathwayTemplates["Product Analyst"];
  const readinessScore = calculateReadinessScore(skills, settings.targetOccupation);
  const pathways = adjustProbabilities(basePathways, settings, readinessScore).map(
    (path, index) => {
      const confidence: ConfidenceLevel =
        index === 0 && readinessScore >= 74
          ? "High"
          : index === 2 || settings.riskPreference === "Exploratory"
            ? "Exploratory"
            : "Moderate";

      return {
        ...path,
        transitions: path.transitions.map((transition, transitionIndex) => ({
          ...transition,
          role:
            transitionIndex === 0
              ? profile.currentOccupation || transition.role
              : transition.role,
        })),
        confidence,
      };
    },
  );

  return {
    id: createId(),
    createdAt: new Date().toISOString(),
    targetOccupation: settings.targetOccupation,
    topOutcome:
      pathways[0]?.transitions[pathways[0].transitions.length - 1]?.role ??
      settings.targetOccupation,
    settings,
    pathways,
    distribution: pathways.map((path) => ({
      name: path.label,
      probability: path.probability,
    })),
    trajectories: buildTrajectories(pathways, settings),
    skillGaps: buildSkillGaps(skills, settings.targetOccupation),
    learningActions: buildLearningActions(settings.targetOccupation),
    uncertaintyNote:
      "ACTS estimates probabilistic pathways under uncertainty. Results illustrate likely trajectories, not guaranteed outcomes.",
    dataSources: [
      "Profile Input Handler",
      "Skill Vector Representation Module",
      "Markov Chain Career Transition Model",
      "Monte Carlo Simulation Engine",
      "O*NET Occupational Dataset",
    ],
    isSaved: true,
  };
}
