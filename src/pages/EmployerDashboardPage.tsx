import { ArrowRightLeft, Building2, Lightbulb, Search, Settings2, Users2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SkillDemandChart } from "../components/charts/SkillDemandChart";
import { TrendLineChart } from "../components/charts/TrendLineChart";
import { PageHeader } from "../components/common/PageHeader";
import { ProbabilityBar } from "../components/common/ProbabilityBar";
import { StatCard } from "../components/common/StatCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { useActs } from "../context/AppContext";
import {
  demoStudentAccounts,
  employerMetrics,
  employerReadinessRows,
  employerSkillDemand,
  employerTrends,
} from "../data/mockData";
import { formatYearsExperience } from "../utils/format";
import { calculateReadinessScore } from "../utils/simulation";

export function EmployerDashboardPage() {
  const [searchParams] = useSearchParams();
  const {
    employerCompanyProfile,
    employerHiringPreset,
    jobPostings,
    registeredStudentAccounts,
  } = useActs();
  const [candidateQuery, setCandidateQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setCandidateQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const candidateProfiles = useMemo(
    () =>
      [...demoStudentAccounts, ...registeredStudentAccounts]
        .map((account) => ({
          id: account.id,
          fullName: account.profile.fullName,
          currentOccupation: account.profile.currentOccupation,
          targetOccupation: account.profile.targetOccupation,
          degree: account.profile.degree,
          educationLevel: account.profile.educationLevel,
          specialization: account.profile.specialization,
          yearsExperience: account.profile.yearsExperience,
          preferredIndustry: account.profile.preferredIndustry,
          skills: account.skills.map((skill) => skill.name),
          readiness: calculateReadinessScore(account.skills, account.profile.targetOccupation),
        }))
        .sort((left, right) => right.readiness - left.readiness),
    [registeredStudentAccounts],
  );

  const filteredCandidates = candidateProfiles.filter((candidate) => {
    const normalizedQuery = candidateQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return true;
    }

    return (
      candidate.fullName.toLowerCase().includes(normalizedQuery) ||
      candidate.currentOccupation.toLowerCase().includes(normalizedQuery) ||
      candidate.targetOccupation.toLowerCase().includes(normalizedQuery) ||
      candidate.degree.toLowerCase().includes(normalizedQuery) ||
      candidate.educationLevel.toLowerCase().includes(normalizedQuery) ||
      candidate.specialization.toLowerCase().includes(normalizedQuery) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(normalizedQuery))
    );
  });

  const topCandidate = filteredCandidates[0];

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Employer Dashboard"
        title="Talent pathway and readiness overview"
        description="Search candidates by job title, bachelor's degree, specialization, or skill while reviewing pathway stability and employer-side ACTS readiness signals."
        actions={
          <Link
            to="/employer/company-setup"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Settings2 className="h-4 w-4" />
            Manage company setup
          </Link>
        }
      />

      <div className="surface-card mb-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Search candidate profiles after sign in</p>
            <p className="mt-1 text-sm text-slate-500">
              Search candidates by current role, target role, bachelor's degree, specialization, or encoded skills.
            </p>
          </div>
          <StatusBadge label={`${filteredCandidates.length} matched candidates`} tone="teal" />
        </div>
        <div className="mt-5 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={candidateQuery}
              onChange={(event) => setCandidateQuery(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
              placeholder="Search candidates by job title, bachelor's degree, specialization, or skill"
            />
          </div>
          <button
            type="button"
            onClick={() => setCandidateQuery("")}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Clear search
          </button>
        </div>
        {topCandidate ? (
          <div className="mt-5 rounded-3xl border border-accent-200 bg-accent-50/70 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-accent-900">Top current candidate match</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{topCandidate.fullName}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {topCandidate.currentOccupation} | {topCandidate.degree}
                </p>
              </div>
              <StatusBadge label={`${topCandidate.readiness}% readiness`} tone="teal" />
            </div>
            <div className="mt-4">
              <ProbabilityBar
                label={`Estimated readiness for ${topCandidate.targetOccupation}`}
                value={topCandidate.readiness}
                hint="Presentation-only estimate derived from encoded skill coverage against the target role."
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {employerMetrics.map((metric) => (
          <StatCard
            key={metric.label}
            title={metric.label}
            value={metric.value}
            caption={metric.delta}
            tone={metric.tone}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="surface-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Registered employer profile</p>
              <p className="mt-2 text-2xl font-semibold text-ink">{employerCompanyProfile.companyName}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {employerCompanyProfile.description}
              </p>
            </div>
            <StatusBadge
              label={employerCompanyProfile.verificationStatus}
              tone={employerCompanyProfile.verificationStatus === "Verified" ? "teal" : "amber"}
            />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
              <p className="text-sm text-slate-500">Industry</p>
              <p className="mt-2 font-semibold text-slate-900">{employerCompanyProfile.industry}</p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
              <p className="text-sm text-slate-500">Headquarters</p>
              <p className="mt-2 font-semibold text-slate-900">{employerCompanyProfile.headquarters}</p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
              <p className="text-sm text-slate-500">Active postings</p>
              <p className="mt-2 font-semibold text-slate-900">{jobPostings.length}</p>
            </div>
          </div>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-teal-700" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Current hiring preset</p>
              <p className="text-sm text-slate-500">
                Employer-defined thresholds that shape the shared job board.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
              <p className="text-sm text-slate-500">Priority occupations</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {employerHiringPreset.targetOccupations.map((occupation) => (
                  <span key={occupation} className="pill-chip">
                    {occupation}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
              <p className="text-sm text-slate-500">Priority skills</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {employerHiringPreset.prioritySkills.slice(0, 6).map((skill) => (
                  <span key={skill} className="pill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <StatusBadge label={`${employerHiringPreset.minimumReadiness}% shortlist threshold`} tone="accent" />
            <StatusBadge label={employerHiringPreset.preferredEducation} tone="slate" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="surface-card p-6">
          <div className="flex items-center gap-3">
            <Users2 className="h-5 w-5 text-accent-700" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Talent trend monitor</p>
              <p className="text-sm text-slate-500">
                Candidate readiness and pathway confidence over recent evaluation cycles
              </p>
            </div>
          </div>
          <div className="mt-5">
            <TrendLineChart data={employerTrends} />
          </div>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-teal-700" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Skill demand versus readiness</p>
              <p className="text-sm text-slate-500">
                Highlights where employer demand outpaces current candidate preparedness
              </p>
            </div>
          </div>
          <div className="mt-5">
            <SkillDemandChart data={employerSkillDemand} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-plum-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Employer insight summary</p>
                <p className="text-sm text-slate-500">
                  Distinct employer-facing interpretation of ACTS outputs
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              <p>
                ACTS helps employers interpret which candidate pathways are relatively stable,
                which transitions are high-risk, and which skills repeatedly delay readiness.
              </p>
              <p>
                This prototype does not make hiring decisions. It presents mock insight panels that
                illustrate how trajectory and skill-gap intelligence could support workforce planning.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <StatusBadge label="High-confidence transitions" tone="teal" />
              <StatusBadge label="In-demand skills" tone="accent" />
              <StatusBadge label="Gap clusters" tone="plum" />
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="h-5 w-5 text-accent-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Occupation transition insights</p>
                <p className="text-sm text-slate-500">
                  Example pathways that show the clearest readiness signal in the demo data
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {employerReadinessRows.map((row) => (
                <div key={row.pathway} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <p className="max-w-xl font-semibold text-slate-900">{row.pathway}</p>
                    <StatusBadge label={`${row.averageReadiness}% readiness`} tone="teal" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{row.hiringSignal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Candidate search results</p>
              <p className="mt-1 text-sm text-slate-500">
                Search results for current role, target role, degree, or skills.
              </p>
            </div>
            <StatusBadge label={`${filteredCandidates.length} results`} tone="teal" />
          </div>
          <div className="mt-5 space-y-4">
            {filteredCandidates.slice(0, 6).map((candidate) => (
              <div key={candidate.id} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{candidate.fullName}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {candidate.currentOccupation} | {candidate.degree}
                    </p>
                  </div>
                  <StatusBadge label={`${candidate.readiness}% readiness`} tone="teal" />
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-white p-4">
                    <p className="text-sm text-slate-500">Target pathway</p>
                    <p className="mt-2 font-semibold text-slate-900">{candidate.targetOccupation}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      {candidate.educationLevel} | {candidate.specialization}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-white p-4">
                    <p className="text-sm text-slate-500">Experience and industry</p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {formatYearsExperience(candidate.yearsExperience)} |{" "}
                      {candidate.preferredIndustry}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {candidate.skills.slice(0, 5).map((skill) => (
                        <span key={skill} className="pill-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredCandidates.length === 0 ? (
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 px-6 py-8 text-center">
                <h3 className="text-lg font-semibold text-slate-900">No candidates matched this search</h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  Search with terms like `Data Analyst`, `Bachelor's Degree`, `Computer Science`,
                  `AI`, or a key skill such as `SQL`.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
