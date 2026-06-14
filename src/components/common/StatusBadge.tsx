interface StatusBadgeProps {
  label: string;
  tone?: "accent" | "teal" | "plum" | "amber" | "slate";
}

const toneMap = {
  accent: "border-accent-200 bg-accent-50 text-accent-800",
  teal: "border-teal-200 bg-teal-50 text-teal-800",
  plum: "border-plum-100 bg-plum-100/60 text-plum-700",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
};

export function StatusBadge({
  label,
  tone = "slate",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneMap[tone]}`}
    >
      {label}
    </span>
  );
}
