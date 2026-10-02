import type { DashboardPeriod } from '../types/dashboard.types';

export const DASHBOARD_PERIODS = [
  { label: 'Last 6 months', value: 'month' },
] satisfies Array<{ value: DashboardPeriod; label: string }>;

export const DEFAULT_DASHBOARD_PERIOD: DashboardPeriod = 'month';

export const DASHBOARD_RECENT_APPLICATION_LIMIT = 5;

/**
 * Static stat-card definitions matching the JobManager dashboard spec.
 */
export const DASHBOARD_STATS = [
  {
    id: 'total',
    title: 'Total Applications',
    value: 108,
    trend: '+12% from last month',
    icon: 'briefcase',
  },
  {
    id: 'week',
    title: 'This Week',
    value: 12,
    trend: '+20% from last week',
    icon: 'calendar',
  },
  {
    id: 'interviews',
    title: 'Interviews',
    value: 8,
    trend: '+14% from last month',
    icon: 'message',
  },
  {
    id: 'offers',
    title: 'Offers',
    value: 3,
    trend: '+50% from last month',
    icon: 'star',
  },
] as const;

/** Line-chart data for "Application Activity". */
export const DASHBOARD_ACTIVITY_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  values: [3, 5, 4, 8, 10, 14, 18, 24, 30],
};

/** Donut-chart segments for "Application Status". */
export const DASHBOARD_STATUS_DATA = [
  { label: 'Applied', value: 32, color: '#3B82F6' },
  { label: 'Screening', value: 18, color: '#93C5FD' },
  { label: 'Interview', value: 15, color: '#14B8A6' },
  { label: 'Offer', value: 15, color: '#22C55E' },
  { label: 'Rejected', value: 20, color: '#F97316' },
  { label: 'Ghosted', value: 10, color: '#EAB308' },
  { label: 'Withdrawn', value: 5, color: '#9CA3AF' },
] as const;

export const DASHBOARD_STATUS_TOTAL = 108;

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
