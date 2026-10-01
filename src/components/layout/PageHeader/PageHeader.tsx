import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

/**
 * Page Header Component
 * 
 * Displays page title, optional description, and actions
 * Creates visual hierarchy and context
 * 
 * Layout:
 * - Mobile: stacked vertically, full width
 * - Desktop: flex with title on left, actions on right
 */
export function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      {/* Left: Title + Description */}
      <div className="min-w-0">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-base text-neutral-600">
            {description}
          </p>
        )}
      </div>

      {/* Right: Actions */}
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-3 sm:flex-nowrap">
          {actions}
        </div>
      )}
    </div>
  );
}