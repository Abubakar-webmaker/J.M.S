import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  variant?: 'default' | 'accent';
}

/**
 * Statistics Card Component
 * 
 * Used on Dashboard to display key metrics
 * 
 * Features:
 * - Icon with colored background
 * - Title, value, optional description
 * - Hover state for interactivity
 * - Responsive sizing
 */
export function StatCard({
  title,
  value,
  icon,
  description,
  variant = 'default',
}: StatCardProps) {
  const iconBgColor = variant === 'accent' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600';

  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-sm text-neutral-600">
              {description}
            </p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${iconBgColor} transition-all duration-200`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </article>
  );
}
