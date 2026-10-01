import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { Button, PasswordInput } from '@/components/ui';

import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from '../../schemas/profile.schemas';
import { PasswordRequirements } from '../PasswordRequirements/PasswordRequirements';

interface PasswordChangeFormProps {
  isSubmitting: boolean;
  error?: string;
  /** Returns true on success so the form can reset sensitive fields */
  onSubmit: (values: ChangePasswordFormValues) => Promise<boolean>;
}

export function PasswordChangeForm({
  isSubmitting,
  error,
  onSubmit,
}: PasswordChangeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const newPassword = useWatch({ control, name: 'newPassword' });

  const handleFormSubmit = async (values: ChangePasswordFormValues) => {
    const success = await onSubmit(values);
    if (success) {
      // Clear all sensitive fields on success
      reset({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
    // On failure: keep fields so user can retry without re-typing everything.
    // Security note: current password is preserved to allow quick retry with
    // corrected new password. The form never persists passwords anywhere outside
    // React state → HTTPS request flow.
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
      noValidate
    >
      <PasswordInput
        id="current-password"
        label="Current password"
        autoComplete="current-password"
        {...register('currentPassword')}
        error={errors.currentPassword?.message}
        disabled={isSubmitting}
      />

      <div>
        <PasswordInput
          id="new-password"
          label="New password"
          autoComplete="new-password"
          {...register('newPassword')}
          error={errors.newPassword?.message}
          disabled={isSubmitting}
        />
        <div className="mt-3">
          <PasswordRequirements password={newPassword} />
        </div>
      </div>

      <PasswordInput
        id="confirm-new-password"
        label="Confirm new password"
        autoComplete="new-password"
        {...register('confirmNewPassword')}
        error={errors.confirmNewPassword?.message}
        disabled={isSubmitting}
      />

      {error && (
        <p role="alert" className="text-sm text-danger-600">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Change password
        </Button>
      </div>
    </form>
  );
}
