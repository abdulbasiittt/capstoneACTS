import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  caption: string;
  tone?: "accent" | "teal" | "plum";
}

const toneClasses = {
  accent: "from-accent-100 via-white to-white text-accent-800",
  teal: "from-teal-100 via-white to-white text-teal-700",
  plum: "from-plum-100 via-white to-white text-plum-700",
};

export function StatCard({
  title,
  value,
  caption,
  tone = "accent",
}: StatCardProps) {
  return (
    <div
      className={`surface-card bg-gradient-to-br px-5 py-5 ${toneClasses[tone]} animate-reveal`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <span className="rounded-full border border-white/70 bg-white/80 p-2 text-slate-500">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-600">{caption}</p>
    </div>
  );
}
