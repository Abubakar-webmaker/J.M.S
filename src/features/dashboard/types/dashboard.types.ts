import type { ApplicationStatus } from '@/constants/application';

export type DashboardPeriod = 'week' | 'month' | 'quarter' | 'year';

export interface DashboardDateRange {
  from: string;
  to: string;
}

export interface DashboardSummary {
  totalApplications: number;
  applicationsThisWeek: number;
  applicationsThisMonth: number;
  interviews: number;
  offers: number;
  rejections: number;
  ghosted: number;
  responseRate: number; // 0–100
}

export interface ApplicationTrendPoint {
  date: string; // ISO 8601 date string
  count: number;
}

export interface StatusDistributionItem {
  status: ApplicationStatus;
  count: number;
  percentage: number;
}

export interface DashboardRecentApplication {
  id: string;
  jobTitle: string;
  companyName: string;
  status: ApplicationStatus;
  applicationDate: string; // ISO 8601
}

export interface DashboardResponse {
  summary: DashboardSummary;
  applicationTrend: ApplicationTrendPoint[];
  statusDistribution: StatusDistributionItem[];
  recentApplications: DashboardRecentApplication[];
  range: DashboardDateRange;
}

export interface GetDashboardParams {
  period?: DashboardPeriod;
}
