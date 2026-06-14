import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4 py-12">
      <div className="surface-card w-full p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">404</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
          The ACTS demo route you tried to open does not exist in this prototype. Use the main
          navigation or return to the landing page.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
