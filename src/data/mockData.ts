import type {
  CareerPathway,
  DemoStudentAccount,
  EmployerCompanyProfile,
  EmployerHiringPreset,
  EmployerMetric,
  EmployerReadinessRow,
  EmployerSkillDemand,
  EmployerTrendPoint,
  JobPosting,
  OccupationRequirement,
  SimulationSettings,
  SkillProfile,
  UserProfile,
} from "../types";

export const educationLevels = [
  "Bachelor's Degree",
  "Master's Degree",
  "Diploma",
  "Professional Certification",
];

export const industries = [
  "Technology",
  "Consulting",
  "Financial Services",
  "Human Resources",
  "Consumer Goods",
  "Logistics",
  "Healthcare",
];

export const regions = [
  "Kuala Lumpur",
  "Selangor",
  "Penang",
  "Johor",
  "Remote / Hybrid",
  "Singapore Corridor",
];

export const careerInterestOptions = [
  "Analytics",
  "Talent Strategy",
  "Product Strategy",
  "Operations Leadership",
  "User Research",
  "Digital Transformation",
];

export const skillCatalog = [
  { id: "sql", name: "SQL", category: "Analytical" },
  { id: "excel", name: "Excel", category: "Analytical" },
  { id: "communication", name: "Communication", category: "Core" },
  { id: "data-visualization", name: "Data Visualization", category: "Analytical" },
  { id: "stakeholder-management", name: "Stakeholder Management", category: "Business" },
  { id: "python", name: "Python", category: "Analytical" },
  { id: "research-methods", name: "Research Methods", category: "Research" },
  { id: "recruitment", name: "Recruitment", category: "Talent" },
  { id: "project-planning", name: "Project Planning", category: "Operations" },
  { id: "problem-solving", name: "Problem Solving", category: "Core" },
  { id: "critical-thinking", name: "Critical Thinking", category: "Core" },
  { id: "report-writing", name: "Report Writing", category: "Communication" },
  { id: "power-bi", name: "Power BI", category: "Analytical" },
  { id: "market-analysis", name: "Market Analysis", category: "Strategy" },
  { id: "organizational-skills", name: "Organizational Skills", category: "Operations" },
  { id: "user-interviews", name: "User Interviews", category: "Research" },
  { id: "workflow-design", name: "Workflow Design", category: "Operations" },
  { id: "people-analytics", name: "People Analytics", category: "Talent" },
];

export const occupationRequirements: OccupationRequirement[] = [
  {
    occupation: "Data Scientist",
    summary:
      "Applies statistical reasoning, programming, and model interpretation to generate predictive insights and advanced analytics products.",
    requiredSkills: [
      { skill: "SQL", category: "Analytical", requiredLevel: 5 },
      { skill: "Python", category: "Analytical", requiredLevel: 5 },
      { skill: "Data Visualization", category: "Analytical", requiredLevel: 4 },
      { skill: "Research Methods", category: "Research", requiredLevel: 4 },
      { skill: "Critical Thinking", category: "Core", requiredLevel: 5 },
      { skill: "Communication", category: "Core", requiredLevel: 4 },
    ],
    nextRoles: ["Senior Data Scientist", "Lead Data Scientist", "AI Solutions Specialist"],
    industries: ["Technology", "Financial Services", "Healthcare"],
    certifications: ["Machine Learning Specialization", "Advanced SQL for Analytics"],
  },
  {
    occupation: "Product Analyst",
    summary:
      "Combines business insight, analytical skill, and stakeholder communication to inform product decisions.",
    requiredSkills: [
      { skill: "SQL", category: "Analytical", requiredLevel: 4 },
      { skill: "Data Visualization", category: "Analytical", requiredLevel: 4 },
      { skill: "Stakeholder Management", category: "Business", requiredLevel: 4 },
      { skill: "Research Methods", category: "Research", requiredLevel: 3 },
      { skill: "Critical Thinking", category: "Core", requiredLevel: 5 },
      { skill: "Market Analysis", category: "Strategy", requiredLevel: 4 },
    ],
    nextRoles: ["Senior Product Analyst", "Product Strategy Associate", "Growth Analyst"],
    industries: ["Technology", "Financial Services", "Consumer Goods"],
    certifications: ["Product Analytics Micro-Credential", "Power BI Associate"],
  },
  {
    occupation: "Talent Acquisition Specialist",
    summary:
      "Focuses on sourcing, candidate assessment, and talent pipeline development using structured hiring processes.",
    requiredSkills: [
      { skill: "Communication", category: "Core", requiredLevel: 5 },
      { skill: "Recruitment", category: "Talent", requiredLevel: 4 },
      { skill: "Stakeholder Management", category: "Business", requiredLevel: 4 },
      { skill: "Report Writing", category: "Communication", requiredLevel: 3 },
      { skill: "People Analytics", category: "Talent", requiredLevel: 3 },
      { skill: "Organizational Skills", category: "Operations", requiredLevel: 4 },
    ],
    nextRoles: ["HR Analyst", "Talent Strategy Associate", "Employer Branding Executive"],
    industries: ["Human Resources", "Technology", "Healthcare"],
    certifications: ["Certified Talent Sourcing Specialist", "HR Analytics Fundamentals"],
  },
  {
    occupation: "Operations Manager",
    summary:
      "Coordinates process performance, project delivery, and cross-functional execution across operations teams.",
    requiredSkills: [
      { skill: "Project Planning", category: "Operations", requiredLevel: 5 },
      { skill: "Workflow Design", category: "Operations", requiredLevel: 4 },
      { skill: "Stakeholder Management", category: "Business", requiredLevel: 4 },
      { skill: "Organizational Skills", category: "Operations", requiredLevel: 5 },
      { skill: "Problem Solving", category: "Core", requiredLevel: 5 },
      { skill: "Excel", category: "Analytical", requiredLevel: 4 },
    ],
    nextRoles: ["Senior Operations Manager", "Program Manager", "Operations Strategy Lead"],
    industries: ["Logistics", "Consumer Goods", "Healthcare"],
    certifications: ["Lean Six Sigma Yellow Belt", "Project Management Essentials"],
  },
  {
    occupation: "Data Analyst",
    summary:
      "Extracts, models, and communicates data insights to support planning and strategic decision making.",
    requiredSkills: [
      { skill: "SQL", category: "Analytical", requiredLevel: 5 },
      { skill: "Python", category: "Analytical", requiredLevel: 4 },
      { skill: "Power BI", category: "Analytical", requiredLevel: 4 },
      { skill: "Excel", category: "Analytical", requiredLevel: 4 },
      { skill: "Report Writing", category: "Communication", requiredLevel: 3 },
      { skill: "Critical Thinking", category: "Core", requiredLevel: 4 },
    ],
    nextRoles: ["Business Intelligence Analyst", "Analytics Consultant", "Product Analyst"],
    industries: ["Technology", "Financial Services", "Consulting"],
    certifications: ["Data Analytics Certificate", "Microsoft Power BI Data Analyst"],
  },
];

function makeSkillProfile(
  id: string,
  proficiency: number,
  targetLevel: number,
  source: SkillProfile["source"] = "Profile Input",
): SkillProfile {
  const skill = skillCatalog.find((item) => item.id === id);

  return {
    id,
    name: skill?.name ?? id,
    category: skill?.category ?? "Core",
    proficiency,
    targetLevel,
    source,
  };
}

function makeSimulationSettings(
  targetOccupation: SimulationSettings["targetOccupation"],
  preferredIndustries: string[],
  planningHorizon: SimulationSettings["planningHorizon"],
  simulationRuns: number,
  riskPreference: SimulationSettings["riskPreference"],
): SimulationSettings {
  return {
    targetOccupation,
    planningHorizon,
    simulationRuns,
    riskPreference,
    preferredIndustries,
    includeSkillGapRecommendations: true,
  };
}

export const demoStudentAccounts: DemoStudentAccount[] = [
  {
    id: "abdul-basit",
    email: "abdul.basit@acts.my",
    password: "12345",
    profile: {
      fullName: "Abdul Basit",
      educationLevel: "Bachelor's Degree",
      degree: "Bachelor of Computer Science",
      specialization: "Data Science",
      currentOccupation: "Data Scientist",
      targetOccupation: "Data Scientist",
      yearsExperience: 2,
      careerInterests: ["Analytics", "Digital Transformation"],
      preferredIndustry: "Technology",
      preferredRegion: "Kuala Lumpur",
      desiredSkills: ["Research Methods", "Power BI", "Communication"],
      certifications: ["Google Data Analytics Certificate"],
      summary:
        "Early-career data scientist building toward senior applied analytics roles with stronger experimentation and insight communication capability.",
    },
    skills: [
      makeSkillProfile("sql", 5, 5),
      makeSkillProfile("python", 5, 5),
      makeSkillProfile("data-visualization", 4, 5),
      makeSkillProfile("communication", 4, 4),
      makeSkillProfile("critical-thinking", 5, 5, "Career Interest"),
      makeSkillProfile("research-methods", 3, 4, "O*NET Mapping"),
      makeSkillProfile("power-bi", 4, 4),
    ],
    simulationSettings: makeSimulationSettings(
      "Data Scientist",
      ["Technology", "Financial Services"],
      "3 Years",
      6500,
      "Balanced",
    ),
  },
  {
    id: "hysam",
    email: "hysam@acts.my",
    password: "123456",
    profile: {
      fullName: "Hysam",
      educationLevel: "Bachelor's Degree",
      degree: "Bachelor of Information Technology",
      specialization: "IT Systems",
      currentOccupation: "IT Major",
      targetOccupation: "Data Analyst",
      yearsExperience: 1,
      careerInterests: ["Analytics", "Digital Transformation"],
      preferredIndustry: "Technology",
      preferredRegion: "Selangor",
      desiredSkills: ["SQL", "Power BI", "Report Writing"],
      certifications: ["IT Support Fundamentals"],
      summary:
        "IT major exploring data-facing roles and dashboard-driven decision support within business and technology teams.",
    },
    skills: [
      makeSkillProfile("sql", 3, 5),
      makeSkillProfile("excel", 4, 4),
      makeSkillProfile("communication", 4, 4),
      makeSkillProfile("problem-solving", 4, 5, "Career Interest"),
      makeSkillProfile("report-writing", 3, 4),
      makeSkillProfile("power-bi", 2, 4, "O*NET Mapping"),
      makeSkillProfile("project-planning", 3, 3),
    ],
    simulationSettings: makeSimulationSettings(
      "Data Analyst",
      ["Technology", "Consulting"],
      "3 Years",
      5000,
      "Balanced",
    ),
  },
  {
    id: "lin-tun-oo",
    email: "lin.tunoo@acts.my",
    password: "1234567",
    profile: {
      fullName: "Lin Tun Oo",
      educationLevel: "Bachelor's Degree",
      degree: "Bachelor of Computer Science",
      specialization: "Computer Science",
      currentOccupation: "Computer Science Major",
      targetOccupation: "Product Analyst",
      yearsExperience: 1,
      careerInterests: ["Analytics", "Product Strategy", "User Research"],
      preferredIndustry: "Technology",
      preferredRegion: "Penang",
      desiredSkills: ["Market Analysis", "Research Methods", "Stakeholder Management"],
      certifications: ["Intro to Product Analytics"],
      summary:
        "Computer science major interested in moving into analytical product support roles with stronger user and market insight exposure.",
    },
    skills: [
      makeSkillProfile("sql", 3, 4),
      makeSkillProfile("data-visualization", 3, 4),
      makeSkillProfile("communication", 4, 4),
      makeSkillProfile("critical-thinking", 4, 5, "Career Interest"),
      makeSkillProfile("research-methods", 3, 4),
      makeSkillProfile("market-analysis", 2, 4, "O*NET Mapping"),
      makeSkillProfile("stakeholder-management", 3, 4),
    ],
    simulationSettings: makeSimulationSettings(
      "Product Analyst",
      ["Technology", "Consumer Goods"],
      "3 Years",
      5200,
      "Balanced",
    ),
  },
  {
    id: "poh-xin-kat",
    email: "poh.xinkat@acts.my",
    password: "12345678",
    profile: {
      fullName: "Poh Xin Kat",
      educationLevel: "Bachelor's Degree",
      degree: "Bachelor of Computer Science",
      specialization: "Software Engineering",
      currentOccupation: "Computer Science Major",
      targetOccupation: "Data Analyst",
      yearsExperience: 1,
      careerInterests: ["Analytics", "Operations Leadership"],
      preferredIndustry: "Financial Services",
      preferredRegion: "Kuala Lumpur",
      desiredSkills: ["Python", "Power BI", "Report Writing"],
      certifications: ["Python for Everybody"],
      summary:
        "Computer science major aiming to strengthen technical analytics skills and communicate insights more effectively in business environments.",
    },
    skills: [
      makeSkillProfile("sql", 4, 5),
      makeSkillProfile("python", 3, 4),
      makeSkillProfile("excel", 4, 4),
      makeSkillProfile("data-visualization", 3, 4),
      makeSkillProfile("problem-solving", 4, 5, "Career Interest"),
      makeSkillProfile("critical-thinking", 4, 5, "Career Interest"),
      makeSkillProfile("report-writing", 3, 4),
    ],
    simulationSettings: makeSimulationSettings(
      "Data Analyst",
      ["Financial Services", "Technology"],
      "3 Years",
      5400,
      "Balanced",
    ),
  },
  {
    id: "edwin",
    email: "edwin@acts.my",
    password: "123456789",
    profile: {
      fullName: "Edwin",
      educationLevel: "Bachelor's Degree",
      degree: "Bachelor of Computer Science",
      specialization: "Artificial Intelligence",
      currentOccupation: "AI Student",
      targetOccupation: "Data Scientist",
      yearsExperience: 1,
      careerInterests: ["Analytics", "User Research", "Digital Transformation"],
      preferredIndustry: "Technology",
      preferredRegion: "Remote / Hybrid",
      desiredSkills: ["Research Methods", "Communication", "Power BI"],
      certifications: ["Machine Learning Foundations"],
      summary:
        "Computer science student specialising in AI and building toward applied data science roles with stronger experimentation and communication depth.",
    },
    skills: [
      makeSkillProfile("python", 4, 5),
      makeSkillProfile("sql", 4, 5),
      makeSkillProfile("data-visualization", 3, 4),
      makeSkillProfile("research-methods", 4, 4),
      makeSkillProfile("critical-thinking", 4, 5, "Career Interest"),
      makeSkillProfile("communication", 3, 4),
      makeSkillProfile("power-bi", 3, 4),
    ],
    simulationSettings: makeSimulationSettings(
      "Data Scientist",
      ["Technology", "Healthcare"],
      "5 Years",
      7000,
      "Exploratory",
    ),
  },
];

export const employerDemoCredentials = {
  email: "employer@acts.my",
  password: "acts-employer",
};

export const defaultEmployerCompanyProfile: EmployerCompanyProfile = {
  companyName: "Aurex Analytics Sdn. Bhd.",
  industry: "Technology",
  headquarters: "Kuala Lumpur",
  website: "https://www.aurex-analytics.demo",
  registrationId: "MY-ACTS-2026-7741",
  companySize: "51-200 employees",
  contactEmail: "careers@aurex-analytics.demo",
  contactPhone: "+60 12-884 2301",
  description:
    "A Malaysia-based analytics and product intelligence company using ACTS-style trajectory insights to identify near-ready graduate talent for data, product, and AI teams.",
  verificationStatus: "Verified",
  verificationNotes:
    "Company profile verified in the prototype using registration ID, company website, and domain-based contact email.",
};

export const defaultEmployerHiringPreset: EmployerHiringPreset = {
  targetOccupations: ["Data Analyst", "Product Analyst", "Data Scientist"],
  preferredEducation: "Bachelor's Degree in CS, IT, Data Science, or related discipline",
  preferredExperience: "0-2 years or strong internship/project evidence",
  minimumReadiness: 72,
  prioritySkills: ["SQL", "Python", "Communication", "Data Visualization", "Critical Thinking"],
  preferredWorkModes: ["Hybrid", "Remote"],
  notes:
    "Priority is given to applicants who can translate technical evidence into business-facing insights and can grow into analytical pathway roles over a 3 to 5 year horizon.",
};

export const defaultJobPostings: JobPosting[] = [
  {
    id: "job-data-analyst-aurex",
    title: "Graduate Data Analyst",
    companyName: defaultEmployerCompanyProfile.companyName,
    industry: "Technology",
    location: "Kuala Lumpur",
    workMode: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "MYR 3,800 - 4,800",
    summary:
      "Support dashboard reporting, SQL-based analysis, and stakeholder insight packs for commercial and product teams.",
    responsibilities: [
      "Prepare recurring KPI dashboards and reporting decks",
      "Query structured datasets using SQL",
      "Translate findings into decision-ready summaries",
    ],
    requiredSkills: ["SQL", "Excel", "Communication", "Data Visualization"],
    preferredSkills: ["Power BI", "Python", "Critical Thinking"],
    minimumReadiness: 70,
    occupationTrack: "Data Analyst",
    postedAt: "2026-03-13T08:30:00.000Z",
    verificationStatus: "Verified",
  },
  {
    id: "job-product-analyst-aurex",
    title: "Associate Product Analyst",
    companyName: defaultEmployerCompanyProfile.companyName,
    industry: "Technology",
    location: "Remote / Hybrid",
    workMode: "Hybrid",
    employmentType: "Full-time",
    salaryRange: "MYR 4,200 - 5,500",
    summary:
      "Work with product managers to evaluate user behavior, feature adoption, and market feedback using mixed-method analysis.",
    responsibilities: [
      "Monitor product funnel and retention metrics",
      "Support user research synthesis and market scans",
      "Present findings to cross-functional stakeholders",
    ],
    requiredSkills: ["SQL", "Research Methods", "Stakeholder Management", "Critical Thinking"],
    preferredSkills: ["Market Analysis", "Data Visualization", "Communication"],
    minimumReadiness: 74,
    occupationTrack: "Product Analyst",
    postedAt: "2026-03-12T10:00:00.000Z",
    verificationStatus: "Verified",
  },
  {
    id: "job-ai-analytics-aurex",
    title: "Junior Applied AI Analyst",
    companyName: defaultEmployerCompanyProfile.companyName,
    industry: "Technology",
    location: "Selangor",
    workMode: "On-site",
    employmentType: "Graduate programme",
    salaryRange: "MYR 4,500 - 5,800",
    summary:
      "Join the applied AI team to evaluate model outputs, prototype data workflows, and communicate performance findings to internal teams.",
    responsibilities: [
      "Assist with model evaluation workflows",
      "Build analysis notebooks and reproducible experiments",
      "Document insights for product and operations stakeholders",
    ],
    requiredSkills: ["Python", "SQL", "Research Methods", "Critical Thinking"],
    preferredSkills: ["Communication", "Data Visualization", "Problem Solving"],
    minimumReadiness: 76,
    occupationTrack: "Data Scientist",
    postedAt: "2026-03-11T09:15:00.000Z",
    verificationStatus: "Verified",
  },
];

export const demoStudentProfile: UserProfile = demoStudentAccounts[0].profile;

export const demoSkills: SkillProfile[] = demoStudentAccounts[0].skills;

export const defaultSimulationSettings: SimulationSettings =
  demoStudentAccounts[0].simulationSettings;

export const pathwayTemplates: Record<string, CareerPathway[]> = {
  "Data Scientist": [
    {
      id: "path-ds-core",
      label: "Applied Data Science Track",
      probability: 43,
      confidence: "High",
      narrative:
        "The strongest pathway deepens current analytical practice and moves toward broader model ownership and stakeholder-facing delivery.",
      transitions: [
        {
          stage: "Current Role",
          role: "Data Scientist",
          probability: 100,
          skills: ["Python", "SQL"],
        },
        {
          stage: "12-24 Months",
          role: "Senior Data Scientist",
          probability: 63,
          skills: ["Research Methods", "Communication"],
        },
        {
          stage: "36-48 Months",
          role: "Lead Data Scientist",
          probability: 43,
          skills: ["Critical Thinking", "Data Visualization"],
        },
      ],
      likelyNextRole: "Senior Data Scientist",
      expectedReadiness: "Strong technical readiness",
      riskNote: "Requires stronger experimentation design and cross-functional communication to accelerate leadership progression.",
    },
    {
      id: "path-ds-ml",
      label: "Machine Learning Specialization Track",
      probability: 29,
      confidence: "Moderate",
      narrative:
        "A specialization pathway for candidates who want to strengthen modeling depth before moving into broader AI solution roles.",
      transitions: [
        {
          stage: "Current Role",
          role: "Data Scientist",
          probability: 100,
          skills: ["Python", "Critical Thinking"],
        },
        {
          stage: "18-30 Months",
          role: "Machine Learning Analyst",
          probability: 41,
          skills: ["Research Methods", "Communication"],
        },
        {
          stage: "36-48 Months",
          role: "AI Solutions Specialist",
          probability: 29,
          skills: ["SQL", "Data Visualization"],
        },
      ],
      likelyNextRole: "Machine Learning Analyst",
      expectedReadiness: "Moderate with model deployment upskilling",
      riskNote: "Most viable when the user can demonstrate stronger ML evaluation and deployment evidence.",
    },
    {
      id: "path-ds-strategy",
      label: "Analytics Strategy Track",
      probability: 18,
      confidence: "Exploratory",
      narrative:
        "An exploratory path that leans into insight communication and strategic influence rather than pure technical depth.",
      transitions: [
        {
          stage: "Current Role",
          role: "Data Scientist",
          probability: 100,
          skills: ["Communication", "Data Visualization"],
        },
        {
          stage: "18-30 Months",
          role: "Analytics Consultant",
          probability: 27,
          skills: ["SQL", "Critical Thinking"],
        },
        {
          stage: "48-60 Months",
          role: "Analytics Strategy Lead",
          probability: 18,
          skills: ["Research Methods", "Communication"],
        },
      ],
      likelyNextRole: "Analytics Consultant",
      expectedReadiness: "Exploratory option",
      riskNote: "Requires stronger business translation and stakeholder influence beyond technical analysis delivery.",
    },
  ],
  "Product Analyst": [
    {
      id: "path-product-core",
      label: "Business-to-Product Track",
      probability: 42,
      confidence: "High",
      narrative:
        "The most stable progression combines current business analysis experience with stronger product analytics exposure.",
      transitions: [
        {
          stage: "Current Role",
          role: "Business Analyst",
          probability: 100,
          skills: ["SQL", "Stakeholder Management"],
        },
        {
          stage: "12-18 Months",
          role: "Product Analyst",
          probability: 64,
          skills: ["Data Visualization", "Research Methods"],
        },
        {
          stage: "36 Months",
          role: "Product Strategy Associate",
          probability: 42,
          skills: ["Market Analysis", "Critical Thinking"],
        },
      ],
      likelyNextRole: "Product Analyst",
      expectedReadiness: "Ready with targeted upskilling",
      riskNote: "Depends on building stronger product discovery and market sizing capability.",
    },
    {
      id: "path-product-data",
      label: "Data-Driven Strategy Track",
      probability: 31,
      confidence: "Moderate",
      narrative:
        "A more analytical pathway that deepens data tooling before converging into cross-functional product work.",
      transitions: [
        {
          stage: "Current Role",
          role: "Business Analyst",
          probability: 100,
          skills: ["SQL", "Excel"],
        },
        {
          stage: "12-24 Months",
          role: "Data Analyst",
          probability: 49,
          skills: ["Python", "Power BI"],
        },
        {
          stage: "36-48 Months",
          role: "Product Analyst",
          probability: 31,
          skills: ["Market Analysis", "Communication"],
        },
      ],
      likelyNextRole: "Data Analyst",
      expectedReadiness: "Requires intermediate technical expansion",
      riskNote: "Trajectory improves if Python and dashboarding proficiency reach level 4.",
    },
    {
      id: "path-product-research",
      label: "Customer Insight Track",
      probability: 18,
      confidence: "Exploratory",
      narrative:
        "Lower probability but viable for users seeking a user research angle before moving into product strategy.",
      transitions: [
        {
          stage: "Current Role",
          role: "Business Analyst",
          probability: 100,
          skills: ["Communication", "Report Writing"],
        },
        {
          stage: "12-24 Months",
          role: "UX Research Assistant",
          probability: 28,
          skills: ["User Interviews", "Research Methods"],
        },
        {
          stage: "36-48 Months",
          role: "Product Analyst",
          probability: 18,
          skills: ["Critical Thinking", "Stakeholder Management"],
        },
      ],
      likelyNextRole: "UX Research Assistant",
      expectedReadiness: "Exploratory option",
      riskNote: "Requires portfolio evidence in user research and synthesis methods.",
    },
  ],
  "Talent Acquisition Specialist": [
    {
      id: "path-talent-core",
      label: "Structured Recruitment Track",
      probability: 42,
      confidence: "High",
      narrative:
        "A direct pathway for candidates with strong communication and stakeholder-facing experience.",
      transitions: [
        {
          stage: "Current Role",
          role: "HR Executive",
          probability: 100,
          skills: ["Communication", "Organizational Skills"],
        },
        {
          stage: "12-18 Months",
          role: "Talent Acquisition Specialist",
          probability: 61,
          skills: ["Recruitment", "Stakeholder Management"],
        },
        {
          stage: "36 Months",
          role: "HR Analyst",
          probability: 42,
          skills: ["People Analytics", "Report Writing"],
        },
      ],
      likelyNextRole: "Talent Acquisition Specialist",
      expectedReadiness: "Ready with sourcing practice",
      riskNote: "Improves with structured interviewing and recruiting analytics exposure.",
    },
    {
      id: "path-talent-pipeline",
      label: "Talent Pipeline Track",
      probability: 31,
      confidence: "Moderate",
      narrative:
        "Builds pipeline coordination capability before moving into specialist talent roles.",
      transitions: [
        {
          stage: "Current Role",
          role: "HR Executive",
          probability: 100,
          skills: ["Communication", "Report Writing"],
        },
        {
          stage: "12 Months",
          role: "Recruitment Coordinator",
          probability: 43,
          skills: ["Recruitment", "Organizational Skills"],
        },
        {
          stage: "24-36 Months",
          role: "Talent Acquisition Specialist",
          probability: 31,
          skills: ["Stakeholder Management", "People Analytics"],
        },
      ],
      likelyNextRole: "Recruitment Coordinator",
      expectedReadiness: "Moderate",
      riskNote: "Most suitable when the user wants a more operations-oriented HR path first.",
    },
    {
      id: "path-talent-strategy",
      label: "Talent Strategy Track",
      probability: 18,
      confidence: "Exploratory",
      narrative:
        "A longer route that blends learning, development, and analytics into talent strategy support.",
      transitions: [
        {
          stage: "Current Role",
          role: "HR Executive",
          probability: 100,
          skills: ["Communication", "Stakeholder Management"],
        },
        {
          stage: "18-24 Months",
          role: "Learning and Development Coordinator",
          probability: 24,
          skills: ["Facilitation", "Report Writing"],
        },
        {
          stage: "36-48 Months",
          role: "Talent Strategy Associate",
          probability: 18,
          skills: ["People Analytics", "Critical Thinking"],
        },
      ],
      likelyNextRole: "Learning and Development Coordinator",
      expectedReadiness: "Exploratory option",
      riskNote: "Assumes the user is open to broad HR capability building before specialization.",
    },
  ],
  "Operations Manager": [
    {
      id: "path-ops-core",
      label: "Coordination-to-Leadership Track",
      probability: 38,
      confidence: "High",
      narrative:
        "A balanced route that leverages operations coordination and project delivery exposure.",
      transitions: [
        {
          stage: "Current Role",
          role: "Operations Executive",
          probability: 100,
          skills: ["Organizational Skills", "Excel"],
        },
        {
          stage: "12-18 Months",
          role: "Project Coordinator",
          probability: 57,
          skills: ["Project Planning", "Stakeholder Management"],
        },
        {
          stage: "36-48 Months",
          role: "Operations Manager",
          probability: 38,
          skills: ["Workflow Design", "Problem Solving"],
        },
      ],
      likelyNextRole: "Project Coordinator",
      expectedReadiness: "Ready with execution depth",
      riskNote: "Requires stronger process improvement exposure to accelerate promotion odds.",
    },
    {
      id: "path-ops-improvement",
      label: "Process Improvement Track",
      probability: 29,
      confidence: "Moderate",
      narrative:
        "Prioritizes process excellence and reporting before moving into management responsibility.",
      transitions: [
        {
          stage: "Current Role",
          role: "Operations Executive",
          probability: 100,
          skills: ["Excel", "Report Writing"],
        },
        {
          stage: "12-24 Months",
          role: "Process Improvement Analyst",
          probability: 39,
          skills: ["Workflow Design", "Critical Thinking"],
        },
        {
          stage: "36-48 Months",
          role: "Operations Manager",
          probability: 29,
          skills: ["Project Planning", "Stakeholder Management"],
        },
      ],
      likelyNextRole: "Process Improvement Analyst",
      expectedReadiness: "Moderate",
      riskNote: "Pathway strengthens with formal process improvement certification.",
    },
    {
      id: "path-ops-strategy",
      label: "Operations Strategy Track",
      probability: 19,
      confidence: "Exploratory",
      narrative:
        "More strategic and less direct, suitable for candidates interested in long-range planning roles.",
      transitions: [
        {
          stage: "Current Role",
          role: "Operations Executive",
          probability: 100,
          skills: ["Communication", "Organizational Skills"],
        },
        {
          stage: "18-24 Months",
          role: "Supply Chain Planner",
          probability: 27,
          skills: ["Excel", "Problem Solving"],
        },
        {
          stage: "48-60 Months",
          role: "Operations Strategy Lead",
          probability: 19,
          skills: ["Workflow Design", "Stakeholder Management"],
        },
      ],
      likelyNextRole: "Supply Chain Planner",
      expectedReadiness: "Exploratory option",
      riskNote: "Best fit when the user is open to a logistics or planning specialization first.",
    },
  ],
  "Data Analyst": [
    {
      id: "path-data-core",
      label: "Analytics Specialist Track",
      probability: 44,
      confidence: "High",
      narrative:
        "A strong trajectory for candidates who already possess solid SQL and reporting fundamentals.",
      transitions: [
        {
          stage: "Current Role",
          role: "Data Analyst",
          probability: 100,
          skills: ["SQL", "Excel"],
        },
        {
          stage: "12-24 Months",
          role: "Business Intelligence Analyst",
          probability: 63,
          skills: ["Power BI", "Data Visualization"],
        },
        {
          stage: "36-48 Months",
          role: "Analytics Consultant",
          probability: 44,
          skills: ["Communication", "Critical Thinking"],
        },
      ],
      likelyNextRole: "Business Intelligence Analyst",
      expectedReadiness: "Ready with technical depth",
      riskNote: "Consulting-facing roles require stronger storytelling and presentation maturity.",
    },
    {
      id: "path-data-product",
      label: "Analytics-to-Product Track",
      probability: 27,
      confidence: "Moderate",
      narrative:
        "Bridges analytical reporting capability into broader product and growth decision support.",
      transitions: [
        {
          stage: "Current Role",
          role: "Data Analyst",
          probability: 100,
          skills: ["SQL", "Power BI"],
        },
        {
          stage: "18-30 Months",
          role: "Product Analyst",
          probability: 35,
          skills: ["Market Analysis", "Stakeholder Management"],
        },
        {
          stage: "36-48 Months",
          role: "Product Strategy Associate",
          probability: 27,
          skills: ["Research Methods", "Critical Thinking"],
        },
      ],
      likelyNextRole: "Product Analyst",
      expectedReadiness: "Moderate",
      riskNote: "Needs more product discovery and qualitative research exposure.",
    },
    {
      id: "path-data-growth",
      label: "Growth Insight Track",
      probability: 17,
      confidence: "Exploratory",
      narrative:
        "Suited to candidates interested in commercial analytics and customer behavior modeling.",
      transitions: [
        {
          stage: "Current Role",
          role: "Data Analyst",
          probability: 100,
          skills: ["Excel", "Communication"],
        },
        {
          stage: "12-24 Months",
          role: "Marketing Analyst",
          probability: 24,
          skills: ["Market Analysis", "Data Visualization"],
        },
        {
          stage: "36-48 Months",
          role: "Growth Insights Lead",
          probability: 17,
          skills: ["Stakeholder Management", "Critical Thinking"],
        },
      ],
      likelyNextRole: "Marketing Analyst",
      expectedReadiness: "Exploratory option",
      riskNote: "Requires more commercial analytics and campaign measurement experience.",
    },
  ],
};

export const employerMetrics: EmployerMetric[] = [
  { label: "Average Candidate Readiness", value: "74%", delta: "+6 pts this quarter", tone: "accent" },
  { label: "High-Confidence Pathways", value: "18", delta: "Across 4 occupations", tone: "teal" },
  { label: "Priority Skill Gaps", value: "6", delta: "Most common across candidates", tone: "plum" },
  { label: "Transition Stability Index", value: "0.68", delta: "Markov model estimate", tone: "accent" },
];

export const employerTrends: EmployerTrendPoint[] = [
  { month: "Jan", pathwayConfidence: 59, readiness: 62 },
  { month: "Feb", pathwayConfidence: 61, readiness: 65 },
  { month: "Mar", pathwayConfidence: 64, readiness: 67 },
  { month: "Apr", pathwayConfidence: 66, readiness: 69 },
  { month: "May", pathwayConfidence: 68, readiness: 71 },
  { month: "Jun", pathwayConfidence: 71, readiness: 74 },
];

export const employerSkillDemand: EmployerSkillDemand[] = [
  { skill: "Stakeholder Management", demand: 88, readiness: 72 },
  { skill: "SQL", demand: 82, readiness: 78 },
  { skill: "Research Methods", demand: 69, readiness: 53 },
  { skill: "Project Planning", demand: 74, readiness: 61 },
  { skill: "Power BI", demand: 63, readiness: 49 },
];

export const employerReadinessRows: EmployerReadinessRow[] = [
  {
    pathway: "Business Analyst -> Product Analyst -> Product Strategy Associate",
    averageReadiness: 78,
    skillGapIndex: 22,
    hiringSignal: "Near-ready with targeted analytics and research upskilling",
  },
  {
    pathway: "HR Executive -> Talent Acquisition Specialist -> HR Analyst",
    averageReadiness: 72,
    skillGapIndex: 28,
    hiringSignal: "Strong for sourcing roles; analytics still developing",
  },
  {
    pathway: "Operations Executive -> Project Coordinator -> Operations Manager",
    averageReadiness: 69,
    skillGapIndex: 31,
    hiringSignal: "Promising for execution roles with process design support",
  },
];
