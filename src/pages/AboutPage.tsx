import { Database, Orbit, Route, Sigma, Sparkles } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";

const methodologySections = [
  {
    title: "What ACTS is",
    icon: Orbit,
    paragraphs: [
      "ACTS is a capstone prototype for probabilistic career trajectory prediction. Instead of recommending jobs through a single static profile match, the platform models career movement as a process that unfolds over time under uncertainty.",
      "The frontend demonstrates how user profiles, skill vectors, occupational reference data, and simulated pathway outputs can be connected in one coherent academic system for presentation and report purposes.",
    ],
  },
  {
    title: "Why static job matching is limited",
    icon: Sparkles,
    paragraphs: [
      "Traditional job portals are useful for vacancy discovery, but they usually evaluate profile fit at one moment. They do not explain how a user might progress from one occupation to another, which intermediate roles are likely, or how uncertain that progression may be.",
      "ACTS addresses this limitation by estimating multiple possible pathways, ranking them with probabilities, and linking those outcomes to skill readiness rather than presenting a single deterministic recommendation.",
    ],
  },
  {
    title: "How the Markov Chain component works",
    icon: Sigma,
    paragraphs: [
      "In ACTS, occupations are treated as states in a career transition system. The Markov Chain Career Transition Model uses transition probabilities to estimate how likely a user is to move from a current role to a plausible next role based on occupational logic, skill alignment, and trajectory context.",
      "The model is useful because it represents movement step by step. Instead of jumping directly from a current profile to a distant future role, it can describe intermediate transitions such as Data Analyst to Product Analyst to Product Strategy Associate, each with its own likelihood and skill implications.",
    ],
  },
  {
    title: "How the Monte Carlo component works",
    icon: Route,
    paragraphs: [
      "The Monte Carlo Simulation Engine repeatedly samples from the transition logic to generate many possible career journeys. Each run represents one plausible realization of how the user’s career could evolve within a chosen planning horizon.",
      "By aggregating thousands of simulated runs, ACTS produces probability distributions rather than one fixed answer. This makes the results more suitable for communicating uncertainty, alternative pathways, and relative pathway stability in an academic simulation setting.",
    ],
  },
  {
    title: "How the skill gap module works",
    icon: Sparkles,
    paragraphs: [
      "The Skill Gap Analysis Module compares the current skill vector against target occupational requirements. It identifies matched skills, partially matched skills, and missing competencies that may slow or block a future transition.",
      "Those comparisons are then turned into learning priorities, suggested certifications, and development actions so the trajectory output is linked to practical preparation rather than remaining purely descriptive.",
    ],
  },
  {
    title: "Role of O*NET and the SQL-based data layer",
    icon: Database,
    paragraphs: [
      "O*NET occupational reference data supports the mock logic used for skill mapping, occupation requirement comparison, and role transition interpretation. In this prototype, those relationships are simulated with local mock data shaped around the same conceptual structure.",
      "The interface now refers to a SQL-based relational database layer rather than PostgreSQL specifically. That wording is technically safer for a frontend prototype because SQL is the query language concept, while PostgreSQL is only one possible relational engine that could implement the storage later.",
    ],
  },
];

const algorithmSteps = [
  "Capture user identity, education, current occupation, preferences, and raw skill data through the Profile Input Handler.",
  "Transform the raw skills into a structured skill vector that stores categories, proficiency levels, target levels, and source tags.",
  "Retrieve occupation reference logic from O*NET-informed mappings and align the skill vector with the selected target occupation.",
  "Estimate occupation-to-occupation transition probabilities using the Markov Chain Career Transition Model.",
  "Run repeated Monte Carlo samples to produce multiple possible pathway sequences across the selected planning horizon.",
  "Aggregate the sampled outcomes into pathway probabilities, likely next roles, confidence indicators, and comparison-ready tables.",
  "Compare the current skill vector against target occupation requirements and rank matched, partial, and missing skills.",
  "Prepare results for dashboard presentation and store them in a future-ready SQL relational structure for profiles, skill vectors, and simulation outputs.",
];

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl py-4">
      <PageHeader
        eyebrow="About / Methodology"
        title="Academic logic behind ACTS"
        description="This page explains how the prototype frames Markov Chains, Monte Carlo simulation, skill gap analysis, occupational reference mapping, and the overall algorithm structure of the Adaptive Career Trajectory Simulation Engine."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {methodologySections.map((section) => (
          <div key={section.title} className="surface-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-700">
              <section.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-slate-900">{section.title}</h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 surface-card p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
          Algorithm structure
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {algorithmSteps.map((step, index) => (
            <div
              key={step}
              className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 font-semibold text-accent-700">
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-slate-600">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 surface-card p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
          Prototype scope note
        </p>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
          This remains a frontend-only demonstration designed to communicate the system architecture,
          algorithm flow, and presentation logic of ACTS. It uses mock data and simulated outputs,
          but the screens are structured as if they could later connect to backend simulation services
          and a SQL-based relational storage layer.
        </p>
      </div>
    </div>
  );
}
