import type { ReactNode } from "react";
import { Search, LogOut, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useActs } from "../../context/AppContext";
import { BrandLogo } from "./BrandLogo";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  variant: "student" | "employer";
  children: ReactNode;
}

export function AppShell({ variant, children }: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, profile, employerCompanyProfile } = useActs();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("q") ?? "");
  }, [location.pathname, location.search]);

  const handleSearch = () => {
    const trimmed = searchQuery.trim();

    if (variant === "student") {
      navigate(trimmed ? `/jobs?q=${encodeURIComponent(trimmed)}` : "/jobs");
      return;
    }

    navigate(trimmed ? `/employer?q=${encodeURIComponent(trimmed)}` : "/employer");
  };

  return (
    <div className="min-h-screen px-4 py-6 text-ink md:px-8">
      <div className="mx-auto flex max-w-7xl gap-6">
        <Sidebar variant={variant} />
        <div className="min-w-0 flex-1">
          <header className="surface-card mb-6 flex flex-col gap-4 px-5 py-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3">
                <Link to={variant === "student" ? "/dashboard" : "/employer"} className="flex items-center gap-3">
                  <BrandLogo className="h-12 w-12 rounded-2xl shadow-glow" />
                  <div>
                    <p className="font-display text-xl">ACTS</p>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                      {variant === "student" ? "Career Trajectory Workspace" : "Employer Insight Workspace"}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-teal-700" />
                  Security and access control placeholder
                </span>
                <span className="rounded-full border border-accent-200 bg-accent-50 px-3 py-2 text-sm font-medium text-accent-800">
                  {variant === "student" ? profile.fullName : employerCompanyProfile.companyName}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  placeholder={
                    variant === "student"
                      ? "Search jobs by title, company, or skill"
                      : "Search candidates by job title, bachelor's degree, specialization, or skill"
                  }
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {variant === "student" ? "Search jobs" : "Search candidates"}
              </button>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
