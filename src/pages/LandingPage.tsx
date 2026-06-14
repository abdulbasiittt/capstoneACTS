import {
  ArrowRight,
  BriefcaseBusiness,
  Database,
  Layers3,
  Network,
  Orbit,
  Route,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { RoleCard } from "../components/common/RoleCard";

const features = [
  {
    title: "Probabilistic Pathway Simulation",
    description:
      "Move beyond one-time job matching with multi-path trajectory forecasts under uncertainty.",
    icon: Orbit,
  },
  {
    title: "Skill Vector Representation",
    description:
      "Translate raw user skills into structured ACTS inputs for transition modeling and gap analysis.",
    icon: Layers3,
  },
  {
    title: "O*NET-Informed Mapping",
    description:
      "Use occupational reference logic to connect skills, role transitions, and readiness signals.",
    icon: Database,
  },
  {
    title: "Employer Insight Support",
    description:
      "Provide a separate dashboard for talent pipeline patterns, demand trends, and common gap clusters.",
    icon: BriefcaseBusiness,
  },
];

const processSteps = [
  "Collect profile, education, and skill data from a student or job seeker.",
  "Transform the profile into a structured skill vector aligned with occupational references.",
  "Run Markov Chain transition logic and Monte Carlo simulations across multiple trajectories.",
  "Estimate likely role progressions with probability and uncertainty indicators.",
  "Compare current skill readiness against target occupation requirements and recommend development areas.",
];

const architectureLanes = [
  {
    title: "User Layer",
    items: ["Student / Job Seeker", "Employer"],
  },
  {
    title: "Presentation Layer",
    items: [
      "User Web Interface",
      "Employer Dashboard",
      "Career Trajectory Dashboard",
      "Skill Gap Visualization Interface",
    ],
  },
  {
    title: "Application Layer",
    items: [
      "Authentication and Profile Management",
      "Profile Input Handler",
      "Skill Vector Representation Module",
      "Simulation Controller",
      "Results Management Module",
    ],
  },
  {
    title: "ACTS Core Engine",
    items: [
      "Markov Chain Career Transition Model",
      "Monte Carlo Simulation Engine",
      "Skill Gap Analysis Module",
    ],
  },
  {
    title: "Data Layer",
    items: [
      "SQL relational storage design",
      "User profiles",
      "Skill vectors",
      "Simulation results",
      "O*NET Occupational Dataset",
    ],
  },
];

export function LandingPage() {
  return (
    <div className="pb-16">
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-4 py-2 text-sm font-semibold text-accent-700">
              <Sparkles className="h-4 w-4" />
              ACTS home page for the bachelor capstone prototype
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-tight text-ink md:text-6xl">
              Adaptive Career Trajectory Simulation Engine
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              ACTS is not a conventional job portal. It models career progression as a dynamic
              stochastic process, combining a Markov Chain Career Transition Model, Monte Carlo
              simulation, skill gap analysis, and O*NET-informed mapping to estimate multiple
              possible pathways over time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/register?role=student"
                className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-white px-6 py-3 text-sm font-semibold text-accent-800 transition hover:bg-accent-50"
              >
                Register as Student
              </Link>
              <Link
                to="/register?role=employer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Register as Employer
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["42%", "Most likely pathway example"],
                ["5,000+", "Default Monte Carlo runs in demo"],
                ["O*NET", "Occupational reference foundation"],
              ].map(([value, label]) => (
                <div key={label} className="surface-card px-5 py-4">
                  <p className="text-3xl font-semibold text-ink">{value}</p>
                  <p className="mt-2 text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card soft-grid relative overflow-hidden p-6 md:p-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-200/40 blur-2xl" />
            <div className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-teal-200/50 blur-2xl" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                ACTS core simulation preview
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-3xl border border-accent-200 bg-white/90 p-5 accent-ring">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-accent-700">
                        Markov Chain Career Transition Model
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Estimates transition likelihoods between occupations across time horizons.
                      </p>
                    </div>
                    <Network className="h-10 w-10 text-accent-500" />
                  </div>
                </div>
                <div className="rounded-3xl border border-teal-200 bg-white/90 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-teal-700">
                        Monte Carlo Simulation Engine
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Generates multiple plausible trajectory samples and probability distributions.
                      </p>
                    </div>
                    <Route className="h-10 w-10 text-teal-500" />
                  </div>
                </div>
                <div className="rounded-3xl border border-plum-100 bg-white/90 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-plum-700">
                        Skill Gap Analysis Module
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Compares the skill vector against target occupational requirements and ranks missing capability areas.
                      </p>
                    </div>
                    <Layers3 className="h-10 w-10 text-plum-500" />
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <p className="text-sm font-semibold text-slate-800">Why ACTS differs from static matching</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Static portals recommend jobs at one point in time. ACTS simulates movement
                  across time, uncertainty, and evolving skill readiness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
              Key Features
            </p>
            <h2 className="section-title mt-2">Built to communicate capstone logic clearly</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            The prototype emphasizes architecture visibility, realistic dashboards, and a coherent
            user journey from profile capture through simulated results review.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="surface-card animate-reveal p-6"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-700">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="surface-card p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
              How ACTS Works
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              A probabilistic workflow instead of a one-click match
            </h2>
            <div className="mt-6 space-y-5">
              {processSteps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 font-semibold text-accent-700">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
              Simplified Architecture
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              Visible alignment with the ACTS system design
            </h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-5">
              {architectureLanes.map((lane) => (
                <div key={lane.title} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                  <p className="text-sm font-semibold text-slate-900">{lane.title}</p>
                  <div className="mt-4 space-y-2">
                    {lane.items.map((item) => (
                      <div key={item} className="rounded-2xl border border-white bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
            Welcome Paths
          </p>
          <h2 className="section-title mt-2">Choose how you want to enter ACTS</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <RoleCard
            title="Student / Job Seeker"
            description="Experience profile setup, skill vector transformation, career simulation, and skill gap analysis from the main ACTS user flow."
            href="/register?role=student"
            accent="accent"
          />
          <RoleCard
            title="Employer"
            description="Review a distinct dashboard focused on pathway readiness, in-demand skills, and talent insight summaries for employer-side support."
            href="/register?role=employer"
            accent="teal"
          />
        </div>
      </section>
    </div>
  );
}
