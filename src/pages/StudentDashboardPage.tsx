import { ArrowRight, BookOpenCheck, BrainCircuit, FolderClock, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { ProbabilityBar } from "../components/common/ProbabilityBar";
import { StatCard } from "../components/common/StatCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { useActs } from "../context/AppContext";
import { formatDateTime, formatYearsExperience } from "../utils/format";
import { calculateReadinessScore } from "../utils/simulation";

export function StudentDashboardPage() {
  const navigate = useNavigate();
  const { profile, skills, latestResult, history, jobPostings } = useActs();
  const [jobQuery, setJobQuery] = useState("");
  const readinessScore = calculateReadinessScore(skills, profile.targetOccupation);

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Career Trajectory Dashboard"
        title="Student dashboard"
        description="Review your structured profile, simulation status, saved trajectory runs, and search employer-posted jobs from the ACTS workspace."
      />

      <div className="surface-card mb-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Search jobs after sign in</p>
            <p className="mt-1 text-sm text-slate-500">
              Search roles posted from the employer workspace by title, company, or skill.
            </p>
          </div>
          <StatusBadge label={`${jobPostings.length} employer-posted roles`} tone="teal" />
        </div>
        <div className="mt-5 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={jobQuery}
              onChange={(event) => setJobQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  navigate(`/jobs?q=${encodeURIComponent(jobQuery.trim())}`);
                }
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
              placeholder="Search jobs by title, company, or skill"
            />
          </div>
          <button
            type="button"
            onClick={() => navigate(`/jobs?q=${encodeURIComponent(jobQuery.trim())}`)}
            className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search jobs
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Readiness index"
          value={`${readinessScore}%`}
          caption="Estimated alignment against the current target occupation."
        />
        <StatCard
          title="Saved simulation runs"
          value={`${history.length}`}
          caption="Snapshots stored for dashboard review and comparison."
          tone="teal"
        />
        <StatCard
          title="Structured skill inputs"
          value={`${skills.length}`}
          caption="Skills encoded into the ACTS vector representation module."
          tone="plum"
        />
        <StatCard
          title="Latest top pathway"
          value={latestResult ? `${latestResult.pathways[0]?.probability ?? 0}%` : "N/A"}
          caption="Probability of the current leading simulated path."
          tone="accent"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
                  Profile summary
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">{profile.fullName}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{profile.summary}</p>
              </div>
              <Link
                to="/account"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Manage account
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-sm font-semibold text-slate-800">Current trajectory goal</p>
                <p className="mt-2 text-lg font-semibold text-ink">{profile.targetOccupation}</p>
                <p className="mt-2 text-sm text-slate-500">
                  Preferred industry: {profile.preferredIndustry} | Region: {profile.preferredRegion}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-sm font-semibold text-slate-800">Academic profile</p>
                <p className="mt-2 text-lg font-semibold text-ink">{profile.degree}</p>
                <p className="mt-2 text-sm text-slate-500">
                  {profile.educationLevel} | {formatYearsExperience(profile.yearsExperience)}{" "}
                  experience
                </p>
              </div>
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
                  Latest simulation
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  {latestResult ? latestResult.targetOccupation : "No simulation yet"}
                </h3>
              </div>
              {latestResult ? <StatusBadge label="Saved result" tone="teal" /> : null}
            </div>
            {latestResult ? (
              <div className="mt-5 space-y-4">
                <ProbabilityBar
                  label={latestResult.pathways[0]?.label ?? "Leading pathway"}
                  value={latestResult.pathways[0]?.probability ?? 0}
                  hint={latestResult.pathways[0]?.narrative}
                />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-slate-100 bg-white p-4">
                    <p className="text-sm text-slate-500">Top outcome</p>
                    <p className="mt-2 font-semibold text-slate-900">{latestResult.topOutcome}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-white p-4">
                    <p className="text-sm text-slate-500">Last updated</p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {formatDateTime(latestResult.createdAt)}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-white p-4">
                    <p className="text-sm text-slate-500">Simulation runs</p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {latestResult.settings.simulationRuns.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5">
                <EmptyState
                  title="No simulation run available yet"
                  description="Complete the profile and simulation setup to generate probabilistic pathway outputs for this demo."
                  actionLabel="Run your first simulation"
                  actionHref="/run-simulation"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
              Recommended next action
            </p>
            <div className="mt-4 rounded-3xl border border-accent-200 bg-accent-50 p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 text-accent-700" />
                <div>
                  <p className="font-semibold text-accent-900">Refine the skill vector before the next run</p>
                  <p className="mt-2 text-sm leading-6 text-accent-900/80">
                    ACTS is already using {skills.length} structured skill inputs. Review proficiency
                    levels and target levels to make the next pathway output more presentation-ready.
                  </p>
                  <Link
                    to="/skill-vector"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-800"
                  >
                    Open skill profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link
                to="/run-simulation"
                className="rounded-3xl border border-slate-100 bg-white p-4 transition hover:border-accent-200 hover:bg-accent-50/50"
              >
                <BrainCircuit className="h-5 w-5 text-accent-700" />
                <p className="mt-3 font-semibold text-slate-900">Run simulation</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Adjust horizon, risk preference, and preferred industries.
                </p>
              </Link>
              <Link
                to="/skill-gap"
                className="rounded-3xl border border-slate-100 bg-white p-4 transition hover:border-teal-200 hover:bg-teal-50/50"
              >
                <BookOpenCheck className="h-5 w-5 text-teal-700" />
                <p className="mt-3 font-semibold text-slate-900">Review skill gaps</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Compare current readiness against target occupation requirements.
                </p>
              </Link>
              <Link
                to="/jobs"
                className="rounded-3xl border border-slate-100 bg-white p-4 transition hover:border-plum-200 hover:bg-plum-100/30"
              >
                <Search className="h-5 w-5 text-plum-600" />
                <p className="mt-3 font-semibold text-slate-900">Open job board</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Search employer-posted roles and compare them with your current profile.
                </p>
              </Link>
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
                  Skill profile overview
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  Encoded skill vector snapshot
                </h3>
              </div>
              <Link
                to="/skill-vector"
                className="text-sm font-semibold text-accent-700 transition hover:text-accent-800"
              >
                Edit
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {skills.slice(0, 6).map((skill) => (
                <ProbabilityBar
                  key={skill.id}
                  label={skill.name}
                  value={skill.proficiency * 20}
                  hint={`${skill.category} | target level ${skill.targetLevel}/5`}
                />
              ))}
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
                  Saved simulation runs
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Recent history</h3>
              </div>
              <Link
                to="/history"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <FolderClock className="h-4 w-4" />
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {history.slice(0, 3).map((result) => (
                <div key={result.id} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{result.targetOccupation}</p>
                      <p className="mt-1 text-sm text-slate-500">{formatDateTime(result.createdAt)}</p>
                    </div>
                    <StatusBadge label={`${result.pathways[0]?.probability ?? 0}% top path`} tone="teal" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{result.pathways[0]?.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
                  Employer-posted jobs
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Latest openings</h3>
              </div>
              <Link
                to="/jobs"
                className="text-sm font-semibold text-accent-700 transition hover:text-accent-800"
              >
                Open job board
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {jobPostings.slice(0, 3).map((posting) => (
                <div key={posting.id} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{posting.title}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {posting.companyName} | {posting.location}
                      </p>
                    </div>
                    <StatusBadge label={`${posting.minimumReadiness}% ready`} tone="plum" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{posting.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
