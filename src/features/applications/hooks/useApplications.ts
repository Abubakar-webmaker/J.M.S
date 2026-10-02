import { useCallback, useRef, useState } from 'react';

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

  // Nothing is loading until the caller triggers a fetch. The mount
  // fetch has been removed — the page owns the fetch lifecycle so that
  // only one request is issued per param change (with the correct params).
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<AppApiError | null>(null);

  // Track whether we have ever loaded data so the loading indicator
  // shows on the first fetch and the refresh indicator on subsequent ones.
  const hasDataRef = useRef(false);

  // Monotonic request id — used to drop stale responses so a slow earlier
  // request can never overwrite the result of a newer one.
  const requestIdRef = useRef(0);

  const fetchApplications = useCallback(
    async (
      nextParams: ApplicationListParams = currentParams,
      signal?: AbortSignal,
    ) => {
      const requestId = ++requestIdRef.current;

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

        // Drop the response if a newer request has been issued since.
        if (requestId !== requestIdRef.current) {
          return;
        }

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

        // Drop the error if a newer request has been issued since.
        if (requestId !== requestIdRef.current) {
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
        // Only clear loading flags for the current request — a stale
        // response must not clear the indicator under a live request.
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    // currentParams is intentionally excluded: fetchApplications accepts
    // nextParams so callers drive the params explicitly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // NOTE: This hook intentionally does NOT fetch on mount. The caller owns
  // the fetch lifecycle and is responsible for calling fetchApplications()
  // at least once (e.g. from a params-driven effect). This keeps a single
  // request per param change and avoids a redundant mount fetch.

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
