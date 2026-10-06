import api from '@/lib/api';

import type {
  ChangePasswordResponse,
  UpdateProfileInput,
  UserProfile,
} from '../types/profile.types';

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>('/users/me');
    return response.data;
  },

  async updateProfile(input: UpdateProfileInput): Promise<UserProfile> {
    const response = await api.patch<UserProfile>('/users/me', input);
    return response.data;
  },

  async deleteAccount(): Promise<void> {
    await api.delete('/users/me');
  },

  async changePassword(input: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ChangePasswordResponse> {
    const response = await api.post<ChangePasswordResponse>(
      '/users/me/password',
      input,
    );
    return response.data;
  },
};
