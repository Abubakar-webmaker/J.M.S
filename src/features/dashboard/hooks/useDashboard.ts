import { useCallback, useEffect, useRef, useState } from 'react';

import { AppApiError } from '@/types/api';

import { DEFAULT_DASHBOARD_PERIOD } from '../constants/dashboard.constants';
import { dashboardService } from '../services/dashboard.service';
import type {
  DashboardPeriod,
  DashboardResponse,
} from '../types/dashboard.types';

export function useDashboard(
  period: DashboardPeriod = DEFAULT_DASHBOARD_PERIOD,
) {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<AppApiError | null>(null);

  // Track whether we have data so refresh keeps old data visible
  const hasDataRef = useRef(false);

  const fetchDashboard = useCallback(
    async (refresh = false, signal?: AbortSignal) => {
      setError(null);

      if (refresh && hasDataRef.current) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const result = await dashboardService.getDashboard({ period }, signal);
        setData(result);
        hasDataRef.current = true;
      } catch (unknownError) {
        // Swallow AbortError — intentional cancellation, not a failure
        if (
          unknownError instanceof DOMException &&
          unknownError.name === 'AbortError'
        ) {
          return;
        }

        const normalized =
          unknownError instanceof AppApiError
            ? unknownError
            : new AppApiError('Unable to load dashboard. Please try again.');

        setError(normalized);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [period],
  );

  // Re-fetch whenever period changes; abort previous in-flight request
  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      await fetchDashboard(false, controller.signal);
    }

    void run();

    return () => {
      controller.abort();
    };
  }, [fetchDashboard]);

  const refresh = useCallback(async () => {
    const controller = new AbortController();
    await fetchDashboard(true, controller.signal);
  }, [fetchDashboard]);

  return { data, isLoading, isRefreshing, error, refresh };
}
