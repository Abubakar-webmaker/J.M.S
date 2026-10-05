import { useCallback, useState } from 'react';

import { AppApiError } from '@/types/api';

import { profileService } from '../services/profile.service';
import type {
  ChangePasswordResponse,
  UpdateProfileInput,
  UserProfile,
} from '../types/profile.types';

export interface MutationResult<T> {
  data: T | null;
  error: AppApiError | null;
}

function normalizeError(err: unknown): AppApiError {
  if (err instanceof AppApiError) return err;
  return new AppApiError('Something went wrong. Please try again.');
}

export function useProfileMutations() {
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [profileError, setProfileError] = useState<AppApiError | null>(null);
  const [passwordError, setPasswordError] = useState<AppApiError | null>(null);
  const [deleteError, setDeleteError] = useState<AppApiError | null>(null);

  const updateProfile = useCallback(
    async (input: UpdateProfileInput): Promise<MutationResult<UserProfile>> => {
      setIsUpdatingProfile(true);
      setProfileError(null);
      try {
        const result = await profileService.updateProfile(input);
        return { data: result, error: null };
      } catch (err) {
        const error = normalizeError(err);
        setProfileError(error);
        return { data: null, error };
      } finally {
        setIsUpdatingProfile(false);
      }
    },
    [],
  );

  const changePassword = useCallback(
    async (input: {
      currentPassword: string;
      newPassword: string;
    }): Promise<MutationResult<ChangePasswordResponse>> => {
      setIsChangingPassword(true);
      setPasswordError(null);
      try {
        const result = await profileService.changePassword(input);
        return { data: result, error: null };
      } catch (err) {
        const error = normalizeError(err);
        setPasswordError(error);
        return { data: null, error };
      } finally {
        setIsChangingPassword(false);
      }
    },
    [],
  );

  const deleteAccount = useCallback(async (): Promise<MutationResult<null>> => {
    setIsDeletingAccount(true);
    setDeleteError(null);
    try {
      await profileService.deleteAccount();
      return { data: null, error: null };
    } catch (err) {
      const error = normalizeError(err);
      setDeleteError(error);
      return { data: null, error };
    } finally {
      setIsDeletingAccount(false);
    }
  }, []);

  return {
    updateProfile,
    changePassword,
    deleteAccount,
    isUpdatingProfile,
    isChangingPassword,
    isDeletingAccount,
    profileError,
    passwordError,
    deleteError,
    clearProfileError: useCallback(() => setProfileError(null), []),
    clearPasswordError: useCallback(() => setPasswordError(null), []),
    clearDeleteError: useCallback(() => setDeleteError(null), []),
  };
}
