import { useCallback, useEffect, useState } from 'react';

import { resumeService } from '@/features/resumes/services';
import type { ResumeDetails } from '@/features/resumes/types';
import { AppApiError } from '@/types/api';

interface UseResumeResult {
  resume: ResumeDetails | null;
  isLoading: boolean;
  error: AppApiError | null;
  refresh: () => Promise<void>;
}

export function useResume(resumeId?: string): UseResumeResult {
  const [resume, setResume] = useState<ResumeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppApiError | null>(null);

  const fetchResume = useCallback(async () => {
    if (!resumeId) {
      setResume(null);
      setError(new AppApiError('Resume ID is required.', 400));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await resumeService.getResume(resumeId);
      setResume(response);
    } catch (requestError) {
      const normalizedError =
        requestError instanceof AppApiError
          ? requestError
          : new AppApiError('Unable to load this resume.');

      setResume(null);
      setError(normalizedError);
    } finally {
      setIsLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    // Async IIFE keeps setState calls inside a callback, not the effect body.
    const run = async () => {
      await fetchResume();
    };

    void run();
  }, [fetchResume]);

  return {
    resume,
    isLoading,
    error,
    refresh: fetchResume,
  };
}
