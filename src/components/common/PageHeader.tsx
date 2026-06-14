import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                {item.href ? (
                  <Link className="transition hover:text-accent-700" to={item.href}>
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-slate-700">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                ) : null}
              </span>
            ))}
          </nav>
        ) : null}
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-4xl leading-tight text-ink">{title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
