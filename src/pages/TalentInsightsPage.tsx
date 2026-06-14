import { ArrowRightLeft, CircleGauge } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { StatusBadge } from "../components/common/StatusBadge";
import { employerReadinessRows } from "../data/mockData";

export function TalentInsightsPage() {
  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Talent Insights"
        title="Pathway-level talent insight cards"
        description="A simplified employer view that turns trajectory outputs into narrative hiring signals, readiness context, and transition stability indicators."
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card p-6">
          <div className="flex items-center gap-3">
            <CircleGauge className="h-5 w-5 text-accent-700" />
            <div>
              <p className="text-sm font-semibold text-slate-900">How to read this dashboard</p>
              <p className="text-sm text-slate-500">
                Employer interpretation of ACTS simulation outputs
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
            <p>
              Readiness reflects how closely the average candidate profile matches the occupational
              requirement structure for a given trajectory.
            </p>
            <p>
              Skill gap index summarizes the relative intensity of missing capabilities; lower values
              indicate smoother potential transitions.
            </p>
            <p>
              Hiring signal provides a plain-language interpretation suitable for presentation and demo discussion.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {employerReadinessRows.map((row) => (
            <div key={row.pathway} className="surface-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="h-4 w-4 text-accent-700" />
                    <p className="text-lg font-semibold text-slate-900">{row.pathway}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{row.hiringSignal}</p>
                </div>
                <StatusBadge label={`${row.averageReadiness}% ready`} tone="teal" />
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                  <p className="text-sm text-slate-500">Average readiness</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{row.averageReadiness}%</p>
                </div>
                <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                  <p className="text-sm text-slate-500">Skill gap index</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{row.skillGapIndex}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
