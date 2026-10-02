import { Card, useToast } from '@/components/ui';
import { PasswordChangeForm } from '@/features/profile';
import { useProfileMutations } from '@/features/profile/hooks/useProfileMutations';
import type { ChangePasswordFormValues } from '@/features/profile/schemas/profile.schemas';
import { getPasswordErrorMessage } from '@/features/profile/utils/profileError';

export function ChangePasswordPage() {
  const { changePassword, isChangingPassword, passwordError } =
    useProfileMutations();
  const { showToast } = useToast();

  const handleSubmit = async (
    values: ChangePasswordFormValues,
  ): Promise<boolean> => {
    const result = await changePassword({
      currentPassword: values.currentPassword,
      // confirmNewPassword is frontend-only; never sent to the backend
      newPassword: values.newPassword,
    });

    if (result.data) {
      showToast({
        variant: 'success',
        title: 'Password changed successfully.',
      });
      return true;
    }

    return false;
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Change password
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Keep your account secure by using a strong password.
          </p>
        </header>

        <Card>
          <PasswordChangeForm
            isSubmitting={isChangingPassword}
            error={
              passwordError
                ? getPasswordErrorMessage(passwordError)
                : undefined
            }
            onSubmit={handleSubmit}
          />
        </Card>
      </div>
    </div>
  );
}
