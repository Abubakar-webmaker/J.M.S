import { z } from 'zod';

export const addApplicationNoteSchema = z.object({
  note: z
    .string()
    .trim()
    .min(1, 'Note is required.')
    .max(5000, 'Note must be 5,000 characters or less.'),
});

export type AddApplicationNoteFormData = z.infer<
  typeof addApplicationNoteSchema
>;