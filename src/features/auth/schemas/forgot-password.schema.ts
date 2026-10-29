import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.'),
});

export type ForgotPasswordFormValues = z.infer<
  typeof forgotPasswordSchema
>;

export const resendOtpSchema = forgotPasswordSchema;

export type ResendOtpFormValues = z.infer<
  typeof resendOtpSchema
>;