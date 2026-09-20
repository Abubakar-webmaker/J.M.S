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

  const hasLoadedRef = useRef(false);

  const load = useCallback(
    async (applicationId: string, isRefresh = false) => {
      setError(null);

      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const data =
          await applicationService.getApplication(applicationId);
        setApplication(data);
        hasLoadedRef.current = true;
      } catch (requestError) {
        const normalizedError =
          requestError instanceof AppApiError
            ? requestError
            : new AppApiError(
                'Unable to load the application. Please try again.',
              );
        setError(normalizedError);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!id) {
      Promise.resolve().then(() => setIsLoading(false));
      return;
    }

    const run = async () => {
      await load(id, false);
    };

    void run();
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
