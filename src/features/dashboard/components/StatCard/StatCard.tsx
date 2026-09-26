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
    <article className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-text-muted">{title}</p>

          <p className="mt-1 text-2xl font-semibold tracking-tight text-text">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-text-muted">{description}</p>
          )}
        </div>

        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </article>
  );
}
