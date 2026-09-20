import { useCallback, useState } from 'react';

import { applicationService } from '@/features/applications/services';
import type {
  AddApplicationNoteInput,
  Application,
  ApplicationDetailsResponse,
  ChangeApplicationStatusInput,
  CreateApplicationInput,
  UpdateApplicationInput,
} from '@/features/applications/types';
import { AppApiError } from '@/types/api';

export interface MutationResult<T> {
  data: T | null;
  error: AppApiError | null;
}

function normalizeError(requestError: unknown): AppApiError {
  if (requestError instanceof AppApiError) return requestError;
  return new AppApiError('Something went wrong. Please try again.');
}

interface UseApplicationMutationsResult {
  // ── Create / Update / Delete ───────────────────────────────────────────
  createApplication: (
    data: CreateApplicationInput,
  ) => Promise<MutationResult<Application>>;
  updateApplication: (
    id: string,
    data: UpdateApplicationInput,
  ) => Promise<MutationResult<Application>>;
  deleteApplication: (id: string) => Promise<MutationResult<void>>;

  // ── Status / Note ──────────────────────────────────────────────────────
  changeStatus: (
    id: string,
    data: ChangeApplicationStatusInput,
  ) => Promise<MutationResult<ApplicationDetailsResponse>>;
  addNote: (
    id: string,
    data: AddApplicationNoteInput,
  ) => Promise<MutationResult<ApplicationDetailsResponse>>;

  // ── Loading states ─────────────────────────────────────────────────────
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isChangingStatus: boolean;
  isAddingNote: boolean;

  // ── Per-operation errors ───────────────────────────────────────────────
  deleteError: AppApiError | null;
  statusError: AppApiError | null;
  noteError: AppApiError | null;

  clearDeleteError: () => void;
  clearStatusError: () => void;
  clearNoteError: () => void;
}

export function useApplicationMutations(): UseApplicationMutationsResult {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Per-operation error states — no shared error to prevent bleed between dialogs.
  const [deleteError, setDeleteError] = useState<AppApiError | null>(null);
  const [statusError, setStatusError] = useState<AppApiError | null>(null);
  const [noteError, setNoteError] = useState<AppApiError | null>(null);

  // ── Create ─────────────────────────────────────────────────────────────
  const createApplication = useCallback(
    async (
      data: CreateApplicationInput,
    ): Promise<MutationResult<Application>> => {
      setIsCreating(true);
      try {
        const result = await applicationService.createApplication(data);
        return { data: result, error: null };
      } catch (err) {
        const error = normalizeError(err);
        return { data: null, error };
      } finally {
        setIsCreating(false);
      }
    },
    [],
  );

  // ── Update ─────────────────────────────────────────────────────────────
  const updateApplication = useCallback(
    async (
      id: string,
      data: UpdateApplicationInput,
    ): Promise<MutationResult<Application>> => {
      setIsUpdating(true);
      try {
        const result = await applicationService.updateApplication(id, data);
        return { data: result, error: null };
      } catch (err) {
        const error = normalizeError(err);
        return { data: null, error };
      } finally {
        setIsUpdating(false);
      }
    },
    [],
  );

  // ── Delete ─────────────────────────────────────────────────────────────
  const deleteApplication = useCallback(
    async (id: string): Promise<MutationResult<void>> => {
      setIsDeleting(true);
      setDeleteError(null);
      try {
        await applicationService.deleteApplication(id);
        return { data: undefined, error: null };
      } catch (err) {
        const error = normalizeError(err);
        setDeleteError(error);
        return { data: null, error };
      } finally {
        setIsDeleting(false);
      }
    },
    [],
  );

  // ── Change status ──────────────────────────────────────────────────────
  const changeStatus = useCallback(
    async (
      id: string,
      data: ChangeApplicationStatusInput,
    ): Promise<MutationResult<ApplicationDetailsResponse>> => {
      setIsChangingStatus(true);
      setStatusError(null);
      try {
        const result = await applicationService.changeStatus(id, data);
        return { data: result, error: null };
      } catch (err) {
        const error = normalizeError(err);
        setStatusError(error);
        return { data: null, error };
      } finally {
        setIsChangingStatus(false);
      }
    },
    [],
  );

  // ── Add note ───────────────────────────────────────────────────────────
  const addNote = useCallback(
    async (
      id: string,
      data: AddApplicationNoteInput,
    ): Promise<MutationResult<ApplicationDetailsResponse>> => {
      setIsAddingNote(true);
      setNoteError(null);
      try {
        const result = await applicationService.addNote(id, data);
        return { data: result, error: null };
      } catch (err) {
        const error = normalizeError(err);
        setNoteError(error);
        return { data: null, error };
      } finally {
        setIsAddingNote(false);
      }
    },
    [],
  );

  return {
    createApplication,
    updateApplication,
    deleteApplication,
    changeStatus,
    addNote,

    isCreating,
    isUpdating,
    isDeleting,
    isChangingStatus,
    isAddingNote,

    deleteError,
    statusError,
    noteError,

    clearDeleteError: useCallback(() => setDeleteError(null), []),
    clearStatusError: useCallback(() => setStatusError(null), []),
    clearNoteError: useCallback(() => setNoteError(null), []),
  };
}
