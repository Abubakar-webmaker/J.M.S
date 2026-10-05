import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Card, useToast } from '@/components/ui';
import { useAuth } from '@/features/auth/context/useAuth';
import {
  AccountInfoCard,
  DeleteAccountCard,
  ProfileError,
  ProfileForm,
  ProfileHeader,
  ProfileSkeleton,
} from '@/features/profile';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useProfileMutations } from '@/features/profile/hooks/useProfileMutations';
import type { UpdateProfileInput } from '@/features/profile/types/profile.types';
import {
  getDeleteAccountErrorMessage,
  getProfileErrorMessage,
  isNotFound,
  isUnauthorized,
} from '@/features/profile/utils/profileError';

export function ProfilePage() {
  const { refreshSession, logout } = useAuth();
  const navigate = useNavigate();
  const { profile, isLoading, error, refresh, setProfile } = useProfile();
  const {
    updateProfile,
    deleteAccount,
    isUpdatingProfile,
    isDeletingAccount,
    profileError,
    deleteError,
  } = useProfileMutations();
  const { showToast } = useToast();

  // 401 → session expired, redirect to login.
  useEffect(() => {
    if (error && isUnauthorized(error)) {
      void logout().finally(() => {
        navigate('/login', {
          replace: true,
          state: { sessionExpired: true },
        });
      });
    }
  }, [error, logout, navigate]);

  const handleSubmit = async (values: UpdateProfileInput) => {
    const result = await updateProfile(values);

    if (result.data) {
      // Update local profile state with server response (authoritative timestamp)
      setProfile(result.data);
      // Sync AuthContext so UserMenu / Header reflect the new name immediately
      await refreshSession();
      showToast({ variant: 'success', title: 'Profile updated successfully.' });
    }
  };

  const handleDeleteAccount = async () => {
    const result = await deleteAccount();

    if (!result.error) {
      showToast({
        variant: 'success',
        title: 'Your account has been deleted.',
      });
      await logout();
      navigate('/login', { replace: true });
    }
  };

  // Show skeleton on initial load (no data yet)
  if (isLoading && !profile) {
    return (
      <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ProfileHeader />
        <ProfileSkeleton />
      </div>
    );
  }

  // 404 → the account no longer exists on the server.
  if (error && !profile && isNotFound(error)) {
    return (
      <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ProfileHeader />
        <ProfileError
          title="User not found"
          message="We couldn't find your account. It may have been deleted."
          onRetry={() => void refresh()}
        />
      </div>
    );
  }

  // Show error if load failed and we have no cached data
  if (error && !profile) {
    return (
      <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ProfileHeader />
        <ProfileError
          message={getProfileErrorMessage(error)}
          onRetry={() => void refresh()}
        />
      </div>
    );
  }

  // Shouldn't happen for an authenticated user, but guard anyway
  if (!profile) {
    return null;
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <ProfileHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        {/* Personal information */}
        <Card>
          <div className="border-b border-neutral-200 pb-5">
            <h2 className="text-base font-semibold text-neutral-900">
              Personal information
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Update the information associated with your account.
            </p>
          </div>

          <div className="pt-6">
            <ProfileForm
              profile={profile}
              isSubmitting={isUpdatingProfile}
              error={
                profileError
                  ? getProfileErrorMessage(profileError)
                  : undefined
              }
              onSubmit={handleSubmit}
            />
          </div>
        </Card>

        {/* Account info */}
        <AccountInfoCard profile={profile} />
      </div>

      <DeleteAccountCard
        isDeleting={isDeletingAccount}
        error={
          deleteError
            ? getDeleteAccountErrorMessage(deleteError)
            : undefined
        }
        onDelete={handleDeleteAccount}
      />
    </div>
  );
}
