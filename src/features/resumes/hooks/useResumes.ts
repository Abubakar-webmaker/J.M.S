import { useCallback, useRef, useState } from 'react';

import { resumeService } from '@/features/resumes/services';
import type {
  Resume,
  ResumeListParams,
  ResumePagination,
} from '@/features/resumes/types';
import { AppApiError } from '@/types/api';

interface UseResumesResult {
  resumes: Resume[];
  pagination: ResumePagination | null;

  isLoading: boolean;
  isRefreshing: boolean;

  error: AppApiError | null;

  fetchResumes: (params?: ResumeListParams, signal?: AbortSignal) => Promise<void>;
  refresh: () => Promise<void>;

  updateResumeInList: (resume: Resume) => void;
  removeResumeFromList: (id: string) => void;
}

export function useResumes(): UseResumesResult {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [pagination, setPagination] = useState<ResumePagination | null>(null);
  const [lastParams, setLastParams] = useState<ResumeListParams>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<AppApiError | null>(null);

  // Track whether we have ever loaded data so we know loading vs. refreshing.
  const hasDataRef = useRef(false);

  const fetchResumes = useCallback(
    async (params: ResumeListParams = {}, signal?: AbortSignal) => {
      setError(null);

      if (hasDataRef.current) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await resumeService.getResumes(params, signal);

        setResumes(response.data);
        setPagination(response.pagination);
        setLastParams(params);
        hasDataRef.current = true;
      } catch (requestError) {
        // Ignore aborted requests — the component unmounted or a new request started.
        if (
          requestError instanceof Error &&
          requestError.name === 'CanceledError'
        ) {
          return;
        }

        const normalizedError =
          requestError instanceof AppApiError
            ? requestError
            : new AppApiError('Unable to load resumes. Please try again.');

        setError(normalizedError);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [],
  );

  const refresh = useCallback(async () => {
    await fetchResumes(lastParams);
  }, [fetchResumes, lastParams]);

  const updateResumeInList = useCallback((resume: Resume) => {
    setResumes((current) =>
      current.map((r) => (r.id === resume.id ? resume : r)),
    );
  }, []);

  const removeResumeFromList = useCallback((id: string) => {
    setResumes((current) => current.filter((r) => r.id !== id));
  }, []);

  return {
    resumes,
    pagination,
    isLoading,
    isRefreshing,
    error,
    fetchResumes,
    refresh,
    updateResumeInList,
    removeResumeFromList,
  };
}
