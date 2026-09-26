import type { DashboardPeriod } from '../types/dashboard.types';

export function getDashboardPeriod(
  value: string | null,
): DashboardPeriod {
  const valid = ['week', 'month', 'quarter', 'year'] as const;
  return valid.includes(value as DashboardPeriod)
    ? (value as DashboardPeriod)
    : 'month';
}
