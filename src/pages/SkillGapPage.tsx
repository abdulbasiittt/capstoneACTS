import { ArrowRight, BookOpenCheck, CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { SkillGapRadarChart } from "../components/charts/SkillGapRadarChart";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { ProbabilityBar } from "../components/common/ProbabilityBar";
import { StatCard } from "../components/common/StatCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { useActs } from "../context/AppContext";

export function SkillGapPage() {
  const { latestResult } = useActs();

  if (!latestResult) {
    return (
      <EmptyState
        title="No skill gap snapshot yet"
        description="Run a simulation with the skill gap option enabled to view current versus required occupational readiness."
        actionLabel="Go to simulation setup"
        actionHref="/run-simulation"
      />
    );
  }

  const matched = latestResult.skillGaps.filter((gap) => gap.status === "Matched");
  const partial = latestResult.skillGaps.filter((gap) => gap.status === "Partial");
  const missing = latestResult.skillGaps.filter((gap) => gap.status === "Gap");

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Skill Gap Analysis Module"
        title="Current skills versus target occupation requirements"
        description="ACTS compares the present skill vector with the target occupation profile to highlight matched areas, partial readiness, missing skills, and recommended development actions."
        breadcrumbs={[
          { label: "Student Workspace", href: "/dashboard" },
          { label: "Skill Gap Analysis" },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Matched skills"
          value={`${matched.length}`}
          caption="Already aligned with the target occupation requirement profile."
          tone="teal"
        />
        <StatCard
          title="Partial matches"
          value={`${partial.length}`}
          caption="Needs modest reinforcement before the next transition checkpoint."
          tone="accent"
        />
        <StatCard
          title="Priority gaps"
          value={`${missing.length}`}
          caption="Missing or underdeveloped capabilities to prioritize."
          tone="plum"
        />
        <StatCard
          title="Learning actions"
          value={`${latestResult.learningActions.length}`}
          caption="Suggested certifications or development actions tied to the target role."
          tone="accent"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
                  Capability comparison
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  {latestResult.targetOccupation} readiness profile
                </h2>
              </div>
              <StatusBadge label="O*NET-informed reference" tone="teal" />
            </div>
            <div className="mt-5">
              <SkillGapRadarChart data={latestResult.skillGaps} />
            </div>
          </div>

          <div className="surface-card p-6">
            <p className="text-sm font-semibold text-slate-900">Skill gap table</p>
            <div className="mt-4 overflow-hidden rounded-3xl border border-slate-100">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 text-left text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Skill</th>
                    <th className="px-4 py-3 font-semibold">Current</th>
                    <th className="px-4 py-3 font-semibold">Required</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {latestResult.skillGaps.map((gap) => (
                    <tr key={gap.skill}>
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-900">{gap.skill}</p>
                        <p className="mt-1 text-xs text-slate-500">{gap.category}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{gap.currentLevel}/5</td>
                      <td className="px-4 py-4 text-slate-600">{gap.requiredLevel}/5</td>
                      <td className="px-4 py-4">
                        <StatusBadge
                          label={gap.status}
                          tone={
                            gap.status === "Matched"
                              ? "teal"
                              : gap.status === "Partial"
                                ? "accent"
                                : "amber"
                          }
                        />
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge
                          label={gap.priority}
                          tone={
                            gap.priority === "High"
                              ? "amber"
                              : gap.priority === "Medium"
                                ? "accent"
                                : "slate"
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="flex items-start gap-3">
              <CircleAlert className="mt-1 h-5 w-5 text-accent-700" />
              <div>
                <p className="font-semibold text-slate-900">Development interpretation</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Missing skills reflect the highest-priority development areas for the selected
                  occupation. Partial matches are often sufficient for entry transitions when
                  reinforced by projects, case studies, or guided workplace exposure.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {latestResult.skillGaps.map((gap) => (
                <ProbabilityBar
                  key={gap.skill}
                  label={gap.skill}
                  value={Math.max(0, Math.round((gap.currentLevel / gap.requiredLevel) * 100))}
                  hint={gap.recommendation}
                />
              ))}
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <BookOpenCheck className="h-5 w-5 text-teal-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Recommended development actions</p>
                <p className="text-sm text-slate-500">
                  Suggested learning areas and certifications for {latestResult.targetOccupation}
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {latestResult.learningActions.map((action) => (
                <div key={action.title} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{action.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{action.outcome}</p>
                    </div>
                    <StatusBadge label={action.type} tone="teal" />
                  </div>
                  <p className="mt-3 text-sm text-slate-500">Estimated duration: {action.duration}</p>
                </div>
              ))}
            </div>
            <Link
              to="/history"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-700"
            >
              Review saved runs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
