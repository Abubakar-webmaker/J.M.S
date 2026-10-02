import type { HTMLAttributes } from 'react';

export type BadgeVariant =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'applied'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'ghosted'
  | 'withdrawn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/**
 * Status badge colors aligned with job application statuses
 */
const variantStyles: Record<BadgeVariant, string> = {
  /* Semantic */
  neutral: 'bg-neutral-100 text-neutral-700',
  success: 'bg-success-50 text-success-700',
  warning: 'bg-warning-50 text-warning-700',
  danger: 'bg-danger-50 text-danger-700',
  info: 'bg-info-50 text-info-700',

  /* Job Status */
  applied: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  screening: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  interview: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
  offer: 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  rejected: 'bg-danger-50 text-danger-700 dark:bg-danger-950/40 dark:text-danger-300',
  ghosted: 'bg-neutral-100 text-neutral-700',
  withdrawn: 'bg-neutral-100 text-neutral-700',
};

/**
 * Professional Badge Component
 * 
 * Used for status indicators and labels
 * 
 * Variants include:
 * - Semantic: neutral, success, warning, danger, info
 * - Job Status: applied, screening, interview, offer, rejected, ghosted, withdrawn
 */
export function Badge({
  children,
  variant = 'neutral',
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  );
}