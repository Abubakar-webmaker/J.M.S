import type { ReactNode } from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: string;
  variant?: 'default' | 'accent';
}

/**
 * Statistics Card Component
 *
 * Matches the JobManager spec:
 * - Green icon chip (#DCFCE7 bg / #16a34a icon)
 * - Label (13px, #6B7280)
 * - Value (28px, bold, #111827)
 * - Green trend line with up arrow (#16a34a)
 */
export function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  variant = 'default',
}: StatCardProps) {
  const iconBgColor =
    variant === 'accent'
      ? 'bg-primary-50 text-primary-600'
      : 'bg-neutral-100 text-neutral-600';

  return (
    <article className="rounded-xl bg-surface p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-200 hover:shadow-md">
      <div
        className={`mb-3.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBgColor} transition-all duration-200`}
        aria-hidden="true"
      >
        {icon}
      </div>

      <p className="text-[13px] text-neutral-500">{title}</p>

      <p className="mt-0.5 text-[28px] font-bold leading-tight text-neutral-900">
        {value}
      </p>

      {trend && (
        <p className="mt-2 flex items-center gap-1 text-xs text-primary-600">
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
          {trend}
        </p>
      )}

      {description && (
        <p className="mt-2 text-sm text-neutral-600">{description}</p>
      )}
    </article>
  );
}
