import type { DashboardPeriod } from '../types/dashboard.types';

export const DASHBOARD_PERIODS = [
  { label: 'Last Week', value: 'week' as const },
  { label: 'Last Month', value: 'month' as const },
  { label: 'Last Quarter', value: 'quarter' as const },
  { label: 'Last Year', value: 'year' as const },
] satisfies Array<{ value: DashboardPeriod; label: string }>;

export const DEFAULT_DASHBOARD_PERIOD: DashboardPeriod = 'month';

// Map frontend period values to backend period values
export const DASHBOARD_PERIOD_MAPPING: Record<DashboardPeriod, string> = {
  'week': '7d',
  'month': '30d',
  'quarter': '90d',
  'year': 'month', // Note: backend doesn't have a 'year' option, using 'month' as fallback
};

export const DASHBOARD_RECENT_APPLICATION_LIMIT = 5;

/** Badge color tokens by status. */
export const DASHBOARD_BADGE_STYLES: Record<
  string,
  { bg: string; text: string }
> = {
  Applied: { bg: '#DCFCE7', text: '#15803D' },
  Screening: { bg: '#E0F2FE', text: '#0369A1' },
  Interview: { bg: '#DBEAFE', text: '#1D4ED8' },
  Offer: { bg: '#DCFCE7', text: '#15803D' },
  Rejected: { bg: '#FEE2E2', text: '#DC2626' },
  Ghosted: { bg: '#FEF9C3', text: '#A16207' },
};

export const DASHBOARD_STATUS_TOKENS: Record<string, string> = {
  Applied: '#3B82F6',
  Screening: '#93C5FD',
  Interview: '#14B8A6',
  Offer: '#22C55E',
  Rejected: '#F97316',
  Ghosted: '#EAB308',
  Withdrawn: '#9CA3AF',
};
