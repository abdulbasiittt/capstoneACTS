import { Cpu, Database, LoaderCircle, Network, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";
import { StatusBadge } from "../components/common/StatusBadge";
import { useActs } from "../context/AppContext";

const processingSteps = [
  "Encoding skill profile into structured vector representation",
  "Retrieving O*NET occupation reference data",
  "Estimating transition probabilities with the Markov Chain model",
  "Generating simulated trajectories via Monte Carlo runs",
  "Identifying skill gaps and readiness signals",
  "Preparing dashboard cards, charts, and saved results",
];

export function ProcessingPage() {
  const navigate = useNavigate();
  const { isProcessing, completeSimulation, simulationSettings } = useActs();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isProcessing) {
      return undefined;
    }

    if (activeStep >= processingSteps.length) {
      const timer = window.setTimeout(() => {
        completeSimulation();
        navigate("/results");
      }, 700);

      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setActiveStep((current) => current + 1);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [activeStep, completeSimulation, isProcessing, navigate]);

  const progress = useMemo(
    () => Math.min(100, Math.round((activeStep / processingSteps.length) * 100)),
    [activeStep],
  );

  if (!isProcessing) {
    return (
      <EmptyState
        title="No active simulation in progress"
        description="Use the Simulation Controller to configure a new ACTS run and return here when the mock engine is processing."
        actionLabel="Open simulation setup"
        actionHref="/run-simulation"
      />
    );
  }

  return (
    <div className="pb-6">
      <PageHeader
        eyebrow="ACTS Core Simulation Engine"
        title="Processing probabilistic career trajectories"
        description="The frontend is simulating the internal ACTS pipeline so you can present how the Markov Chain, Monte Carlo, and skill gap modules work together."
        breadcrumbs={[
          { label: "Student Workspace", href: "/dashboard" },
          { label: "Simulation Processing" },
        ]}
      />

      <div className="surface-card overflow-hidden p-6 md:p-8">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-700 animate-pulse-glow">
                <LoaderCircle className="h-8 w-8 animate-spin" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Simulation status</p>
                <h2 className="mt-1 text-3xl font-semibold text-slate-900">
                  {progress}% complete
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Target occupation: {simulationSettings.targetOccupation} • Horizon:{" "}
                  {simulationSettings.planningHorizon}
                </p>
              </div>
            </div>

            <div className="mt-6 h-3 rounded-full bg-slate-200">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-teal-500 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 space-y-3">
              {processingSteps.map((step, index) => {
                const done = index < activeStep;
                const live = index === activeStep;

                return (
                  <div
                    key={step}
                    className={`rounded-3xl border px-5 py-4 transition ${
                      done
                        ? "border-teal-200 bg-teal-50"
                        : live
                          ? "border-accent-200 bg-accent-50"
                          : "border-slate-100 bg-slate-50/70"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-medium text-slate-800">{step}</p>
                      <StatusBadge
                        label={done ? "Completed" : live ? "In progress" : "Queued"}
                        tone={done ? "teal" : live ? "accent" : "slate"}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Markov Chain Career Transition Model",
                description:
                  "Transitions are estimated across occupations using stochastic state movement logic rather than one-time direct matching.",
                icon: Network,
                tone: "accent",
              },
              {
                title: "Monte Carlo Simulation Engine",
                description:
                  "Multiple scenario runs are sampled to create pathway distributions, confidence indicators, and alternative outcome bands.",
                icon: Cpu,
                tone: "teal",
              },
              {
                title: "Skill Gap Analysis Module",
                description:
                  "Current capability levels are compared with target occupational requirements to rank missing skills and learning priorities.",
                icon: Sparkles,
                tone: "plum",
              },
              {
                title: "Reference and persistence layer",
                description:
                  "O*NET occupational references and SQL-based relational storage structures shape the mock outputs displayed after processing completes.",
                icon: Database,
                tone: "slate",
              },
            ].map((panel) => (
              <div
                key={panel.title}
                className={`rounded-3xl border p-5 ${
                  panel.tone === "accent"
                    ? "border-accent-200 bg-accent-50"
                    : panel.tone === "teal"
                      ? "border-teal-200 bg-teal-50"
                      : panel.tone === "plum"
                        ? "border-plum-100 bg-plum-100/50"
                        : "border-slate-100 bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-slate-700 shadow-sm">
                    <panel.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{panel.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{panel.description}</p>
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
