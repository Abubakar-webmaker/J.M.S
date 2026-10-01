import type { HTMLAttributes } from 'react';

type BadgeVariant =
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

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
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
  applied: 'bg-blue-50 text-blue-700',
  screening: 'bg-amber-50 text-amber-700',
  interview: 'bg-purple-50 text-purple-700',
  offer: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-red-50 text-red-700',
  ghosted: 'bg-gray-100 text-gray-700',
  withdrawn: 'bg-gray-100 text-gray-700',
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