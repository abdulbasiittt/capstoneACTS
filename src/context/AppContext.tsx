import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import {
  defaultSimulationSettings,
  demoSkills,
  demoStudentAccounts,
  demoStudentProfile,
  defaultEmployerCompanyProfile,
  defaultEmployerHiringPreset,
  defaultJobPostings,
  employerDemoCredentials,
  skillCatalog,
} from "../data/mockData";
import type {
  ActsStoredState,
  CompanyVerificationStatus,
  DemoStudentAccount,
  EmployerCompanyProfile,
  RegisteredEmployerAccount,
  EmployerHiringPreset,
  JobPosting,
  NotificationMessage,
  RegisteredStudentAccount,
  SimulationResult,
  SimulationSettings,
  SkillProfile,
  UserProfile,
  UserRole,
} from "../types";
import { generateSimulationResult } from "../utils/simulation";

interface ActsContextValue extends ActsStoredState {
  notification: NotificationMessage | null;
  isProcessing: boolean;
  loginAsDemo: (role: UserRole, account?: DemoStudentAccount) => void;
  loginRegisteredStudent: (account: RegisteredStudentAccount) => void;
  loginRegisteredEmployer: (account: RegisteredEmployerAccount) => void;
  registerStudentUser: (input: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    age: number;
    institution: string;
    username: string;
    password: string;
  }) => { success: boolean; message: string };
  registerEmployerUser: (input: {
    contactName: string;
    companyName: string;
    contactEmail: string;
    contactPhone: string;
    username: string;
    password: string;
  }) => { success: boolean; message: string };
  logout: () => void;
  saveProfile: (profile: UserProfile) => void;
  saveSkills: (skills: SkillProfile[]) => void;
  saveEmployerCompanyProfile: (profile: EmployerCompanyProfile) => void;
  saveEmployerHiringPreset: (preset: EmployerHiringPreset) => void;
  requestCompanyVerification: (
    profile?: EmployerCompanyProfile,
  ) => { success: boolean; message: string; status?: CompanyVerificationStatus };
  createJobPosting: (
    input: Omit<JobPosting, "id" | "companyName" | "industry" | "postedAt" | "verificationStatus">,
  ) => void;
  saveSimulationSettings: (settings: SimulationSettings) => void;
  startSimulation: (settings: SimulationSettings) => void;
  completeSimulation: () => SimulationResult | null;
  loadResult: (id: string) => void;
  deleteResult: (id: string) => void;
  dismissNotification: () => void;
}

const STORAGE_KEY = "acts-demo-state";

const ActsContext = createContext<ActsContextValue | undefined>(undefined);

function buildStudentWorkspace(
  profile: UserProfile,
  skills: SkillProfile[],
  simulationSettings: SimulationSettings,
) {
  const history = seedHistory(profile, skills, simulationSettings);

  return {
    profile,
    skills,
    simulationSettings,
    latestResult: history[0],
    history,
  };
}

function buildRegisteredAccount(input: {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  age: number;
  institution: string;
  username: string;
  password: string;
}): RegisteredStudentAccount {
  const starterProfile: UserProfile = {
    fullName: input.fullName.trim(),
    educationLevel: "Bachelor's Degree",
    degree: "New ACTS User",
    specialization: "Career Exploration",
    currentOccupation: "New Student User",
    targetOccupation: "Data Analyst",
    yearsExperience: 0,
    careerInterests: ["Analytics"],
    preferredIndustry: "Technology",
    preferredRegion: "Kuala Lumpur",
    desiredSkills: ["SQL", "Communication"],
    certifications: [],
    summary:
      `Newly registered ACTS user from ${input.institution.trim()}, age ${input.age}. Complete the profile setup flow to personalize the simulation and skill gap outputs.`,
  };

  const starterSkills: SkillProfile[] = ["sql", "communication", "problem-solving"].map((id) => {
    const skill = skillCatalog.find((item) => item.id === id);

    return {
      id,
      name: skill?.name ?? id,
      category: skill?.category ?? "Core",
      proficiency: 3,
      targetLevel: 4,
      source: "Profile Input",
    };
  });

  return {
    id: `registered-${Date.now()}`,
    username: input.username.trim(),
    password: input.password,
    fullName: input.fullName.trim(),
    emailAddress: input.emailAddress.trim(),
    phoneNumber: input.phoneNumber.trim(),
    age: input.age,
    institution: input.institution.trim(),
    createdAt: new Date().toISOString(),
    profile: starterProfile,
    skills: starterSkills,
    simulationSettings: {
      targetOccupation: "Data Analyst",
      planningHorizon: "3 Years",
      simulationRuns: 3000,
      riskPreference: "Balanced",
      preferredIndustries: ["Technology"],
      includeSkillGapRecommendations: true,
    },
  };
}

function buildRegisteredEmployerAccount(input: {
  contactName: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  username: string;
  password: string;
}): RegisteredEmployerAccount {
  const companyProfile: EmployerCompanyProfile = {
    companyName: input.companyName.trim(),
    industry: "Technology",
    headquarters: "Kuala Lumpur",
    website: "https://www.company-demo.local",
    registrationId: `MY-ACTS-${Date.now()}`,
    companySize: "1-50 employees",
    contactEmail: input.contactEmail.trim(),
    contactPhone: input.contactPhone.trim(),
    description:
      "Newly registered employer workspace in the ACTS prototype. Continue into company setup to refine verification details, hiring presets, and job postings.",
    verificationStatus: "Unverified",
    verificationNotes:
      "This employer account is newly registered in the prototype and still requires company verification.",
  };

  return {
    id: `registered-employer-${Date.now()}`,
    username: input.username.trim(),
    password: input.password,
    companyName: input.companyName.trim(),
    contactName: input.contactName.trim(),
    contactEmail: input.contactEmail.trim(),
    contactPhone: input.contactPhone.trim(),
    createdAt: new Date().toISOString(),
    companyProfile,
    hiringPreset: {
      ...defaultEmployerHiringPreset,
      notes: `Initial employer preset for ${input.companyName.trim()}. Update occupations, readiness thresholds, and priority skills from company setup.`,
    },
  };
}

function alternateSettings(settings: SimulationSettings): SimulationSettings {
  if (settings.targetOccupation === "Data Scientist") {
    return {
      ...settings,
      targetOccupation: "Data Analyst",
      planningHorizon: "5 Years",
      riskPreference: "Exploratory",
      simulationRuns: settings.simulationRuns + 1200,
    };
  }

  if (settings.targetOccupation === "Data Analyst") {
    return {
      ...settings,
      targetOccupation: "Product Analyst",
      planningHorizon: "3 Years",
      riskPreference: "Balanced",
      simulationRuns: settings.simulationRuns + 800,
    };
  }

  return {
    ...settings,
    targetOccupation: "Data Analyst",
    planningHorizon: "5 Years",
    riskPreference: "Exploratory",
    simulationRuns: settings.simulationRuns + 1000,
  };
}

function seedHistory(
  profile: UserProfile,
  skills: SkillProfile[],
  settings: SimulationSettings,
): SimulationResult[] {
  const first = generateSimulationResult(profile, skills, settings);
  const second = generateSimulationResult(profile, skills, alternateSettings(settings));

  return [
    { ...first, createdAt: "2026-03-10T09:00:00.000Z" },
    { ...second, createdAt: "2026-03-06T14:20:00.000Z" },
  ];
}

function initialStoredState(): ActsStoredState {
  if (typeof window !== "undefined") {
    const persisted = window.localStorage.getItem(STORAGE_KEY);

    if (persisted) {
      try {
        const parsed = JSON.parse(persisted) as Partial<ActsStoredState>;
        const fallbackWorkspace = buildStudentWorkspace(
          demoStudentProfile,
          demoSkills,
          defaultSimulationSettings,
        );

        return {
          role: parsed.role ?? null,
          profile: parsed.profile ?? fallbackWorkspace.profile,
          skills: parsed.skills ?? fallbackWorkspace.skills,
          simulationSettings:
            parsed.simulationSettings ?? fallbackWorkspace.simulationSettings,
          latestResult: parsed.latestResult ?? fallbackWorkspace.latestResult,
          history: parsed.history ?? fallbackWorkspace.history,
          registeredStudentAccounts: (
            parsed.registeredStudentAccounts ??
            (parsed as Partial<{ registeredAccounts: RegisteredStudentAccount[] }>).registeredAccounts ??
            []
          ).map((account) => hydrateRegisteredStudentAccount(account)),
          registeredEmployerAccounts: (parsed.registeredEmployerAccounts ?? []).map((account) =>
            hydrateRegisteredEmployerAccount(account),
          ),
          employerCompanyProfile: {
            ...defaultEmployerCompanyProfile,
            ...parsed.employerCompanyProfile,
            contactPhone:
              parsed.employerCompanyProfile?.contactPhone?.trim() ??
              defaultEmployerCompanyProfile.contactPhone,
          },
          employerHiringPreset:
            parsed.employerHiringPreset ?? defaultEmployerHiringPreset,
          jobPostings: parsed.jobPostings ?? defaultJobPostings,
        };
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  const fallbackWorkspace = buildStudentWorkspace(
    demoStudentProfile,
    demoSkills,
    defaultSimulationSettings,
  );

  return {
    role: null,
    profile: fallbackWorkspace.profile,
    skills: fallbackWorkspace.skills,
    simulationSettings: fallbackWorkspace.simulationSettings,
    latestResult: fallbackWorkspace.latestResult,
    history: fallbackWorkspace.history,
    registeredStudentAccounts: [],
    registeredEmployerAccounts: [],
    employerCompanyProfile: defaultEmployerCompanyProfile,
    employerHiringPreset: defaultEmployerHiringPreset,
    jobPostings: defaultJobPostings,
  };
}

function createNotification(
  tone: NotificationMessage["tone"],
  title: string,
  message: string,
): NotificationMessage {
  return {
    id: `${Date.now()}-${tone}`,
    tone,
    title,
    message,
  };
}

function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
}

function emailDomain(value: string) {
  return value.trim().toLowerCase().split("@")[1] ?? "";
}

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

function isValidPhone(value: string) {
  return value.replace(/\D/g, "").length >= 8;
}

function hydrateRegisteredStudentAccount(
  account: RegisteredStudentAccount &
    Partial<
      Pick<
        RegisteredStudentAccount,
        "emailAddress" | "phoneNumber" | "age" | "institution"
      >
    >,
): RegisteredStudentAccount {
  return {
    ...account,
    emailAddress:
      account.emailAddress?.trim() || `${account.username.trim().toLowerCase()}@acts-local.demo`,
    phoneNumber: account.phoneNumber?.trim() || "",
    age: typeof account.age === "number" ? account.age : 0,
    institution: account.institution?.trim() || "",
  };
}

function hydrateRegisteredEmployerAccount(
  account: RegisteredEmployerAccount &
    Partial<Pick<RegisteredEmployerAccount, "contactPhone">> & {
      companyProfile?: Partial<EmployerCompanyProfile>;
    },
): RegisteredEmployerAccount {
  const contactPhone =
    account.contactPhone?.trim() || account.companyProfile?.contactPhone?.trim() || "";

  return {
    ...account,
    contactPhone,
    companyProfile: {
      ...defaultEmployerCompanyProfile,
      ...account.companyProfile,
      contactEmail:
        account.companyProfile?.contactEmail?.trim() || account.contactEmail?.trim() || "",
      contactPhone,
    },
  };
}

export function AppProvider({ children }: PropsWithChildren) {
  const [storedState, setStoredState] = useState<ActsStoredState>(initialStoredState);
  const [notification, setNotification] = useState<NotificationMessage | null>(null);
  const [pendingSettings, setPendingSettings] = useState<SimulationSettings | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedState));
    }
  }, [storedState]);

  useEffect(() => {
    if (!notification) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setNotification(null);
    }, 4200);

    return () => window.clearTimeout(timer);
  }, [notification]);

  const value = useMemo<ActsContextValue>(
    () => ({
      ...storedState,
      notification,
      isProcessing: Boolean(pendingSettings),
      loginAsDemo(role, account) {
        if (role === "student" && account) {
          const workspace = buildStudentWorkspace(
            account.profile,
            account.skills,
            account.simulationSettings,
          );

          setStoredState((current) => ({
            ...current,
            role,
            ...workspace,
          }));
        } else {
          setStoredState((current) => ({ ...current, role }));
        }

        setNotification(
          createNotification(
            "success",
            role === "student" ? "Student session started" : "Employer session started",
            role === "student" && account
              ? `${account.profile.fullName}'s ACTS demo profile is now active.`
              : "Demo credentials accepted. The interface is now using mock ACTS data.",
          ),
        );
      },
      loginRegisteredStudent(account) {
        const workspace = buildStudentWorkspace(
          account.profile,
          account.skills,
          account.simulationSettings,
        );

        setStoredState((current) => ({
          ...current,
          role: "student",
          ...workspace,
        }));
        setNotification(
          createNotification(
            "success",
            "Registered account session started",
            `${account.fullName}'s ACTS account has been loaded from local demo storage.`,
          ),
        );
      },
      loginRegisteredEmployer(account) {
        setStoredState((current) => ({
          ...current,
          role: "employer",
          employerCompanyProfile: account.companyProfile,
          employerHiringPreset: account.hiringPreset,
        }));
        setNotification(
          createNotification(
            "success",
            "Employer account session started",
            `${account.companyName}'s employer workspace has been loaded from local demo storage.`,
          ),
        );
      },
      registerStudentUser(input) {
        const normalizedUsername = input.username.trim().toLowerCase();
        const normalizedEmail = input.emailAddress.trim().toLowerCase();

        if (
          !normalizedUsername ||
          !input.password.trim() ||
          !input.fullName.trim() ||
          !normalizedEmail ||
          !input.phoneNumber.trim() ||
          !input.institution.trim() ||
          !input.age
        ) {
          return {
            success: false,
            message:
              "Full name, personal email, phone number, age, university or school, username, and password are all required.",
          };
        }

        if (!isValidEmail(normalizedEmail)) {
          return {
            success: false,
            message: "Enter a valid email address before creating the student account.",
          };
        }

        if (!isValidPhone(input.phoneNumber)) {
          return {
            success: false,
            message: "Enter a valid phone number with at least 8 digits.",
          };
        }

        if (input.age < 16 || input.age > 80) {
          return {
            success: false,
            message: "Enter a realistic age between 16 and 80.",
          };
        }

        if (
          storedState.registeredStudentAccounts.some(
            (account) => account.username.toLowerCase() === normalizedUsername,
          ) ||
          storedState.registeredEmployerAccounts.some(
            (account) => account.username.toLowerCase() === normalizedUsername,
          ) ||
          storedState.registeredStudentAccounts.some(
            (account) => account.emailAddress.toLowerCase() === normalizedEmail,
          ) ||
          storedState.registeredEmployerAccounts.some(
            (account) => account.contactEmail.toLowerCase() === normalizedEmail,
          ) ||
          demoStudentAccounts.some((account) => account.email.toLowerCase() === normalizedEmail) ||
          employerDemoCredentials.email.toLowerCase() === normalizedEmail
        ) {
          return {
            success: false,
            message:
              "That username or email address already exists in the prototype. Please choose another one.",
          };
        }

        if (
          demoStudentAccounts.some(
            (account) => account.email.toLowerCase() === normalizedUsername,
          ) ||
          employerDemoCredentials.email.toLowerCase() === normalizedUsername
        ) {
          return {
            success: false,
            message:
                "That username conflicts with an existing demo login identifier. Please choose another one.",
          };
        }

        const account = buildRegisteredAccount(input);
        const workspace = buildStudentWorkspace(
          account.profile,
          account.skills,
          account.simulationSettings,
        );

        setStoredState((current) => ({
          ...current,
          role: "student",
          ...workspace,
          registeredStudentAccounts: [account, ...current.registeredStudentAccounts],
        }));
        setNotification(
          createNotification(
            "success",
            "New ACTS user registered",
            `${account.fullName} can now continue into profile setup with a locally stored username and password.`,
          ),
        );

        return {
          success: true,
          message: "Registration successful.",
        };
      },
      registerEmployerUser(input) {
        const normalizedUsername = input.username.trim().toLowerCase();
        const normalizedEmail = input.contactEmail.trim().toLowerCase();

        if (
          !normalizedUsername ||
          !input.password.trim() ||
          !input.contactName.trim() ||
          !input.companyName.trim() ||
          !normalizedEmail ||
          !input.contactPhone.trim()
        ) {
          return {
            success: false,
            message:
              "Contact name, company name, contact email, contact phone, username, and password are all required.",
          };
        }

        if (!isValidEmail(normalizedEmail)) {
          return {
            success: false,
            message: "Enter a valid company contact email before creating the employer account.",
          };
        }

        if (!isValidPhone(input.contactPhone)) {
          return {
            success: false,
            message: "Enter a valid contact phone number with at least 8 digits.",
          };
        }

        if (
          storedState.registeredStudentAccounts.some(
            (account) => account.username.toLowerCase() === normalizedUsername,
          ) ||
          storedState.registeredEmployerAccounts.some(
            (account) => account.username.toLowerCase() === normalizedUsername,
          ) ||
          storedState.registeredStudentAccounts.some(
            (account) => account.emailAddress.toLowerCase() === normalizedEmail,
          ) ||
          storedState.registeredEmployerAccounts.some(
            (account) => account.contactEmail.toLowerCase() === normalizedEmail,
          ) ||
          demoStudentAccounts.some((account) => account.email.toLowerCase() === normalizedEmail) ||
          employerDemoCredentials.email.toLowerCase() === normalizedEmail
        ) {
          return {
            success: false,
            message:
              "That username or email address already exists in the prototype. Please choose another one.",
          };
        }

        if (
          demoStudentAccounts.some(
            (account) => account.email.toLowerCase() === normalizedUsername,
          ) ||
          employerDemoCredentials.email.toLowerCase() === normalizedUsername
        ) {
          return {
            success: false,
            message:
              "That username conflicts with an existing demo login identifier. Please choose another one.",
          };
        }

        const account = buildRegisteredEmployerAccount(input);

        setStoredState((current) => ({
          ...current,
          role: "employer",
          employerCompanyProfile: account.companyProfile,
          employerHiringPreset: account.hiringPreset,
          registeredEmployerAccounts: [account, ...current.registeredEmployerAccounts],
        }));
        setNotification(
          createNotification(
            "success",
            "Employer account registered",
            `${account.companyName} can now continue into company setup with a locally stored employer login.`,
          ),
        );

        return {
          success: true,
          message: "Registration successful.",
        };
      },
      logout() {
        setStoredState((current) => ({ ...current, role: null }));
        setNotification(
          createNotification(
            "info",
            "Signed out of demo mode",
            "You can switch between Student / Job Seeker and Employer experiences at any time.",
          ),
        );
      },
      saveProfile(profile) {
        setStoredState((current) => ({
          ...current,
          profile,
          simulationSettings: {
            ...current.simulationSettings,
            targetOccupation: profile.targetOccupation,
            preferredIndustries: [profile.preferredIndustry],
          },
        }));
        setNotification(
          createNotification(
            "success",
            "Profile updated",
            "ACTS will use the revised academic, career, and preference data in the next simulation run.",
          ),
        );
      },
      saveSkills(skills) {
        setStoredState((current) => ({ ...current, skills }));
        setNotification(
          createNotification(
            "success",
            "Skill vector refreshed",
            "The structured skill inputs now reflect your latest proficiency and target skill selections.",
          ),
        );
      },
      saveEmployerCompanyProfile(profile) {
        setStoredState((current) => {
          const companyName =
            profile.companyName.trim() || current.employerCompanyProfile.companyName;
          const industry =
            profile.industry.trim() || current.employerCompanyProfile.industry;

          return {
            ...current,
            employerCompanyProfile: {
              ...profile,
              companyName,
              industry,
            },
            jobPostings: current.jobPostings.map((posting) => ({
              ...posting,
              companyName,
              industry,
              verificationStatus: profile.verificationStatus,
            })),
          };
        });
        setNotification(
          createNotification(
            "success",
            "Employer company profile updated",
            "The company registration details now shape the employer workspace and linked job board entries.",
          ),
        );
      },
      saveEmployerHiringPreset(preset) {
        setStoredState((current) => ({ ...current, employerHiringPreset: preset }));
        setNotification(
          createNotification(
            "success",
            "Hiring preset saved",
            "Employer preference thresholds and priority skills have been refreshed for the demo workspace.",
          ),
        );
      },
      requestCompanyVerification(profileOverride) {
        const profile = profileOverride ?? storedState.employerCompanyProfile;

        if (
          !profile.companyName.trim() ||
          !profile.registrationId.trim() ||
          !profile.website.trim() ||
          !profile.contactEmail.trim()
        ) {
          return {
            success: false,
            message:
              "Complete the company name, registration ID, website, and contact email before requesting verification.",
            status: "Unverified",
          };
        }

        const websiteDomain = normalizeDomain(profile.website);
        const contactDomain = emailDomain(profile.contactEmail);
        const isVerified =
          Boolean(websiteDomain) &&
          Boolean(contactDomain) &&
          (contactDomain === websiteDomain ||
            websiteDomain.includes(contactDomain) ||
            contactDomain.includes(websiteDomain));
        const verificationStatus = isVerified ? "Verified" : "Pending Review";
        const verificationNotes = isVerified
          ? "Company profile verified in the prototype using matching website and contact-email domains plus the submitted registration ID."
          : "Verification request logged in the prototype. The profile is pending manual review because the website and email domains do not fully align.";

        setStoredState((current) => ({
          ...current,
          employerCompanyProfile: {
            ...profile,
            verificationStatus,
            verificationNotes,
          },
          jobPostings: current.jobPostings.map((posting) => ({
            ...posting,
            verificationStatus,
          })),
        }));
        setNotification(
          createNotification(
            isVerified ? "success" : "info",
            isVerified ? "Company verified" : "Verification submitted",
            verificationNotes,
          ),
        );

        return {
          success: true,
          message: verificationNotes,
          status: verificationStatus,
        };
      },
      createJobPosting(input) {
        setStoredState((current) => {
          const companyName =
            current.employerCompanyProfile.companyName.trim() || "Employer Demo Company";
          const industry =
            current.employerCompanyProfile.industry.trim() || "Technology";

          return {
            ...current,
            jobPostings: [
              {
                ...input,
                id: `job-${Date.now()}`,
                companyName,
                industry,
                postedAt: new Date().toISOString(),
                verificationStatus: current.employerCompanyProfile.verificationStatus,
              },
              ...current.jobPostings,
            ],
          };
        });
        setNotification(
          createNotification(
            "success",
            "Job posting published",
            "The new employer job posting is now available in the student job search board.",
          ),
        );
      },
      saveSimulationSettings(settings) {
        setStoredState((current) => ({ ...current, simulationSettings: settings }));
      },
      startSimulation(settings) {
        setStoredState((current) => ({ ...current, simulationSettings: settings }));
        setPendingSettings(settings);
        setNotification(
          createNotification(
            "info",
            "ACTS simulation queued",
            "The Simulation Controller is preparing the Markov, Monte Carlo, and skill gap modules.",
          ),
        );
      },
      completeSimulation() {
        if (!pendingSettings) {
          return storedState.latestResult;
        }

        const result = generateSimulationResult(
          storedState.profile,
          storedState.skills,
          pendingSettings,
        );

        setStoredState((current) => ({
          ...current,
          latestResult: result,
          history: [result, ...current.history],
        }));
        setPendingSettings(null);
        setNotification(
          createNotification(
            "success",
            "Simulation results ready",
            "A new ACTS career trajectory run has been generated and saved to simulation history.",
          ),
        );
        return result;
      },
      loadResult(id) {
        setStoredState((current) => {
          const result = current.history.find((item) => item.id === id) ?? current.latestResult;
          return {
            ...current,
            latestResult: result,
          };
        });
        setNotification(
          createNotification(
            "info",
            "Result loaded",
            "The selected simulation snapshot is now active for dashboard, comparison, and skill gap review.",
          ),
        );
      },
      deleteResult(id) {
        setStoredState((current) => {
          const filtered = current.history.filter((item) => item.id !== id);
          const nextLatest =
            current.latestResult?.id === id ? filtered[0] ?? null : current.latestResult;

          return {
            ...current,
            history: filtered,
            latestResult: nextLatest,
          };
        });
        setNotification(
          createNotification(
            "info",
            "Simulation removed",
            "The selected mock result has been removed from the ACTS history list.",
          ),
        );
      },
      dismissNotification() {
        setNotification(null);
      },
    }),
    [notification, pendingSettings, storedState],
  );

  return <ActsContext.Provider value={value}>{children}</ActsContext.Provider>;
}

export function useActs() {
  const context = useContext(ActsContext);

  if (!context) {
    throw new Error("useActs must be used within an AppProvider");
  }

  return context;
}
