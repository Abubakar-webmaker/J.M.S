import { useCallback, useRef, useState } from 'react';

import {
  resumeService,
  type ResumeUploadProgress,
} from '@/features/resumes/services';
import type {
  Resume,
  UpdateResumeInput,
  UploadResumeInput,
} from '@/features/resumes/types';
import { AppApiError } from '@/types/api';

export interface MutationResult<T> {
  data: T | null;
  error: AppApiError | null;
}

interface UseResumeMutationsResult {
  // ── Actions ───────────────────────────────────────────────────────────────
  uploadResume: (
    data: UploadResumeInput,
    options?: {
      signal?: AbortSignal;
      onProgress?: (progress: ResumeUploadProgress) => void;
    },
  ) => Promise<MutationResult<Resume>>;

  updateResume: (
    id: string,
    data: UpdateResumeInput,
  ) => Promise<MutationResult<Resume>>;

  deleteResume: (id: string) => Promise<MutationResult<null>>;

  cancelUpload: () => void;

  // ── Loading states ────────────────────────────────────────────────────────
  isUploading: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  uploadProgress: ResumeUploadProgress | null;

  // ── Per-operation error states ────────────────────────────────────────────
  uploadError: AppApiError | null;
  updateError: AppApiError | null;
  deleteError: AppApiError | null;

  clearUploadError: () => void;
  clearUpdateError: () => void;
  clearDeleteError: () => void;
}

function normalizeError(
  requestError: unknown,
  fallbackMessage: string,
): AppApiError {
  return requestError instanceof AppApiError
    ? requestError
    : new AppApiError(fallbackMessage);
}

function isCancelledError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === 'CanceledError' || error.message === 'canceled')
  );
}

export function useResumeMutations(): UseResumeMutationsResult {
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [uploadProgress, setUploadProgress] =
    useState<ResumeUploadProgress | null>(null);

  // Per-operation errors — no shared state to prevent bleed between dialogs.
  const [uploadError, setUploadError] = useState<AppApiError | null>(null);
  const [updateError, setUpdateError] = useState<AppApiError | null>(null);
  const [deleteError, setDeleteError] = useState<AppApiError | null>(null);

  // Duplicate-upload protection: a ref (not state) so it never triggers a re-render.
  const uploadInProgressRef = useRef(false);

  // Controller ref so the upload can be cancelled from outside.
  const uploadControllerRef = useRef<AbortController | null>(null);

  // ── Upload ─────────────────────────────────────────────────────────────────
  const uploadResume = useCallback(
    async (
      data: UploadResumeInput,
      options?: {
        signal?: AbortSignal;
        onProgress?: (progress: ResumeUploadProgress) => void;
      },
    ): Promise<MutationResult<Resume>> => {
      // Duplicate-upload guard.
      if (uploadInProgressRef.current) {
        return { data: null, error: null };
      }

      // Create a fresh AbortController for this upload.
      const controller = new AbortController();
      uploadControllerRef.current = controller;
      uploadInProgressRef.current = true;

      setIsUploading(true);
      setUploadProgress({ loaded: 0, total: data.file.size, percentage: 0 });
      setUploadError(null);

      try {
        const result = await resumeService.uploadResume(data, {
          signal: options?.signal ?? controller.signal,
          onProgress: (progress) => {
            setUploadProgress(progress);
            options?.onProgress?.(progress);
          },
        });

        return { data: result, error: null };
      } catch (requestError) {
        // Cancelled uploads are intentional — return silently, no error UI.
        if (isCancelledError(requestError)) {
          return { data: null, error: null };
        }

        const error = normalizeError(
          requestError,
          'Unable to upload resume. Please try again.',
        );

        setUploadError(error);

        return { data: null, error };
      } finally {
        setIsUploading(false);
        setUploadProgress(null);
        uploadInProgressRef.current = false;
        uploadControllerRef.current = null;
      }
    },
    [],
  );

  const cancelUpload = useCallback(() => {
    uploadControllerRef.current?.abort();
  }, []);

  // ── Update ─────────────────────────────────────────────────────────────────
  const updateResume = useCallback(
    async (
      id: string,
      data: UpdateResumeInput,
    ): Promise<MutationResult<Resume>> => {
      setIsUpdating(true);
      setUpdateError(null);

      try {
        const result = await resumeService.updateResume(id, data);

        return { data: result, error: null };
      } catch (requestError) {
        const error = normalizeError(
          requestError,
          'Unable to update resume. Please try again.',
        );

        setUpdateError(error);

        return { data: null, error };
      } finally {
        setIsUpdating(false);
      }
    },
    [],
  );

  // ── Delete ─────────────────────────────────────────────────────────────────
  const deleteResume = useCallback(
    async (id: string): Promise<MutationResult<null>> => {
      setIsDeleting(true);
      setDeleteError(null);

      try {
        await resumeService.deleteResume(id);

        return { data: null, error: null };
      } catch (requestError) {
        const error = normalizeError(
          requestError,
          'Unable to delete resume. Please try again.',
        );

        setDeleteError(error);

        return { data: null, error };
      } finally {
        setIsDeleting(false);
      }
    },
    [],
  );

  return {
    uploadResume,
    updateResume,
    deleteResume,
    cancelUpload,

    isUploading,
    isUpdating,
    isDeleting,

    uploadProgress,

    uploadError,
    updateError,
    deleteError,

    clearUploadError: useCallback(() => setUploadError(null), []),
    clearUpdateError: useCallback(() => setUpdateError(null), []),
    clearDeleteError: useCallback(() => setDeleteError(null), []),
  };
}
