import { Card, useToast } from '@/components/ui';
import { useAuth } from '@/features/auth/context/useAuth';
import {
  AccountInfoCard,
  ProfileError,
  ProfileForm,
  ProfileHeader,
  ProfileSkeleton,
} from '@/features/profile';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useProfileMutations } from '@/features/profile/hooks/useProfileMutations';
import type { UpdateProfileFormValues } from '@/features/profile/schemas/profile.schemas';
import { getProfileErrorMessage } from '@/features/profile/utils/profileError';

export function ProfilePage() {
  const { refreshSession } = useAuth();
  const { profile, isLoading, error, refresh, setProfile } = useProfile();
  const { updateProfile, isUpdatingProfile, profileError } =
    useProfileMutations();
  const { showToast } = useToast();

  const handleSubmit = async (values: UpdateProfileFormValues) => {
    const result = await updateProfile(values);

    if (result.data) {
      // Update local profile state with server response (authoritative timestamp)
      setProfile(result.data);
      // Sync AuthContext so UserMenu / Header reflect the new name immediately
      await refreshSession();
      showToast({ variant: 'success', title: 'Profile updated successfully.' });
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
          <div className="border-b border-slate-200 pb-5">
            <h2 className="text-base font-semibold text-slate-900">
              Personal information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
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
    </div>
  );
}
