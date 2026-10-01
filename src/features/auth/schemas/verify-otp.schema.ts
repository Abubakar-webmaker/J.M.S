import { z } from 'zod';

export const OTP_LENGTH = 6;

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(OTP_LENGTH, `Enter the ${OTP_LENGTH}-digit code.`)
    .regex(/^\d+$/, 'Code must contain only digits.'),
});

export type VerifyOtpFormValues = z.infer<
  typeof verifyOtpSchema
>;
