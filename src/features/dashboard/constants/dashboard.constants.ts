import type { DashboardPeriod } from '../types/dashboard.types';

export const DASHBOARD_PERIODS = [
  { label: 'This week', value: 'week' },
  { label: 'This month', value: 'month' },
  { label: 'This quarter', value: 'quarter' },
  { label: 'This year', value: 'year' },
] satisfies Array<{ value: DashboardPeriod; label: string }>;

export const DEFAULT_DASHBOARD_PERIOD: DashboardPeriod = 'month';

export const DASHBOARD_RECENT_APPLICATION_LIMIT = 5;

export const DASHBOARD_STATUS_TOKENS: Record<string, string> = {
  Applied: 'var(--color-status-applied)',
  Screening: 'var(--color-status-screening)',
  Interview: 'var(--color-status-interview)',
  Offer: 'var(--color-status-offer)',
  Rejected: 'var(--color-status-rejected)',
  Ghosted: 'var(--color-status-ghosted)',
  Withdrawn: 'var(--color-status-withdrawn)',
};
