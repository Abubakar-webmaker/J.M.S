import { useCallback, useEffect, useRef, useState } from 'react';

import { applicationService } from '@/features/applications/services';
import type {
  Application,
  ApplicationListParams,
  ApplicationPagination,
} from '@/features/applications/types';
import { AppApiError } from '@/types/api';

interface UseApplicationsResult {
  applications: Application[];
  pagination: ApplicationPagination | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: AppApiError | null;
  fetchApplications: (
    params?: ApplicationListParams,
    signal?: AbortSignal,
  ) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useApplications(
  initialParams: ApplicationListParams = {},
): UseApplicationsResult {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] =
    useState<ApplicationPagination | null>(null);

  const [currentParams, setCurrentParams] =
    useState<ApplicationListParams>(initialParams);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<AppApiError | null>(null);

  // Track whether we have ever loaded data so the loading indicator
  // shows on the first fetch and the refresh indicator on subsequent ones.
  const hasDataRef = useRef(false);

  const fetchApplications = useCallback(
    async (
      nextParams: ApplicationListParams = currentParams,
      signal?: AbortSignal,
    ) => {
      setError(null);

      if (hasDataRef.current) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await applicationService.getApplications(
          nextParams,
          signal,
        );

        setApplications(response.data);
        setPagination(response.pagination);
        setCurrentParams(nextParams);
        hasDataRef.current = true;
      } catch (requestError) {
        // Swallow AbortError — it's an intentional cancellation, not a failure.
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return;
        }

        const normalizedError =
          requestError instanceof AppApiError
            ? requestError
            : new AppApiError(
                'Unable to load applications. Please try again.',
              );

        setError(normalizedError);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    // currentParams is intentionally excluded: fetchApplications accepts
    // nextParams so callers drive the params explicitly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    // Use async IIFE so the setState calls inside fetchApplications happen
    // inside an async callback, not synchronously in the effect body.
    const run = async () => {
      await fetchApplications(initialParams, controller.signal);
    };

    void run();

    return () => {
      controller.abort();
    };
    // Runs once on mount; callers drive subsequent fetches via fetchApplications.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = useCallback(async () => {
    const controller = new AbortController();
    await fetchApplications(currentParams, controller.signal);
  }, [fetchApplications, currentParams]);

  return {
    applications,
    pagination,
    isLoading,
    isRefreshing,
    error,
    fetchApplications,
    refresh,
  };
}
