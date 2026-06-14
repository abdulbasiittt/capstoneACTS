import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { SkillChip } from "../components/common/SkillChip";
import { StepIndicator } from "../components/common/StepIndicator";
import { useActs } from "../context/AppContext";
import {
  careerInterestOptions,
  educationLevels,
  industries,
  occupationRequirements,
  regions,
  skillCatalog,
} from "../data/mockData";
import type { SkillProfile, UserProfile } from "../types";
import { formatYearsExperience } from "../utils/format";

const steps = ["Academic Profile", "Career Preferences", "Skills and Credentials"];

function mergeSkills(
  selectedSkillNames: string[],
  currentSkills: SkillProfile[],
  desiredSkills: string[],
): SkillProfile[] {
  return selectedSkillNames.map((skillName) => {
    const existing = currentSkills.find((skill) => skill.name === skillName);
    const catalogSkill = skillCatalog.find((item) => item.name === skillName);

    return (
      existing ?? {
        id: catalogSkill?.id ?? skillName.toLowerCase().replace(/\s+/g, "-"),
        name: skillName,
        category: catalogSkill?.category ?? "Core",
        proficiency: 3,
        targetLevel: desiredSkills.includes(skillName) ? 4 : 3,
        source: "Profile Input",
      }
    );
  });
}

export function ProfileSetupPage() {
  const navigate = useNavigate();
  const { profile, skills, saveProfile, saveSkills } = useActs();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<UserProfile>(profile);
  const [selectedCurrentSkills, setSelectedCurrentSkills] = useState<string[]>(
    skills.map((item) => item.name),
  );
  const [certificationInput, setCertificationInput] = useState(profile.certifications.join(", "));

  useEffect(() => {
    setForm(profile);
    setSelectedCurrentSkills(skills.map((item) => item.name));
    setCertificationInput(profile.certifications.join(", "));
  }, [profile, skills]);

  const occupationOptions = useMemo(
    () => occupationRequirements.map((item) => item.occupation),
    [],
  );

  const toggleSkill = (skillName: string) => {
    setSelectedCurrentSkills((current) =>
      current.includes(skillName)
        ? current.filter((item) => item !== skillName)
        : [...current, skillName],
    );
  };

  const toggleDesiredSkill = (skillName: string) => {
    setForm((current) => ({
      ...current,
      desiredSkills: current.desiredSkills.includes(skillName)
        ? current.desiredSkills.filter((item) => item !== skillName)
        : [...current.desiredSkills, skillName],
    }));
  };

  const toggleInterest = (interest: string) => {
    setForm((current) => ({
      ...current,
      careerInterests: current.careerInterests.includes(interest)
        ? current.careerInterests.filter((item) => item !== interest)
        : [...current.careerInterests, interest],
    }));
  };

  const handleContinue = () => {
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    const nextProfile: UserProfile = {
      ...form,
      certifications: certificationInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
    const nextSkills = mergeSkills(selectedCurrentSkills, skills, nextProfile.desiredSkills);

    saveProfile(nextProfile);
    saveSkills(nextSkills);
    navigate("/dashboard");
  };

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Authentication and Profile Management"
        title="Profile setup for structured ACTS input"
        description="Capture the student or job seeker profile data that ACTS will transform into skill vectors, trajectory assumptions, and simulation parameters."
        breadcrumbs={[
          { label: "Student Workspace", href: "/dashboard" },
          { label: "Profile Setup" },
        ]}
      />

      <StepIndicator steps={steps} currentStep={step} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card p-6 md:p-8">
          {step === 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={form.fullName}
                  onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Education level</span>
                <select
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={form.educationLevel}
                  onChange={(event) => setForm({ ...form, educationLevel: event.target.value })}
                >
                  {educationLevels.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Degree / programme</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={form.degree}
                  onChange={(event) => setForm({ ...form, degree: event.target.value })}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Specialization</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={form.specialization}
                  onChange={(event) => setForm({ ...form, specialization: event.target.value })}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Professional summary</span>
                <textarea
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={form.summary}
                  onChange={(event) => setForm({ ...form, summary: event.target.value })}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Years of experience</span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={form.yearsExperience}
                  onChange={(event) =>
                    setForm({ ...form, yearsExperience: Number(event.target.value) })
                  }
                  className="w-full accent-accent-600"
                />
                <p className="mt-2 text-sm text-slate-500">
                  {formatYearsExperience(form.yearsExperience)} of relevant internship / work
                  experience
                </p>
              </label>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Current occupation</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={form.currentOccupation}
                  onChange={(event) => setForm({ ...form, currentOccupation: event.target.value })}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Target occupation</span>
                <select
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={form.targetOccupation}
                  onChange={(event) => setForm({ ...form, targetOccupation: event.target.value })}
                >
                  {occupationOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Preferred industry</span>
                <select
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={form.preferredIndustry}
                  onChange={(event) => setForm({ ...form, preferredIndustry: event.target.value })}
                >
                  {industries.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Preferred region</span>
                <select
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={form.preferredRegion}
                  onChange={(event) => setForm({ ...form, preferredRegion: event.target.value })}
                >
                  {regions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <div className="md:col-span-2">
                <span className="mb-3 block text-sm font-semibold text-slate-700">Career interests</span>
                <div className="flex flex-wrap gap-2">
                  {careerInterestOptions.map((interest) => (
                    <SkillChip
                      key={interest}
                      label={interest}
                      active={form.careerInterests.includes(interest)}
                      onClick={() => toggleInterest(interest)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-6">
              <div>
                <span className="mb-3 block text-sm font-semibold text-slate-700">Current skills</span>
                <div className="flex flex-wrap gap-2">
                  {skillCatalog.map((skill) => (
                    <SkillChip
                      key={skill.id}
                      label={skill.name}
                      category={skill.category}
                      active={selectedCurrentSkills.includes(skill.name)}
                      onClick={() => toggleSkill(skill.name)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="mb-3 block text-sm font-semibold text-slate-700">Desired skills</span>
                <div className="flex flex-wrap gap-2">
                  {skillCatalog.map((skill) => (
                    <SkillChip
                      key={`desired-${skill.id}`}
                      label={skill.name}
                      category={skill.category}
                      removable={form.desiredSkills.includes(skill.name)}
                      active={form.desiredSkills.includes(skill.name)}
                      onClick={() => toggleDesiredSkill(skill.name)}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Desired skills influence target-level expectations for later skill gap analysis.
                </p>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Optional certifications</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  value={certificationInput}
                  onChange={(event) => setCertificationInput(event.target.value)}
                  placeholder="Separate certifications with commas"
                />
              </label>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((current) => current - 1)}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {step === steps.length - 1 ? "Save and continue" : "Continue"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
              Input mapping preview
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">
              How this profile feeds the ACTS architecture
            </h3>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">Profile Input Handler:</span> captures
                identity, education, current role, preferences, and skill selections.
              </p>
              <p>
                <span className="font-semibold text-slate-800">Skill Vector Representation Module:</span>
                uses current skills and desired capability areas as structured inputs for simulation.
              </p>
              <p>
                <span className="font-semibold text-slate-800">Simulation Controller:</span> later
                combines target occupation, industry preference, and planning horizon settings.
              </p>
            </div>
          </div>

          <div className="surface-card p-6">
            <p className="text-sm font-semibold text-slate-800">Current selections</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-500">Target occupation</dt>
                <dd className="font-semibold text-slate-800">{form.targetOccupation}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-500">Preferred industry</dt>
                <dd className="font-semibold text-slate-800">{form.preferredIndustry}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-500">Current skills selected</dt>
                <dd className="font-semibold text-slate-800">{selectedCurrentSkills.length}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-500">Desired skills marked</dt>
                <dd className="font-semibold text-slate-800">{form.desiredSkills.length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
