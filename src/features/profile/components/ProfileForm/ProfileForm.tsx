import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Textarea } from '@/components/ui';

import { updateProfileSchema } from '../../schemas/profile.schemas';
import type {
  UpdateProfileInput,
  UserProfile,
} from '../../types/profile.types';

interface ProfileFormProps {
  profile: UserProfile;
  isSubmitting: boolean;
  error?: string;
  onSubmit: (values: UpdateProfileInput) => Promise<void>;
  onCancel?: () => void;
}

const EMPTY = '';

/**
 * Form defaults are always plain strings (never null) so they line up with
 * the resolver output, where every field is `string | undefined`.
 */
type ProfileFormDefaults = {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  linkedinUrl: string;
  githubUrl: string;
  bio: string;
};

function buildDefaults(profile: UserProfile): ProfileFormDefaults {
  return {
    name: profile.name ?? EMPTY,
    phone: profile.phone ?? EMPTY,
    address: profile.address ?? EMPTY,
    city: profile.city ?? EMPTY,
    country: profile.country ?? EMPTY,
    linkedinUrl: profile.linkedinUrl ?? EMPTY,
    githubUrl: profile.githubUrl ?? EMPTY,
    bio: profile.bio ?? EMPTY,
  };
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
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: buildDefaults(profile),
  });

  // Reset to the latest profile values when the profile changes
  // (e.g. after a successful save or a refresh).
  useEffect(() => {
    reset(buildDefaults(profile));
  }, [profile, reset]);

  const handleFormSubmit = handleSubmit(async (values) => {
    // Only send changed fields — partial updates.
    const partial: UpdateProfileInput = {};

    (Object.keys(dirtyFields) as (keyof typeof values)[]).forEach((key) => {
      const value = values[key];
      // Empty string is treated as clearing the field to null.
      (partial as Record<string, unknown>)[key] =
        value === undefined || value === '' ? null : value;
    });

    await onSubmit(partial);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
      {/* Basic details */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          id="profile-name"
          label="Full name"
          {...register('name')}
          error={errors.name?.message}
          autoComplete="name"
          disabled={isSubmitting}
          required
        />

        <Input
          id="profile-phone"
          label="Phone"
          {...register('phone')}
          error={errors.phone?.message}
          autoComplete="tel"
          disabled={isSubmitting}
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          id="profile-city"
          label="City"
          {...register('city')}
          error={errors.city?.message}
          autoComplete="address-level2"
          disabled={isSubmitting}
        />

        <Input
          id="profile-country"
          label="Country"
          {...register('country')}
          error={errors.country?.message}
          autoComplete="country-name"
          disabled={isSubmitting}
        />
      </div>

      <Input
        id="profile-address"
        label="Address"
        {...register('address')}
        error={errors.address?.message}
        autoComplete="street-address"
        disabled={isSubmitting}
      />

      {/* Links */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          id="profile-linkedin"
          label="LinkedIn URL"
          type="url"
          placeholder="https://linkedin.com/in/username"
          {...register('linkedinUrl')}
          error={errors.linkedinUrl?.message}
          autoComplete="url"
          disabled={isSubmitting}
        />

        <Input
          id="profile-github"
          label="GitHub URL"
          type="url"
          placeholder="https://github.com/username"
          {...register('githubUrl')}
          error={errors.githubUrl?.message}
          autoComplete="url"
          disabled={isSubmitting}
        />
      </div>

      {/* Bio */}
      <Textarea
        id="profile-bio"
        label="Bio"
        rows={4}
        placeholder="A short summary about you…"
        {...register('bio')}
        error={errors.bio?.message}
        disabled={isSubmitting}
      />

      {error && (
        <p role="alert" className="text-sm text-danger-600">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          disabled={isSubmitting || !isDirty}
          onClick={() => {
            reset(buildDefaults(profile));
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
