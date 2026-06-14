import { Plus, X } from "lucide-react";

interface SkillChipProps {
  label: string;
  category?: string;
  active?: boolean;
  removable?: boolean;
  onClick?: () => void;
}

export function SkillChip({
  label,
  category,
  active = false,
  removable = false,
  onClick,
}: SkillChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
        active
          ? "border-accent-200 bg-accent-50 text-accent-800"
          : "border-slate-200 bg-white text-slate-700 hover:border-accent-200 hover:bg-accent-50/70"
      }`}
    >
      {removable ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      <span>{label}</span>
      {category ? <span className="text-xs text-slate-400">{category}</span> : null}
    </button>
  );
}
