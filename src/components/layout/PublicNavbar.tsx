import { ArrowRight, LogIn } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${
    isActive ? "text-accent-700" : "text-slate-600 hover:text-accent-700"
  }`;

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/home" className="flex items-center gap-3">
          <BrandLogo className="h-11 w-11 rounded-2xl shadow-glow" />
          <div>
            <p className="font-display text-xl text-ink">ACTS</p>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Capstone Demo Prototype
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            Methodology
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <LogIn className="h-4 w-4" />
            Sign in
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Register
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
