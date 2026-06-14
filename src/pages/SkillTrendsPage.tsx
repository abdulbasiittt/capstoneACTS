import { BarChart3, Lightbulb } from "lucide-react";
import { SkillDemandChart } from "../components/charts/SkillDemandChart";
import { PageHeader } from "../components/common/PageHeader";
import { StatusBadge } from "../components/common/StatusBadge";
import { employerSkillDemand } from "../data/mockData";

export function SkillTrendsPage() {
  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Skill Trends"
        title="In-demand skill signals"
        description="A focused employer view for observing which skills appear most often in trajectory bottlenecks and where candidate readiness still lags behind demand."
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-accent-700" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Demand and readiness chart</p>
              <p className="text-sm text-slate-500">
                Mock visualization of employer demand against candidate capability
              </p>
            </div>
          </div>
          <div className="mt-5">
            <SkillDemandChart data={employerSkillDemand} />
          </div>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-teal-700" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Trend interpretation</p>
              <p className="text-sm text-slate-500">
                Why these skill gaps matter for employer-side talent planning
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {employerSkillDemand.map((skill) => (
              <div key={skill.skill} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-slate-900">{skill.skill}</p>
                  <StatusBadge
                    label={`${skill.demand - skill.readiness} pt gap`}
                    tone={skill.demand - skill.readiness > 20 ? "amber" : "accent"}
                  />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-sm text-slate-500">Employer demand</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{skill.demand}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-sm text-slate-500">Candidate readiness</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{skill.readiness}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
