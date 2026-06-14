import { ArrowRight, BarChart3, FolderClock, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProbabilityDistributionChart } from "../components/charts/ProbabilityDistributionChart";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { ProbabilityBar } from "../components/common/ProbabilityBar";
import { StatCard } from "../components/common/StatCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { TimelineCard } from "../components/common/TimelineCard";
import { useActs } from "../context/AppContext";

export function ResultsPage() {
  const { latestResult } = useActs();
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    if (!latestResult) {
      setCompareIds([]);
      return;
    }

    setCompareIds(latestResult.pathways.slice(0, 2).map((path) => path.id));
  }, [latestResult]);

  if (!latestResult) {
    return (
      <EmptyState
        title="No trajectory results available"
        description="Run the ACTS simulation to generate probabilistic pathway outputs, timeline cards, and uncertainty notes."
        actionLabel="Run simulation"
        actionHref="/run-simulation"
      />
    );
  }

  const selectedPathways = latestResult.pathways.filter((path) =>
    compareIds.includes(path.id),
  );

  const toggleComparison = (id: string) => {
    setCompareIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, id];
    });
  };

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Career Trajectory Results Dashboard"
        title="Probabilistic career pathway outputs"
        description="ACTS presents simulated trajectory distributions, likely next roles, and uncertainty-aware pathway comparisons instead of deterministic guarantees."
        breadcrumbs={[
          { label: "Student Workspace", href: "/dashboard" },
          { label: "Results" },
        ]}
        actions={
          <>
            <Link
              to="/skill-gap"
              className="rounded-full border border-accent-200 bg-accent-50 px-5 py-2.5 text-sm font-semibold text-accent-800 transition hover:bg-accent-100"
            >
              View skill gap analysis
            </Link>
            <Link
              to="/history"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View saved history
            </Link>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Top pathway probability"
          value={`${latestResult.pathways[0]?.probability ?? 0}%`}
          caption="Leading stochastic estimate from the current ACTS run."
        />
        <StatCard
          title="Likely next role"
          value={latestResult.pathways[0]?.likelyNextRole ?? latestResult.targetOccupation}
          caption="Highest signal transition checkpoint after the current role."
          tone="teal"
        />
        <StatCard
          title="Simulation runs"
          value={latestResult.settings.simulationRuns.toLocaleString()}
          caption="Monte Carlo iterations used for this mock result."
          tone="plum"
        />
        <StatCard
          title="Planning horizon"
          value={latestResult.settings.planningHorizon}
          caption="Time horizon used in trajectory estimation."
          tone="accent"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
                  Probability distribution
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Top recommended career paths
                </h2>
              </div>
              <StatusBadge label="Probabilistic, not deterministic" tone="amber" />
            </div>
            <div className="mt-5">
              <ProbabilityDistributionChart data={latestResult.distribution} />
            </div>
            <div className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-1 h-5 w-5 shrink-0" />
                <p>{latestResult.uncertaintyNote}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {latestResult.pathways.map((path) => (
              <div key={path.id} className="surface-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl font-semibold text-slate-900">{path.label}</h3>
                      <StatusBadge
                        label={path.confidence}
                        tone={
                          path.confidence === "High"
                            ? "teal"
                            : path.confidence === "Moderate"
                              ? "accent"
                              : "plum"
                        }
                      />
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                      {path.narrative}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-semibold text-ink">{path.probability}%</p>
                    <p className="text-sm text-slate-500">Path probability</p>
                    <label className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={compareIds.includes(path.id)}
                        onChange={() => toggleComparison(path.id)}
                        className="accent-accent-600"
                      />
                      Compare
                    </label>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <ProbabilityBar
                    label="Likely next role"
                    value={Math.min(100, path.transitions[1]?.probability ?? path.probability)}
                    hint={path.likelyNextRole}
                  />
                  <ProbabilityBar
                    label="Readiness signal"
                    value={path.confidence === "High" ? 82 : path.confidence === "Moderate" ? 68 : 52}
                    hint={path.expectedReadiness}
                  />
                  <ProbabilityBar
                    label="Uncertainty pressure"
                    value={path.confidence === "Exploratory" ? 61 : path.confidence === "Moderate" ? 44 : 28}
                    hint={path.riskNote}
                  />
                </div>
                <div className="mt-6">
                  <TimelineCard items={path.transitions} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-accent-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Trajectory comparison</p>
                <p className="text-sm text-slate-500">Select up to three pathways to compare</p>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {selectedPathways.length > 0 ? (
                selectedPathways.map((path) => (
                  <div key={path.id} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{path.label}</p>
                        <p className="mt-2 text-sm text-slate-600">{path.transitions.map((item) => item.role).join(" -> ")}</p>
                      </div>
                      <StatusBadge label={`${path.probability}%`} tone="teal" />
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-sm text-slate-500">Likely next role</p>
                        <p className="mt-2 font-semibold text-slate-900">{path.likelyNextRole}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-sm text-slate-500">Confidence posture</p>
                        <p className="mt-2 font-semibold text-slate-900">{path.confidence}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{path.riskNote}</p>
                  </div>
                ))
              ) : (
                <p className="rounded-3xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
                  Select a pathway above to activate the comparison view.
                </p>
              )}
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Simulated trajectory table</p>
                <p className="mt-1 text-sm text-slate-500">
                  Presentation-ready rows summarizing the sampled outcomes.
                </p>
              </div>
              <Link
                to="/history"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <FolderClock className="h-4 w-4" />
                History
              </Link>
            </div>
            <div className="mt-4 overflow-hidden rounded-3xl border border-slate-100">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 text-left text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Scenario</th>
                    <th className="px-4 py-3 font-semibold">Probability</th>
                    <th className="px-4 py-3 font-semibold">Timeline</th>
                    <th className="px-4 py-3 font-semibold">Industry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {latestResult.trajectories.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-4 font-medium text-slate-900">{row.scenario}</td>
                      <td className="px-4 py-4 text-slate-600">{row.probability}%</td>
                      <td className="px-4 py-4 text-slate-600">{row.timeline}</td>
                      <td className="px-4 py-4 text-slate-600">{row.industry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              to="/skill-gap"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-700"
            >
              Continue to skill gap analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
