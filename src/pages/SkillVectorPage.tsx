import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { SkillChip } from "../components/common/SkillChip";
import { StatusBadge } from "../components/common/StatusBadge";
import { useActs } from "../context/AppContext";
import { occupationRequirements, skillCatalog } from "../data/mockData";
import type { SkillProfile } from "../types";

function createSkillFromCatalog(skillId: string): SkillProfile {
  const skill = skillCatalog.find((item) => item.id === skillId);

  return {
    id: skill?.id ?? skillId,
    name: skill?.name ?? skillId,
    category: skill?.category ?? "Core",
    proficiency: 3,
    targetLevel: 4,
    source: "Profile Input",
  };
}

export function SkillVectorPage() {
  const navigate = useNavigate();
  const { profile, skills, saveSkills } = useActs();
  const [draftSkills, setDraftSkills] = useState<SkillProfile[]>(skills);

  useEffect(() => {
    setDraftSkills(skills);
  }, [skills]);

  const requirement = occupationRequirements.find(
    (item) => item.occupation === profile.targetOccupation,
  );

  const toggleSkill = (skillId: string) => {
    setDraftSkills((current) => {
      const exists = current.find((item) => item.id === skillId);

      if (exists) {
        return current.filter((item) => item.id !== skillId);
      }

      return [...current, createSkillFromCatalog(skillId)];
    });
  };

  const updateLevel = (
    skillId: string,
    field: "proficiency" | "targetLevel",
    value: number,
  ) => {
    setDraftSkills((current) =>
      current.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              [field]: value,
            }
          : skill,
      ),
    );
  };

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Skill Vector Representation Module"
        title="Transform raw skills into structured ACTS inputs"
        description="Edit the skill vector that ACTS will use for occupation transition logic, readiness scoring, and skill gap comparison. O*NET occupation-skill references guide the mapping preview."
        breadcrumbs={[
          { label: "Student Workspace", href: "/dashboard" },
          { label: "Skill Profile" },
        ]}
        actions={
          <button
            type="button"
            onClick={() => {
              saveSkills(draftSkills);
              navigate("/run-simulation");
            }}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Continue to simulation
          </button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
                  Selected skills
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Profile-to-vector conversion
                </h2>
              </div>
              <StatusBadge label={`${draftSkills.length} vector dimensions`} tone="accent" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {skillCatalog.map((skill) => (
                <SkillChip
                  key={skill.id}
                  label={skill.name}
                  category={skill.category}
                  active={draftSkills.some((item) => item.id === skill.id)}
                  onClick={() => toggleSkill(skill.id)}
                />
              ))}
            </div>
          </div>

          <div className="surface-card p-6">
            <p className="text-sm font-semibold text-slate-900">Skill proficiency controls</p>
            <div className="mt-5 space-y-5">
              {draftSkills.map((skill) => (
                <div key={skill.id} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{skill.name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {skill.category} • {skill.source}
                      </p>
                    </div>
                    <StatusBadge label={`Weight ${(skill.proficiency / 5).toFixed(2)}`} tone="teal" />
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-700">
                        Current proficiency: {skill.proficiency}/5
                      </span>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={skill.proficiency}
                        onChange={(event) =>
                          updateLevel(skill.id, "proficiency", Number(event.target.value))
                        }
                        className="w-full accent-accent-600"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-700">
                        Target level: {skill.targetLevel}/5
                      </span>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={skill.targetLevel}
                        onChange={(event) =>
                          updateLevel(skill.id, "targetLevel", Number(event.target.value))
                        }
                        className="w-full accent-teal-600"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
              O*NET-informed preview
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              Mapping against {profile.targetOccupation}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The preview below suggests how raw profile skills are normalized into ACTS inputs and
              compared with reference requirements from the O*NET occupational dataset.
            </p>
            <div className="mt-5 overflow-hidden rounded-3xl border border-slate-100">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 text-left text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Skill</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Vector weight</th>
                    <th className="px-4 py-3 font-semibold">Reference fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {draftSkills.map((skill) => {
                    const required = requirement?.requiredSkills.find(
                      (item) => item.skill === skill.name,
                    );

                    return (
                      <tr key={skill.id}>
                        <td className="px-4 py-4 font-medium text-slate-900">{skill.name}</td>
                        <td className="px-4 py-4 text-slate-600">{skill.category}</td>
                        <td className="px-4 py-4 text-slate-600">
                          {(skill.proficiency / 5).toFixed(2)}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge
                            label={required ? `Mapped to level ${required.requiredLevel}` : "Supportive skill"}
                            tone={required ? "teal" : "slate"}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="surface-card p-6">
            <p className="text-sm font-semibold text-slate-900">Structured input notes</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">Profile Input Handler:</span> provides
                the raw skill selections and user-declared capabilities.
              </p>
              <p>
                <span className="font-semibold text-slate-800">Skill Vector Representation:</span> encodes
                category, current proficiency, target level, and source metadata.
              </p>
              <p>
                <span className="font-semibold text-slate-800">Reference data:</span> O*NET mappings help
                determine which skills most strongly influence occupation transitions and gap analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
