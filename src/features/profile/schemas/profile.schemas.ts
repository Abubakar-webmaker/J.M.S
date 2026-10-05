import { z } from 'zod';

import {
  PASSWORD_RULES,
  PROFILE_FIELD_RULES,
  PROFILE_NAME_RULES,
} from '../constants/profile.constants';

/**
 * Optional text field helper.
 *
 * Empty strings are normalised to `undefined` so a partial PATCH never
 * clears a field the user simply left blank. Length is only enforced
 * when a value is present.
 */
function optionalText(maxLength: number, label: string) {
  return z
    .string()
    .trim()
    .max(maxLength, `${label} must be ${maxLength} characters or less.`)
    .optional();
}

/**
 * Optional URL field helper. Accepts an empty string (treated as not set)
 * and otherwise requires a valid http(s) URL.
 */
function optionalUrl(maxLength: number, label: string) {
  return z
    .string()
    .trim()
    .max(maxLength, `${label} must be ${maxLength} characters or less.`)
    .refine(
      (value) => value === '' || /^https?:\/\/\S+$/i.test(value),
      `${label} must be a valid URL starting with http:// or https://.`,
    )
    .optional();
}

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      PROFILE_NAME_RULES.minLength,
      `Name must be at least ${PROFILE_NAME_RULES.minLength} characters.`,
    )
    .max(
      PROFILE_NAME_RULES.maxLength,
      `Name must be ${PROFILE_NAME_RULES.maxLength} characters or less.`,
    )
    .optional(),
  phone: optionalText(PROFILE_FIELD_RULES.phone.maxLength, 'Phone'),
  address: optionalText(PROFILE_FIELD_RULES.address.maxLength, 'Address'),
  city: optionalText(PROFILE_FIELD_RULES.city.maxLength, 'City'),
  country: optionalText(PROFILE_FIELD_RULES.country.maxLength, 'Country'),
  linkedinUrl: optionalUrl(
    PROFILE_FIELD_RULES.linkedinUrl.maxLength,
    'LinkedIn URL',
  ),
  githubUrl: optionalUrl(
    PROFILE_FIELD_RULES.githubUrl.maxLength,
    'GitHub URL',
  ),
  bio: optionalText(PROFILE_FIELD_RULES.bio.maxLength, 'Bio'),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Current password is required.'),
    newPassword: z
      .string()
      .min(
        PASSWORD_RULES.minLength,
        `New password must be at least ${PASSWORD_RULES.minLength} characters.`,
      )
      .max(PASSWORD_RULES.maxLength, 'New password is too long.'),
    confirmNewPassword: z
      .string()
      .min(1, 'Please confirm your new password.'),
  })
  .refine(
    (values) => values.newPassword === values.confirmNewPassword,
    {
      path: ['confirmNewPassword'],
      message: 'Passwords do not match.',
    },
  )
  .refine(
    (values) => values.currentPassword !== values.newPassword,
    {
      path: ['newPassword'],
      message:
        'New password must be different from your current password.',
    },
  );

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
