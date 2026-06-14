import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandLogo } from "../components/layout/BrandLogo";

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate("/welcome", { replace: true });
    }, 1900);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-mist px-6 py-12">
      <div className="splash-woosh splash-woosh-primary" />
      <div className="splash-woosh splash-woosh-secondary" />
      <div className="splash-orbit" />

      <div className="relative w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white/82 p-8 text-center shadow-panel backdrop-blur md:p-12">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-slate-200 bg-white shadow-glow">
          <BrandLogo className="h-20 w-20 object-contain" />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.34em] text-slate-500">
          Adaptive Career Trajectory Simulation Engine
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">ACTS</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          Initializing the capstone prototype, preparing the welcome experience, and loading the
          probabilistic career simulation workspace.
        </p>

        <div className="mx-auto mt-8 max-w-xl">
          <div className="splash-progress-track">
            <div className="splash-progress-fill" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading modules, pathways, and demo state
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/welcome"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Enter welcome page
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="rounded-full border border-accent-200 bg-accent-50 px-5 py-3 text-sm font-semibold text-accent-800 transition hover:bg-accent-100"
          >
            Skip to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
