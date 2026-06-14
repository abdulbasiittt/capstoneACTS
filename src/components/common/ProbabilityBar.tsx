interface ProbabilityBarProps {
  label: string;
  value: number;
  hint?: string;
}

export function ProbabilityBar({ label, value, hint }: ProbabilityBarProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-800">{label}</p>
          {hint ? <p className="mt-1 text-sm text-slate-500">{hint}</p> : null}
        </div>
        <span className="text-lg font-semibold text-ink">{value}%</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-accent-500 to-teal-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
