import { z } from 'zod';

import {
  PASSWORD_RULES,
  PROFILE_NAME_RULES,
} from '../constants/profile.constants';

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
    ),
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
