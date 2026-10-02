import { useSearchParams } from 'react-router';

import { Card, useToast } from '@/components/ui';
import { useAuth } from '@/features/auth/context/useAuth';
import {
  AccountInfoCard,
  PasswordChangeForm,
  ProfileError,
  ProfileForm,
  ProfileSkeleton,
} from '@/features/profile';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useProfileMutations } from '@/features/profile/hooks/useProfileMutations';
import type { UpdateProfileFormValues } from '@/features/profile/schemas/profile.schemas';
import { getProfileErrorMessage } from '@/features/profile/utils/profileError';
import {
  DangerZonePanel,
  PreferencesPanel,
  SettingsHeader,
  SettingsTabs,
} from '@/features/settings';

const TABS = [
  { label: 'Profile', value: 'profile' },
  { label: 'Security', value: 'security' },
  { label: 'Preferences', value: 'preferences' },
  { label: 'Danger zone', value: 'danger-zone' },
] as const;

type TabValue = (typeof TABS)[number]['value'];

const VALID_TABS = TABS.map((tab) => tab.value) as readonly string[];

function isTabValue(value: string | null): value is TabValue {
  return value !== null && VALID_TABS.includes(value);
}

export function SettingsPage() {
  const [searchParams] = useSearchParams();
  const activeTab: TabValue = isTabValue(searchParams.get('tab'))
    ? (searchParams.get('tab') as TabValue)
    : 'profile';

  const { refreshSession } = useAuth();
  const { profile, isLoading, error, refresh, setProfile } = useProfile();
  const {
    updateProfile,
    changePassword,
    isUpdatingProfile,
    isChangingPassword,
    profileError,
    passwordError,
  } = useProfileMutations();
  const { showToast } = useToast();

  const handleProfileSubmit = async (values: UpdateProfileFormValues) => {
    const result = await updateProfile(values);

    if (result.data) {
      setProfile(result.data);
      await refreshSession();
      showToast({ variant: 'success', title: 'Profile updated successfully.' });
    }
  };

  const handlePasswordSubmit = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    const result = await changePassword(values);

    if (result.data) {
      showToast({ variant: 'success', title: 'Password changed successfully.' });
      return true;
    }

    return false;
  };

  const renderProfileTab = () => {
    if (isLoading && !profile) {
      return <ProfileSkeleton />;
    }

    if (error && !profile) {
      return (
        <ProfileError
          message={getProfileErrorMessage(error)}
          onRetry={() => void refresh()}
        />
      );
    }

    if (!profile) {
      return null;
    }

    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
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
                profileError ? getProfileErrorMessage(profileError) : undefined
              }
              onSubmit={handleProfileSubmit}
            />
          </div>
        </Card>

        <AccountInfoCard profile={profile} />
      </div>
    );
  };

  const renderSecurityTab = () => (
    <div className="max-w-2xl">
      <Card>
        <div className="border-b border-neutral-200 pb-5">
          <h2 className="text-base font-semibold text-neutral-900">
            Change password
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Update your password to keep your account secure.
          </p>
        </div>

        <div className="pt-6">
          <PasswordChangeForm
            isSubmitting={isChangingPassword}
            error={
              passwordError ? getProfileErrorMessage(passwordError) : undefined
            }
            onSubmit={handlePasswordSubmit}
          />
        </div>
      </Card>
    </div>
  );

  const renderPreferencesTab = () => <PreferencesPanel />;

  const renderDangerZoneTab = () => <DangerZonePanel />;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'security':
        return renderSecurityTab();
      case 'preferences':
        return renderPreferencesTab();
      case 'danger-zone':
        return renderDangerZoneTab();
      case 'profile':
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <SettingsHeader />

      <SettingsTabs
        tabs={[...TABS]}
        activeTab={activeTab}
      />

      <div>{renderActiveTab()}</div>
    </div>
  );
}
