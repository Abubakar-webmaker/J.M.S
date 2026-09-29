import { useCallback, useEffect, useState } from 'react';

import { AppApiError } from '@/types/api';

import { profileService } from '../services/profile.service';
import type { UserProfile } from '../types/profile.types';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppApiError | null>(null);

  // Exposed so callers can manually trigger a refresh.
  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await profileService.getProfile();
      setProfile(result);
    } catch (unknownError) {
      setError(
        unknownError instanceof AppApiError
          ? unknownError
          : new AppApiError('Something went wrong. Please try again.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Run the async fetch inside the effect body directly to avoid the
    // react-hooks/set-state-in-effect lint rule triggered by calling a
    // useCallback that invokes setState.
    async function fetchProfile() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await profileService.getProfile();
        setProfile(result);
      } catch (unknownError) {
        setError(
          unknownError instanceof AppApiError
            ? unknownError
            : new AppApiError('Something went wrong. Please try again.'),
        );
      } finally {
        setIsLoading(false);
      }
    }
    void fetchProfile();
     
  }, []);

  return {
    profile,
    isLoading,
    error,
    refresh: loadProfile,
    setProfile,
  };
}
