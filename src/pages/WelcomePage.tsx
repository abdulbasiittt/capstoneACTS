import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandLogo } from "../components/layout/BrandLogo";

export function WelcomePage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-mist px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(182,133,16,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(105,86,33,0.12),transparent_30%)]" />
      <div className="relative w-full max-w-4xl rounded-[2.25rem] border border-white/70 bg-white/86 p-8 shadow-panel backdrop-blur md:p-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="rounded-[2rem] border border-accent-200 bg-gradient-to-br from-white via-[#fff7e0] to-[#f6edd1] p-6 shadow-glow">
              <BrandLogo className="h-40 w-40 object-contain md:h-48 md:w-48" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-accent-700">
              Welcome to ACTS
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
              Welcome to the ACTS platform
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Adaptive Career Trajectory Simulation Engine is a capstone prototype for
              probabilistic career pathway simulation, O*NET-informed skill mapping, and employer
              readiness insight.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Markov Chains", "Transition probability modeling"],
                ["Monte Carlo", "Multi-path uncertainty simulation"],
                ["Skill Gaps", "Structured readiness comparison"],
              ].map(([title, description]) => (
                <div key={title} className="rounded-3xl border border-slate-100 bg-slate-50/80 px-5 py-4">
                  <p className="font-semibold text-slate-900">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/home"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Enter Home
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-accent-200 bg-accent-50 px-6 py-3 text-sm font-semibold text-accent-800 transition hover:bg-accent-100"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
