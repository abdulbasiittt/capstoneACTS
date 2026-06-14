import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { SkillChip } from "../components/common/SkillChip";
import { StepIndicator } from "../components/common/StepIndicator";
import { StatusBadge } from "../components/common/StatusBadge";
import { useActs } from "../context/AppContext";
import { industries, occupationRequirements } from "../data/mockData";
import type { SimulationSettings } from "../types";

const pipelineSteps = [
  "Input encoding",
  "Simulation controller",
  "Probabilistic outputs",
];

export function RunSimulationPage() {
  const navigate = useNavigate();
  const { profile, simulationSettings, startSimulation } = useActs();
  const [settings, setSettings] = useState<SimulationSettings>(simulationSettings);

  const toggleIndustry = (industry: string) => {
    setSettings((current) => ({
      ...current,
      preferredIndustries: current.preferredIndustries.includes(industry)
        ? current.preferredIndustries.filter((item) => item !== industry)
        : [...current.preferredIndustries, industry],
    }));
  };

  const handleRun = () => {
    startSimulation(settings);
    navigate("/processing");
  };

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="Simulation Controller"
        title="Configure the ACTS career trajectory simulation"
        description="Set the target occupation, planning horizon, run volume, and uncertainty preference that guide the Markov Chain and Monte Carlo stages."
        breadcrumbs={[
          { label: "Student Workspace", href: "/dashboard" },
          { label: "Run Simulation" },
        ]}
      />

      <StepIndicator steps={pipelineSteps} currentStep={1} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Target occupation</span>
              <select
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                value={settings.targetOccupation}
                onChange={(event) =>
                  setSettings({ ...settings, targetOccupation: event.target.value })
                }
              >
                {occupationRequirements.map((occupation) => (
                  <option key={occupation.occupation}>{occupation.occupation}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Planning horizon</span>
              <select
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                value={settings.planningHorizon}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    planningHorizon: event.target.value as SimulationSettings["planningHorizon"],
                  })
                }
              >
                <option>1 Year</option>
                <option>3 Years</option>
                <option>5 Years</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Number of runs</span>
              <input
                type="number"
                min={1000}
                step={500}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                value={settings.simulationRuns}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    simulationRuns: Number(event.target.value),
                  })
                }
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Risk preference</span>
              <select
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                value={settings.riskPreference}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    riskPreference: event.target.value as SimulationSettings["riskPreference"],
                  })
                }
              >
                <option>Conservative</option>
                <option>Balanced</option>
                <option>Exploratory</option>
              </select>
            </label>
          </div>

          <div className="mt-6">
            <span className="mb-3 block text-sm font-semibold text-slate-700">Preferred industries</span>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <SkillChip
                  key={industry}
                  label={industry}
                  active={settings.preferredIndustries.includes(industry)}
                  onClick={() => toggleIndustry(industry)}
                />
              ))}
            </div>
          </div>

          <label className="mt-6 flex items-start gap-3 rounded-3xl border border-slate-100 bg-slate-50/70 p-5">
            <input
              className="mt-1 accent-accent-600"
              type="checkbox"
              checked={settings.includeSkillGapRecommendations}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  includeSkillGapRecommendations: event.target.checked,
                })
              }
            />
            <div>
              <p className="font-semibold text-slate-900">Include skill gap recommendations</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                When enabled, ACTS prepares a target occupation comparison and recommended learning actions together with the pathway outputs.
              </p>
            </div>
          </label>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleRun}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Run ACTS Simulation
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
              Active setup summary
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">
              {profile.currentOccupation} to {settings.targetOccupation}
            </h3>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Planning horizon</span>
                <span className="font-semibold text-slate-800">{settings.planningHorizon}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Run volume</span>
                <span className="font-semibold text-slate-800">
                  {settings.simulationRuns.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Risk profile</span>
                <span className="font-semibold text-slate-800">{settings.riskPreference}</span>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {settings.preferredIndustries.map((industry) => (
                <StatusBadge key={industry} label={industry} tone="teal" />
              ))}
            </div>
          </div>

          <div className="surface-card p-6">
            <p className="text-sm font-semibold text-slate-900">Pipeline modules engaged</p>
            <div className="mt-4 space-y-3">
              {[
                "Profile Input Handler",
                "Skill Vector Representation Module",
                "Simulation Controller",
                "Markov Chain Career Transition Model",
                "Monte Carlo Simulation Engine",
                "Results Management Module",
              ].map((item, index) => (
                <div
                  key={item}
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    index < 3
                      ? "border-accent-200 bg-accent-50 text-accent-800"
                      : "border-slate-100 bg-slate-50 text-slate-600"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
