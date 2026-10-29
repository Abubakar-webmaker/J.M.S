import api from '@/lib/api';

import type {
  ChangePasswordResponse,
  UpdateProfileInput,
  UserProfile,
} from '../types/profile.types';

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<{ message: string; data: UserProfile }>('/users/me');
    return response.data.data;
  },

  async updateProfile(input: UpdateProfileInput): Promise<UserProfile> {
    const response = await api.patch<{ message: string; data: UserProfile }>('/users/me', input);
    return response.data.data;
  },

  async deleteAccount(): Promise<void> {
    console.log('[profileService] Calling DELETE /users/me');
    try {
      await api.delete('/users/me');
      console.log('[profileService] Delete successful');
    } catch (err) {
      console.error('[profileService] Delete error:', err);
      throw err;
    }
  },

  async changePassword(input: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ChangePasswordResponse> {
    const response = await api.post<{ message: string; data: ChangePasswordResponse }>(
      '/users/me/password',
      input,
    );
    return response.data.data;
  },
};
