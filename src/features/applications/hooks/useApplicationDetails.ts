import { useCallback, useEffect, useRef, useState } from 'react';

import { applicationService } from '@/features/applications/services';
import type { ApplicationDetailsResponse } from '@/features/applications/types';
import { AppApiError } from '@/types/api';

interface UseApplicationDetailsResult {
  application: ApplicationDetailsResponse | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: AppApiError | null;
  refresh: () => Promise<void>;
  setApplication: (application: ApplicationDetailsResponse) => void;
}

export function useApplicationDetails(
  id: string | undefined,
): UseApplicationDetailsResult {
  const [application, setApplication] =
    useState<ApplicationDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<AppApiError | null>(null);

  const requestIdRef = useRef(0);

  const load = useCallback(
    async (
      applicationId: string,
      isRefresh = false,
      signal?: AbortSignal,
    ) => {
      const requestId = ++requestIdRef.current;
      setError(null);

      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const data = await applicationService.getApplication(
          applicationId,
          signal,
        );
        if (requestId !== requestIdRef.current) return;
        setApplication(data);
      } catch (requestError) {
        if (requestId !== requestIdRef.current) return;
        const normalizedError =
          requestError instanceof AppApiError
            ? requestError
            : new AppApiError(
                'Unable to load the application. Please try again.',
              );
        setError(normalizedError);
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (!id) {
      Promise.resolve().then(() => setIsLoading(false));
      return;
    }

    const controller = new AbortController();
    // Defer so load()'s synchronous setState calls do not run during the
    // effect body, which would trigger a cascading render.
    const timer = window.setTimeout(() => {
      void load(id, false, controller.signal);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [id, load]);

  const refresh = useCallback(async () => {
    if (!id) return;
    const run = async () => {
      await load(id, true);
    };
    void run();
  }, [id, load]);

  return {
    application,
    isLoading,
    isRefreshing,
    error,
    refresh,
    setApplication,
  };
}
