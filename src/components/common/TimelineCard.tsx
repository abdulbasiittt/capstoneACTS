import type { PathwayTransition } from "../../types";

interface TimelineCardProps {
  items: PathwayTransition[];
}

export function TimelineCard({ items }: TimelineCardProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={`${item.stage}-${item.role}`} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full border border-accent-200 bg-accent-50 text-center text-sm font-semibold leading-10 text-accent-700">
              {index + 1}
            </div>
            {index < items.length - 1 ? <div className="mt-2 h-full w-px bg-slate-200" /> : null}
          </div>
          <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {item.stage}
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-800">{item.role}</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-accent-700 shadow-sm">
                {item.probability}% stage probability
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span key={skill} className="pill-chip bg-white">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
