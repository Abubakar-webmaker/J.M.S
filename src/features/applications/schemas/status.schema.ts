import { z } from 'zod';

import { APPLICATION_STATUSES } from '@/constants/application';

export const changeApplicationStatusSchema = z.object({
  status: z.enum(APPLICATION_STATUSES, {
    error: 'Please select a valid status.',
  }),

  note: z
    .string()
    .trim()
    .max(5000, 'Note must be 5,000 characters or less.')
    .optional()
    .or(z.literal('')),
});

export type ChangeApplicationStatusFormData = z.infer<
  typeof changeApplicationStatusSchema
>;