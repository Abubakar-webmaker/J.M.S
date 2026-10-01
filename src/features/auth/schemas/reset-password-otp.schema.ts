import { z } from 'zod';

import { OTP_LENGTH } from './verify-otp.schema';

export const resetPasswordOtpSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(OTP_LENGTH, `Enter the ${OTP_LENGTH}-digit code.`)
    .regex(/^\d+$/, 'Code must contain only digits.'),
});

export type ResetPasswordOtpFormValues = z.infer<
  typeof resetPasswordOtpSchema
>;
