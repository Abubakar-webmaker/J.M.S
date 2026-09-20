import { useCallback, useEffect, useState } from 'react';

import { applicationService } from '@/features/applications/services';
import type { Application } from '@/features/applications/types';
import { AppApiError } from '@/types/api';

interface UseApplicationResult {
  application: Application | null;
  isLoading: boolean;
  error: AppApiError | null;
  refresh: () => Promise<void>;
}

export function useApplication(id: string | undefined): UseApplicationResult {
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppApiError | null>(null);

  const load = useCallback(async (applicationId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await applicationService.getApplication(applicationId);
      setApplication(data);
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
    }
  }, []);

  useEffect(() => {
    if (!id) {
      Promise.resolve().then(() => setIsLoading(false));
      return;
    }

    // Async IIFE so setState calls inside load() happen in an async
    // callback rather than synchronously in the effect body.
    const run = async () => {
      await load(id);
    };

    void run();
  }, [id, load]);

  const refresh = useCallback(async () => {
    if (id) {
      await load(id);
    }
  }, [id, load]);

  return { application, isLoading, error, refresh };
}
