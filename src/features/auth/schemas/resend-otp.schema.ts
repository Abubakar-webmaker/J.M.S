import { z } from 'zod';

export const resendOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.'),
});

export type ResendOtpFormValues = z.infer<
  typeof resendOtpSchema
>;
