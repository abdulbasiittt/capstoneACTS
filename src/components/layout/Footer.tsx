export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-semibold text-slate-700">
            Adaptive Career Trajectory Simulation Engine (ACTS)
          </p>
          <p className="mt-1">
            Frontend-only capstone prototype demonstrating probabilistic career pathway simulation.
          </p>
        </div>
        <p>
          O*NET-informed mock interface for academic presentation purposes only.
        </p>
      </div>
    </footer>
  );
}
