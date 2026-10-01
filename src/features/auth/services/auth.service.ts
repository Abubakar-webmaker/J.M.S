import api from '@/lib/api';
import type {
  AuthResponse,
  ForgotPasswordInput,
  ForgotPasswordResponse,
  LoginInput,
  RegisterInput,
  RegisterResponse,
  ResendOtpInput,
  ResendOtpResponse,
  ResetPasswordInput,
  SessionResponse,
  VerifyOtpInput,
  VerifyOtpResponse,
  VerifyResetOtpInput,
  VerifyResetOtpResponse,
} from '../types/auth.types';

export const authService = {
  async login(data: LoginInput): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      '/auth/login',
      data,
    );

    return response.data;
  },

  async register(
    data: RegisterInput,
  ): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      '/auth/register',
      data,
    );

    return response.data;
  },

  async verifyOtp(
    data: VerifyOtpInput,
  ): Promise<VerifyOtpResponse> {
    const response = await api.post<VerifyOtpResponse>(
      '/auth/verify-otp',
      data,
    );

    return response.data;
  },

  async resendOtp(
    data: ResendOtpInput,
  ): Promise<ResendOtpResponse> {
    const response = await api.post<ResendOtpResponse>(
      '/auth/resend-otp',
      data,
    );

    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async getSession(): Promise<SessionResponse> {
    const response =
      await api.get<SessionResponse>('/auth/me');

    return response.data;
  },

  async forgotPassword(
    data: ForgotPasswordInput,
  ): Promise<ForgotPasswordResponse> {
    const response = await api.post<ForgotPasswordResponse>(
      '/auth/forgot-password',
      data,
    );

    return response.data;
  },

  async verifyResetOtp(
    data: VerifyResetOtpInput,
  ): Promise<VerifyResetOtpResponse> {
    const response = await api.post<VerifyResetOtpResponse>(
      '/auth/verify-reset-otp',
      data,
    );

    return response.data;
  },

  async resetPassword(
    data: ResetPasswordInput,
  ): Promise<void> {
    await api.post('/auth/reset-password', data);
  },
};