import type { User } from '@/types';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordInput {
  email: string;
}

/** Returned after requesting a password reset. An OTP is emailed instead of a link. */
export interface ForgotPasswordResponse {
  email: string;
  otpExpiresAt: string;
}

/** Verifies the password-reset OTP before allowing a new password to be set. */
export interface VerifyResetOtpInput {
  email: string;
  otp: string;
}

/** Returned once the reset OTP is confirmed; carries a one-time reset ticket. */
export interface VerifyResetOtpResponse {
  resetToken: string;
}

export interface ResetPasswordInput {
  resetToken: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyOtpInput {
  email: string;
  otp: string;
}

export interface ResendOtpInput {
  email: string;
}

export interface AuthResponse {
  user: User;
}

/**
 * Returned after registration. The account is created but not yet
 * active until the emailed OTP is verified, so no session is issued.
 */
export interface RegisterResponse {
  email: string;
  otpExpiresAt: string;
  requiresVerification: true;
}

export interface VerifyOtpResponse {
  user: User;
}

export interface ResendOtpResponse {
  email: string;
  otpExpiresAt: string;
}

export interface SessionResponse {
  user: User | null;
}