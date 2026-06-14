import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="surface-card px-6 py-8 text-center">
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">{description}</p>
      {actionLabel && actionHref ? (
        <Link
          to={actionHref}
          className="mt-5 inline-flex rounded-full bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-700"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
