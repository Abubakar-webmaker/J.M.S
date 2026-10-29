import api from '@/lib/api';

import type {
  DashboardResponse,
  GetDashboardParams,
  StatusDistributionItem,
  DashboardRecentApplication,
} from '../types/dashboard.types';
import { toFrontendApplicationStatus } from '@/constants/application';
import { DASHBOARD_PERIOD_MAPPING } from '../constants/dashboard.constants';

// Helper function to convert backend status values
function convertDashboardResponse(data: any): DashboardResponse {
  return {
    ...data,
    statusDistribution: (data.statusDistribution || []).map((item: any) => ({
      ...item,
      status: toFrontendApplicationStatus(item.status),
    })),
    recentApplications: (data.recentApplications || []).map((app: any) => ({
      ...app,
      status: toFrontendApplicationStatus(app.status),
    })),
  };
}

export const dashboardService = {
  async getDashboard(
    params: GetDashboardParams = {},
    signal?: AbortSignal,
  ): Promise<DashboardResponse> {
    const queryParams: Record<string, string> = {};

    if (params.period) {
      // Convert frontend period to backend format
      queryParams.period = DASHBOARD_PERIOD_MAPPING[params.period] || params.period;
    }

    const response = await api.get<{ message: string; data: DashboardResponse }>('/dashboard', {
      params: queryParams,
      signal,
    });

    // Convert backend enum values to frontend format
    return convertDashboardResponse(response.data.data);
  },
};
