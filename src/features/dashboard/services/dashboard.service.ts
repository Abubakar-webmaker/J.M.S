import api from '@/lib/api';

import type {
  DashboardResponse,
  GetDashboardParams,
} from '../types/dashboard.types';

export const dashboardService = {
  async getDashboard(
    params: GetDashboardParams = {},
    signal?: AbortSignal,
  ): Promise<DashboardResponse> {
    const queryParams: Record<string, string> = {};

    if (params.period) {
      queryParams.period = params.period;
    }

    const response = await api.get<DashboardResponse>('/dashboard', {
      params: queryParams,
      signal,
    });

    return response.data;
  },
};
