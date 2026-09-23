import { z } from 'zod';

import {
  RESUME_ERROR_MESSAGES,
  RESUME_NAME_RULES,
} from '@/features/resumes/constants';
import { validateResumeFile } from '@/features/resumes/utils';

// ── Upload ─────────────────────────────────────────────────────────────────
// name is optional — if omitted the display name is derived from the filename.

export const uploadResumeSchema = z.object({
  name: z
    .string()
    .trim()
    .max(
      RESUME_NAME_RULES.maxLength,
      RESUME_ERROR_MESSAGES.nameTooLong,
    )
    .optional()
    .or(z.literal('')),

  file: z
    .custom<File>(
      (value) => value instanceof File,
      { message: RESUME_ERROR_MESSAGES.missingFile },
    )
    .superRefine((file, context) => {
      const result = validateResumeFile(file);

      if (!result.valid) {
        context.addIssue({
          code: 'custom',
          message:
            result.message ?? RESUME_ERROR_MESSAGES.invalidType,
        });
      }
    }),
});

export type UploadResumeFormData = z.infer<typeof uploadResumeSchema>;

// ── Update ─────────────────────────────────────────────────────────────────

export const updateResumeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      RESUME_NAME_RULES.minLength,
      RESUME_ERROR_MESSAGES.invalidName,
    )
    .max(
      RESUME_NAME_RULES.maxLength,
      RESUME_ERROR_MESSAGES.nameTooLong,
    ),
});

export type UpdateResumeFormData = z.infer<typeof updateResumeSchema>;
