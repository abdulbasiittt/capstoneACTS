import { Eye, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { StatusBadge } from "../components/common/StatusBadge";
import { useActs } from "../context/AppContext";
import { formatDateTime } from "../utils/format";

export function HistoryPage() {
  const navigate = useNavigate();
  const { history, deleteResult, loadResult } = useActs();
  const [search, setSearch] = useState("");
  const [targetFilter, setTargetFilter] = useState("All targets");
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const targets = useMemo(
    () => ["All targets", ...Array.from(new Set(history.map((item) => item.targetOccupation)))],
    [history],
  );

  const filteredHistory = useMemo(
    () =>
      history.filter((result) => {
        const matchesSearch =
          result.targetOccupation.toLowerCase().includes(search.toLowerCase()) ||
          result.pathways[0]?.label.toLowerCase().includes(search.toLowerCase());
        const matchesTarget =
          targetFilter === "All targets" || result.targetOccupation === targetFilter;

        return matchesSearch && matchesTarget;
      }),
    [history, search, targetFilter],
  );

  const comparedResults = filteredHistory.filter((item) => compareIds.includes(item.id));

  const toggleCompare = (id: string) => {
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

  if (history.length === 0) {
    return (
      <EmptyState
        title="No saved simulation history"
        description="New ACTS runs will appear here with filters, comparison controls, and quick actions for review."
        actionLabel="Run the ACTS simulation"
        actionHref="/run-simulation"
      />
    );
  }

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Results Management Module"
        title="Saved simulation history"
        description="Review previous ACTS runs, compare parameter sets and top outcomes, and load snapshots back into the active dashboard."
        breadcrumbs={[
          { label: "Student Workspace", href: "/dashboard" },
          { label: "Simulation History" },
        ]}
      />

      <div className="surface-card p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-2xl border border-slate-200 px-11 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
              placeholder="Search target occupations or pathway labels"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <select
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
            value={targetFilter}
            onChange={(event) => setTargetFilter(event.target.value)}
          >
            {targets.map((target) => (
              <option key={target}>{target}</option>
            ))}
          </select>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Compare up to 3 runs
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Compare</th>
                <th className="px-4 py-3 font-semibold">Date / time</th>
                <th className="px-4 py-3 font-semibold">Target occupation</th>
                <th className="px-4 py-3 font-semibold">Simulation parameters</th>
                <th className="px-4 py-3 font-semibold">Top predicted outcome</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredHistory.map((result) => (
                <tr key={result.id}>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="accent-accent-600"
                      checked={compareIds.includes(result.id)}
                      onChange={() => toggleCompare(result.id)}
                    />
                  </td>
                  <td className="px-4 py-4 text-slate-600">{formatDateTime(result.createdAt)}</td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-slate-900">{result.targetOccupation}</p>
                    <p className="mt-1 text-xs text-slate-500">{result.pathways[0]?.label}</p>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {result.settings.planningHorizon} • {result.settings.simulationRuns.toLocaleString()} runs • {result.settings.riskPreference}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge label={`${result.pathways[0]?.probability ?? 0}%`} tone="teal" />
                      <span className="text-slate-700">{result.topOutcome}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          loadResult(result.id);
                          navigate("/results");
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteResult(result.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 surface-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Comparison workspace</p>
            <p className="mt-1 text-sm text-slate-500">
              Compare selected ACTS runs side by side using saved mock snapshots.
            </p>
          </div>
          <StatusBadge label={`${comparedResults.length} selected`} tone="accent" />
        </div>

        {comparedResults.length === 0 ? (
          <p className="mt-5 rounded-3xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
            Select one or more saved runs from the table above to compare their target roles,
            pathway probabilities, and simulation assumptions.
          </p>
        ) : (
          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            {comparedResults.map((result) => (
              <div key={result.id} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{result.targetOccupation}</p>
                    <p className="mt-1 text-sm text-slate-500">{formatDateTime(result.createdAt)}</p>
                  </div>
                  <StatusBadge label={`${result.pathways[0]?.probability ?? 0}% top path`} tone="teal" />
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">Top outcome</span>
                    <span className="font-semibold text-slate-800">{result.topOutcome}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">Risk preference</span>
                    <span className="font-semibold text-slate-800">{result.settings.riskPreference}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">Industry focus</span>
                    <span className="font-semibold text-slate-800">
                      {result.settings.preferredIndustries[0] ?? "General"}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{result.pathways[0]?.narrative}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
