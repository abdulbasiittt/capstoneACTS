import { AlertCircle, Building2, FileCheck2, PlusCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/common/PageHeader";
import { ProbabilityBar } from "../components/common/ProbabilityBar";
import { StatCard } from "../components/common/StatCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { useActs } from "../context/AppContext";
import { occupationRequirements, skillCatalog } from "../data/mockData";
import type { EmployerCompanyProfile, EmployerHiringPreset } from "../types";
import { formatDateTime } from "../utils/format";

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function CompanySetupPage() {
  const {
    employerCompanyProfile,
    employerHiringPreset,
    jobPostings,
    saveEmployerCompanyProfile,
    saveEmployerHiringPreset,
    requestCompanyVerification,
    createJobPosting,
  } = useActs();
  const [companyProfile, setCompanyProfile] =
    useState<EmployerCompanyProfile>(employerCompanyProfile);
  const [hiringPreset, setHiringPreset] =
    useState<EmployerHiringPreset>(employerHiringPreset);
  const [jobForm, setJobForm] = useState({
    title: "",
    occupationTrack: employerHiringPreset.targetOccupations[0] ?? "Data Analyst",
    location: employerCompanyProfile.headquarters || "Kuala Lumpur",
    workMode: employerHiringPreset.preferredWorkModes[0] ?? "Hybrid",
    employmentType: "Full-time",
    salaryRange: "MYR 4,000 - 5,500",
    summary: "",
    responsibilitiesText: "Support structured hiring requirements\nCoordinate with cross-functional teams",
    requiredSkills: employerHiringPreset.prioritySkills.slice(0, 3),
    preferredSkills: employerHiringPreset.prioritySkills.slice(3, 5),
    minimumReadiness: employerHiringPreset.minimumReadiness,
  });
  const [formError, setFormError] = useState("");

  const occupationOptions = occupationRequirements.map((item) => item.occupation);
  const skillOptions = skillCatalog.map((item) => item.name);

  const handleVerifyCompany = () => {
    setFormError("");
    const result = requestCompanyVerification(companyProfile);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    setCompanyProfile((current) => ({
      ...current,
      verificationStatus: result.status ?? current.verificationStatus,
      verificationNotes: result.message,
    }));
  };

  const handlePresetSave = () => {
    setFormError("");

    if (hiringPreset.targetOccupations.length === 0 || hiringPreset.prioritySkills.length === 0) {
      setFormError("Select at least one target occupation and one priority skill before saving the preset.");
      return;
    }

    saveEmployerHiringPreset(hiringPreset);
  };

  const handleCreateJob = () => {
    setFormError("");
    const responsibilities = splitLines(jobForm.responsibilitiesText);

    if (!jobForm.title.trim() || !jobForm.summary.trim()) {
      setFormError("Job title and summary are required before publishing.");
      return;
    }

    if (jobForm.requiredSkills.length === 0 || responsibilities.length === 0) {
      setFormError("Add at least one required skill and one responsibility before publishing.");
      return;
    }

    createJobPosting({
      title: jobForm.title.trim(),
      location: jobForm.location.trim(),
      workMode: jobForm.workMode,
      employmentType: jobForm.employmentType,
      salaryRange: jobForm.salaryRange.trim(),
      summary: jobForm.summary.trim(),
      responsibilities,
      requiredSkills: jobForm.requiredSkills,
      preferredSkills: jobForm.preferredSkills,
      minimumReadiness: jobForm.minimumReadiness,
      occupationTrack: jobForm.occupationTrack,
    });

    setJobForm((current) => ({
      ...current,
      title: "",
      summary: "",
      responsibilitiesText: "Support structured hiring requirements\nCoordinate with cross-functional teams",
      requiredSkills: hiringPreset.prioritySkills.slice(0, 3),
      preferredSkills: hiringPreset.prioritySkills.slice(3, 5),
      minimumReadiness: hiringPreset.minimumReadiness,
      occupationTrack: hiringPreset.targetOccupations[0] ?? current.occupationTrack,
    }));
  };

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Employer Company Setup"
        title="Register and verify your company requirements"
        description="Set the employer company profile, define the hiring preset, and publish jobs that student users can search from the shared ACTS job board."
        breadcrumbs={[
          { label: "Employer Workspace", href: "/employer" },
          { label: "Company Setup" },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Verification status"
          value={companyProfile.verificationStatus}
          caption="Employer trust signal shown on student job listings."
        />
        <StatCard
          title="Active job postings"
          value={`${jobPostings.length}`}
          caption="Live roles published from this employer workspace."
          tone="teal"
        />
        <StatCard
          title="Minimum readiness"
          value={`${hiringPreset.minimumReadiness}%`}
          caption="Default shortlist threshold used for postings."
          tone="plum"
        />
        <StatCard
          title="Priority occupations"
          value={`${hiringPreset.targetOccupations.length}`}
          caption="Career tracks currently targeted by the company."
          tone="accent"
        />
      </div>

      {formError ? (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{formError}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-accent-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Company registration</p>
                  <p className="text-sm text-slate-500">
                    Update the company identity used by the employer dashboard and job board.
                  </p>
                </div>
              </div>
              <StatusBadge
                label={companyProfile.verificationStatus}
                tone={companyProfile.verificationStatus === "Verified" ? "teal" : "amber"}
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Company name</span>
                <input
                  value={companyProfile.companyName}
                  onChange={(event) =>
                    setCompanyProfile((current) => ({ ...current, companyName: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Industry</span>
                <input
                  value={companyProfile.industry}
                  onChange={(event) =>
                    setCompanyProfile((current) => ({ ...current, industry: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Headquarters</span>
                <input
                  value={companyProfile.headquarters}
                  onChange={(event) =>
                    setCompanyProfile((current) => ({ ...current, headquarters: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Company size</span>
                <input
                  value={companyProfile.companySize}
                  onChange={(event) =>
                    setCompanyProfile((current) => ({ ...current, companySize: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Website</span>
                <input
                  value={companyProfile.website}
                  onChange={(event) =>
                    setCompanyProfile((current) => ({ ...current, website: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Registration ID</span>
                <input
                  value={companyProfile.registrationId}
                  onChange={(event) =>
                    setCompanyProfile((current) => ({ ...current, registrationId: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Contact email</span>
                <input
                  value={companyProfile.contactEmail}
                  onChange={(event) =>
                    setCompanyProfile((current) => ({ ...current, contactEmail: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Contact phone</span>
                <input
                  value={companyProfile.contactPhone}
                  onChange={(event) =>
                    setCompanyProfile((current) => ({ ...current, contactPhone: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Company description</span>
                <textarea
                  value={companyProfile.description}
                  onChange={(event) =>
                    setCompanyProfile((current) => ({ ...current, description: event.target.value }))
                  }
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormError("");
                  saveEmployerCompanyProfile(companyProfile);
                }}
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Save company profile
              </button>
              <button
                type="button"
                onClick={handleVerifyCompany}
                className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-5 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
              >
                <ShieldCheck className="h-4 w-4" />
                Verify company
              </button>
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <FileCheck2 className="h-5 w-5 text-teal-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Verification note</p>
                <p className="text-sm text-slate-500">
                  Simulated validation checks for company authenticity in the prototype.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-sm text-slate-500">Checklist</p>
                <div className="mt-3 space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between gap-3">
                    <span>Registration ID</span>
                    <StatusBadge
                      label={companyProfile.registrationId.trim() ? "Ready" : "Missing"}
                      tone={companyProfile.registrationId.trim() ? "teal" : "amber"}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Company website</span>
                    <StatusBadge
                      label={companyProfile.website.trim() ? "Ready" : "Missing"}
                      tone={companyProfile.website.trim() ? "teal" : "amber"}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Domain contact email</span>
                    <StatusBadge
                      label={companyProfile.contactEmail.trim() ? "Ready" : "Missing"}
                      tone={companyProfile.contactEmail.trim() ? "teal" : "amber"}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Contact phone</span>
                    <StatusBadge
                      label={companyProfile.contactPhone.trim() ? "Ready" : "Missing"}
                      tone={companyProfile.contactPhone.trim() ? "teal" : "amber"}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-teal-100 bg-teal-50/70 p-4">
                <p className="text-sm font-semibold text-slate-900">Current note</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {companyProfile.verificationNotes}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="surface-card p-6">
            <p className="text-sm font-semibold text-slate-900">Company hiring preset</p>
            <p className="mt-1 text-sm text-slate-500">
              Define the occupations, skills, and readiness level your company prioritizes.
            </p>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-700">Target occupations</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {occupationOptions.map((occupation) => (
                  <button
                    key={occupation}
                    type="button"
                    onClick={() =>
                      setHiringPreset((current) => ({
                        ...current,
                        targetOccupations: toggleValue(current.targetOccupations, occupation),
                      }))
                    }
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      hiringPreset.targetOccupations.includes(occupation)
                        ? "border-accent-200 bg-accent-50 text-accent-800"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {occupation}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-700">Priority skills</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() =>
                      setHiringPreset((current) => ({
                        ...current,
                        prioritySkills: toggleValue(current.prioritySkills, skill),
                      }))
                    }
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      hiringPreset.prioritySkills.includes(skill)
                        ? "border-teal-200 bg-teal-50 text-teal-800"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Preferred education</span>
                <input
                  value={hiringPreset.preferredEducation}
                  onChange={(event) =>
                    setHiringPreset((current) => ({ ...current, preferredEducation: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Preferred experience</span>
                <input
                  value={hiringPreset.preferredExperience}
                  onChange={(event) =>
                    setHiringPreset((current) => ({ ...current, preferredExperience: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-700">Preferred work modes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Hybrid", "Remote", "On-site"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() =>
                      setHiringPreset((current) => ({
                        ...current,
                        preferredWorkModes: toggleValue(current.preferredWorkModes, mode),
                      }))
                    }
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      hiringPreset.preferredWorkModes.includes(mode)
                        ? "border-plum-100 bg-plum-100/60 text-plum-700"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <ProbabilityBar
                label="Minimum readiness threshold"
                value={hiringPreset.minimumReadiness}
                hint="This threshold is shown to students as the employer shortlist target."
              />
              <input
                type="range"
                min="45"
                max="95"
                step="1"
                value={hiringPreset.minimumReadiness}
                onChange={(event) =>
                  setHiringPreset((current) => ({
                    ...current,
                    minimumReadiness: Number(event.target.value),
                  }))
                }
                className="mt-4 w-full"
              />
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Preset notes</span>
              <textarea
                value={hiringPreset.notes}
                onChange={(event) =>
                  setHiringPreset((current) => ({ ...current, notes: event.target.value }))
                }
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
              />
            </label>

            <button
              type="button"
              onClick={handlePresetSave}
              className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save hiring preset
            </button>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <PlusCircle className="h-5 w-5 text-teal-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Publish job posting</p>
                <p className="text-sm text-slate-500">
                  Posted roles become searchable from the student side of the demo.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Job title</span>
                <input
                  value={jobForm.title}
                  onChange={(event) =>
                    setJobForm((current) => ({ ...current, title: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Occupation track</span>
                <select
                  value={jobForm.occupationTrack}
                  onChange={(event) =>
                    setJobForm((current) => ({ ...current, occupationTrack: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                >
                  {occupationOptions.map((occupation) => (
                    <option key={occupation} value={occupation}>
                      {occupation}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Location</span>
                <input
                  value={jobForm.location}
                  onChange={(event) =>
                    setJobForm((current) => ({ ...current, location: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Work mode</span>
                <select
                  value={jobForm.workMode}
                  onChange={(event) =>
                    setJobForm((current) => ({ ...current, workMode: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                >
                  {["Hybrid", "Remote", "On-site"].map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Employment type</span>
                <select
                  value={jobForm.employmentType}
                  onChange={(event) =>
                    setJobForm((current) => ({ ...current, employmentType: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                >
                  {["Full-time", "Graduate programme", "Internship", "Contract"].map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Salary range</span>
                <input
                  value={jobForm.salaryRange}
                  onChange={(event) =>
                    setJobForm((current) => ({ ...current, salaryRange: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Role summary</span>
                <textarea
                  value={jobForm.summary}
                  onChange={(event) =>
                    setJobForm((current) => ({ ...current, summary: event.target.value }))
                  }
                  rows={3}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </label>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-700">Required skills</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() =>
                      setJobForm((current) => ({
                        ...current,
                        requiredSkills: toggleValue(current.requiredSkills, skill),
                        preferredSkills: current.preferredSkills.filter((item) => item !== skill),
                      }))
                    }
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      jobForm.requiredSkills.includes(skill)
                        ? "border-accent-200 bg-accent-50 text-accent-800"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-700">Preferred skills</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() =>
                      setJobForm((current) => ({
                        ...current,
                        preferredSkills: current.requiredSkills.includes(skill)
                          ? current.preferredSkills
                          : toggleValue(current.preferredSkills, skill),
                      }))
                    }
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      jobForm.preferredSkills.includes(skill)
                        ? "border-teal-200 bg-teal-50 text-teal-800"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <ProbabilityBar
                label="Posting readiness threshold"
                value={jobForm.minimumReadiness}
                hint="Students will see this as the readiness level the employer prefers."
              />
              <input
                type="range"
                min="45"
                max="95"
                step="1"
                value={jobForm.minimumReadiness}
                onChange={(event) =>
                  setJobForm((current) => ({
                    ...current,
                    minimumReadiness: Number(event.target.value),
                  }))
                }
                className="mt-4 w-full"
              />
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Responsibilities (one per line)</span>
              <textarea
                value={jobForm.responsibilitiesText}
                onChange={(event) =>
                  setJobForm((current) => ({ ...current, responsibilitiesText: event.target.value }))
                }
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
              />
            </label>

            <button
              type="button"
              onClick={handleCreateJob}
              className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Publish job posting
            </button>
          </div>
        </div>
      </div>

      <div className="surface-card mt-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Published job postings</p>
            <p className="text-sm text-slate-500">
              Student users can search these openings from the job board page.
            </p>
          </div>
          <StatusBadge label={`${jobPostings.length} live postings`} tone="teal" />
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          {jobPostings.map((posting) => (
            <div key={posting.id} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{posting.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{posting.location}</p>
                </div>
                <StatusBadge
                  label={posting.verificationStatus}
                  tone={posting.verificationStatus === "Verified" ? "teal" : "amber"}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{posting.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {posting.requiredSkills.slice(0, 4).map((skill) => (
                  <span key={skill} className="pill-chip">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                Posted {formatDateTime(posting.postedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
