import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface RoleCardProps {
  title: string;
  description: string;
  href: string;
  accent: "accent" | "teal";
}

const accentMap = {
  accent: "from-accent-100 to-white text-accent-800",
  teal: "from-teal-100 to-white text-teal-800",
};

export function RoleCard({
  title,
  description,
  href,
  accent,
}: RoleCardProps) {
  return (
    <Link
      className={`surface-card group flex h-full flex-col justify-between bg-gradient-to-br p-6 transition hover:-translate-y-1 hover:shadow-glow ${accentMap[accent]}`}
      to={href}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Entry Role</p>
        <h3 className="mt-4 text-2xl font-display text-slate-900">{title}</h3>
        <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
        Continue to demo
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
