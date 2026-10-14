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
  message: string;
  data: {
    email: string;
    otpExpiresAt: string;
  };
}

/** Verifies the password-reset OTP before allowing a new password to be set. */


export interface ResetPasswordInput {
  email: string;
  otp: string;
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
  message: string;
  data: {
    user: User;
  };
}

/**
 * Returned after registration. The account is created but not yet
 * active until the emailed OTP is verified, so no session is issued.
 */
export interface RegisterResponse {
  message: string;
  data: {
    email: string;
    otpExpiresAt: string;
  };
}

export interface VerifyOtpResponse {
  message: string;
  data: {
    user: User;
  };
}

export interface ResendOtpResponse {
  message: string;
  data: {
    email: string;
    otpExpiresAt: string;
  };
}

export interface SessionResponse {
  message?: string;
  data: {
    user: User | null;
  };
}