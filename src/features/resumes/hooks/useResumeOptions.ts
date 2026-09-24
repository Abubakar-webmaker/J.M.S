import { useCallback, useEffect, useState } from 'react';

import { resumeService } from '@/features/resumes/services';
import type { Resume } from '@/features/resumes/types';
import { RESUME_LIST_DEFAULTS } from '@/features/resumes/constants';
import { AppApiError } from '@/types/api';

interface UseResumeOptionsResult {
  resumes: Resume[];
  isLoading: boolean;
  error: AppApiError | null;
  refresh: () => Promise<void>;
}

export function useResumeOptions(): UseResumeOptionsResult {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppApiError | null>(null);

  const fetchResumes = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await resumeService.getResumes({
        page: 1,
        limit: RESUME_LIST_DEFAULTS.limit,
      });

      setResumes(response.data);
    } catch (requestError) {
      const normalizedError =
        requestError instanceof AppApiError
          ? requestError
          : new AppApiError('Unable to load resumes.');

      setError(normalizedError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Async IIFE keeps setState calls inside a callback, not the effect body.
    const run = async () => {
      await fetchResumes();
    };

    void run();
  }, [fetchResumes]);

  return {
    resumes,
    isLoading,
    error,
    refresh: fetchResumes,
  };
}
