import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
}

export function StatCard({
  title,
  value,
  icon,
  description,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-neutral-200">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-semibold text-neutral-600">{title}</p>

          <p className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-xs text-neutral-600">{description}</p>
          )}
        </div>

        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-all group-hover:bg-primary-100"
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </article>
  );
}
