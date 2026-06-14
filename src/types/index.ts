export type UserRole = "student" | "employer";

export type ConfidenceLevel = "High" | "Moderate" | "Exploratory";
export type GapStatus = "Matched" | "Partial" | "Gap";
export type PriorityLevel = "High" | "Medium" | "Low";

export interface UserProfile {
  fullName: string;
  educationLevel: string;
  degree: string;
  specialization: string;
  currentOccupation: string;
  targetOccupation: string;
  yearsExperience: number;
  careerInterests: string[];
  preferredIndustry: string;
  preferredRegion: string;
  desiredSkills: string[];
  certifications: string[];
  summary: string;
}

export interface SkillProfile {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  targetLevel: number;
  source: "Profile Input" | "O*NET Mapping" | "Career Interest";
}

export interface SimulationSettings {
  targetOccupation: string;
  planningHorizon: "1 Year" | "3 Years" | "5 Years";
  simulationRuns: number;
  riskPreference: "Conservative" | "Balanced" | "Exploratory";
  preferredIndustries: string[];
  includeSkillGapRecommendations: boolean;
}

export interface PathwayTransition {
  stage: string;
  role: string;
  probability: number;
  skills: string[];
}

export interface CareerPathway {
  id: string;
  label: string;
  probability: number;
  confidence: ConfidenceLevel;
  narrative: string;
  transitions: PathwayTransition[];
  likelyNextRole: string;
  expectedReadiness: string;
  riskNote: string;
}

export interface DistributionPoint {
  name: string;
  probability: number;
}

export interface SimulationTrajectoryRow {
  id: string;
  scenario: string;
  probability: number;
  timeline: string;
  industry: string;
  readiness: string;
}

export interface SkillGap {
  skill: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  status: GapStatus;
  priority: PriorityLevel;
  recommendation: string;
}

export interface LearningAction {
  title: string;
  type: "Course" | "Certification" | "Project" | "Mentorship";
  duration: string;
  outcome: string;
}

export interface SimulationResult {
  id: string;
  createdAt: string;
  targetOccupation: string;
  topOutcome: string;
  settings: SimulationSettings;
  pathways: CareerPathway[];
  distribution: DistributionPoint[];
  trajectories: SimulationTrajectoryRow[];
  skillGaps: SkillGap[];
  learningActions: LearningAction[];
  uncertaintyNote: string;
  dataSources: string[];
  isSaved: boolean;
}

export interface OccupationRequirement {
  occupation: string;
  summary: string;
  requiredSkills: Array<{
    skill: string;
    category: string;
    requiredLevel: number;
  }>;
  nextRoles: string[];
  industries: string[];
  certifications: string[];
}

export interface NotificationMessage {
  id: string;
  tone: "success" | "info";
  title: string;
  message: string;
}

export interface EmployerMetric {
  label: string;
  value: string;
  delta: string;
  tone: "accent" | "teal" | "plum";
}

export interface EmployerTrendPoint {
  month: string;
  pathwayConfidence: number;
  readiness: number;
}

export interface EmployerSkillDemand {
  skill: string;
  demand: number;
  readiness: number;
}

export interface EmployerReadinessRow {
  pathway: string;
  averageReadiness: number;
  skillGapIndex: number;
  hiringSignal: string;
}

export type CompanyVerificationStatus = "Unverified" | "Pending Review" | "Verified";

export interface EmployerCompanyProfile {
  companyName: string;
  industry: string;
  headquarters: string;
  website: string;
  registrationId: string;
  companySize: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  verificationStatus: CompanyVerificationStatus;
  verificationNotes: string;
}

export interface EmployerHiringPreset {
  targetOccupations: string[];
  preferredEducation: string;
  preferredExperience: string;
  minimumReadiness: number;
  prioritySkills: string[];
  preferredWorkModes: string[];
  notes: string;
}

export interface JobPosting {
  id: string;
  title: string;
  companyName: string;
  industry: string;
  location: string;
  workMode: string;
  employmentType: string;
  salaryRange: string;
  summary: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  minimumReadiness: number;
  occupationTrack: string;
  postedAt: string;
  verificationStatus: CompanyVerificationStatus;
}

export interface DemoStudentAccount {
  id: string;
  email: string;
  password: string;
  profile: UserProfile;
  skills: SkillProfile[];
  simulationSettings: SimulationSettings;
}

export interface RegisteredStudentAccount {
  id: string;
  username: string;
  password: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  age: number;
  institution: string;
  createdAt: string;
  profile: UserProfile;
  skills: SkillProfile[];
  simulationSettings: SimulationSettings;
}

export interface RegisteredEmployerAccount {
  id: string;
  username: string;
  password: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  companyProfile: EmployerCompanyProfile;
  hiringPreset: EmployerHiringPreset;
}

export interface ActsStoredState {
  role: UserRole | null;
  profile: UserProfile;
  skills: SkillProfile[];
  simulationSettings: SimulationSettings;
  latestResult: SimulationResult | null;
  history: SimulationResult[];
  registeredStudentAccounts: RegisteredStudentAccount[];
  registeredEmployerAccounts: RegisteredEmployerAccount[];
  employerCompanyProfile: EmployerCompanyProfile;
  employerHiringPreset: EmployerHiringPreset;
  jobPostings: JobPosting[];
}
