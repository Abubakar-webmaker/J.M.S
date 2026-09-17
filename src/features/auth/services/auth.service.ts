import api from '@/lib/api';
import type {
  AuthResponse,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  SessionResponse,
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
  ): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      '/auth/register',
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
  ): Promise<void> {
    await api.post('/auth/forgot-password', data);
  },

  async resetPassword(
    data: ResetPasswordInput,
  ): Promise<void> {
    await api.post('/auth/reset-password', data);
  },
};