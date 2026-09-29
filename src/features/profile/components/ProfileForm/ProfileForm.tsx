import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';

import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from '../../schemas/profile.schemas';
import type { UserProfile } from '../../types/profile.types';

interface ProfileFormProps {
  profile: UserProfile;
  isSubmitting: boolean;
  error?: string;
  onSubmit: (values: UpdateProfileFormValues) => Promise<void>;
  onCancel?: () => void;
}

export function ProfileForm({
  profile,
  isSubmitting,
  error,
  onSubmit,
  onCancel,
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile.name,
    },
  });

  // Reset to latest profile values when profile changes (e.g. after successful save)
  useEffect(() => {
    reset({ name: profile.name });
  }, [profile.name, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <div>
        <label
          htmlFor="profile-name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Name
        </label>
        <Input
          id="profile-name"
          {...register('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name ? 'profile-name-error' : undefined
          }
          autoComplete="name"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p
            id="profile-name-error"
            role="alert"
            className="mt-1.5 text-sm text-red-600"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          disabled={isSubmitting || !isDirty}
          onClick={() => {
            reset({ name: profile.name });
            onCancel?.();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting || !isDirty}
        >
          Save changes
        </Button>
      </div>
    </form>
  );
}
