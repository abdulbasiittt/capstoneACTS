import {
  BriefcaseBusiness,
  Building2,
  History,
  Home,
  Info,
  LineChart,
  Search,
  Settings,
  Sparkles,
  UserCircle2,
  Workflow,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  variant: "student" | "employer";
}

const studentNav = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Job Search", href: "/jobs", icon: Search },
  { label: "Profile Setup", href: "/profile-setup", icon: UserCircle2 },
  { label: "Skill Profile", href: "/skill-vector", icon: Workflow },
  { label: "Run Simulation", href: "/run-simulation", icon: Sparkles },
  { label: "Results", href: "/results", icon: LineChart },
  { label: "Skill Gap Analysis", href: "/skill-gap", icon: BriefcaseBusiness },
  { label: "Simulation History", href: "/history", icon: History },
  { label: "Account", href: "/account", icon: Settings },
  { label: "About ACTS", href: "/about", icon: Info },
];

const employerNav = [
  { label: "Employer Dashboard", href: "/employer", icon: Home },
  { label: "Company Setup", href: "/employer/company-setup", icon: Building2 },
  { label: "Talent Insights", href: "/employer/talent-insights", icon: BriefcaseBusiness },
  { label: "Skill Trends", href: "/employer/skill-trends", icon: LineChart },
  { label: "About ACTS", href: "/about", icon: Info },
];

export function Sidebar({ variant }: SidebarProps) {
  const navItems = variant === "student" ? studentNav : employerNav;

  return (
    <aside className="hidden w-72 shrink-0 lg:block">
      <div className="sticky top-6 surface-card p-4">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          {variant === "student" ? "Student / Job Seeker" : "Employer"}
        </p>
        <div className="mt-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-accent-50 text-accent-800"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}
