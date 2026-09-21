import api from '@/lib/api';

import type {
  AddApplicationNoteInput,
  Application,
  ApplicationDetailsResponse,
  ApplicationListParams,
  ApplicationListResponse,
  ChangeApplicationStatusInput,
  CreateApplicationInput,
  UpdateApplicationInput,
} from '@/features/applications/types';

import { buildApplicationParams } from '@/features/applications/utils/applicationParams';

export const applicationService = {
  async getApplications(
    params?: ApplicationListParams,
    signal?: AbortSignal,
  ): Promise<ApplicationListResponse> {
    const response = await api.get<ApplicationListResponse>('/applications', {
      params: buildApplicationParams(params),
      signal,
    });
    return response.data;
  },

  async getApplication(id: string): Promise<ApplicationDetailsResponse> {
    const response = await api.get<ApplicationDetailsResponse>(
      `/applications/${id}`,
    );
    return response.data;
  },

  async createApplication(data: CreateApplicationInput): Promise<Application> {
    const response = await api.post<Application>('/applications', data);
    return response.data;
  },

  async updateApplication(
    id: string,
    data: UpdateApplicationInput,
  ): Promise<Application> {
    const response = await api.patch<Application>(`/applications/${id}`, data);
    return response.data;
  },

  async deleteApplication(id: string): Promise<void> {
    await api.delete(`/applications/${id}`);
  },

  async changeStatus(
    id: string,
    data: ChangeApplicationStatusInput,
  ): Promise<ApplicationDetailsResponse> {
    const response = await api.patch<ApplicationDetailsResponse>(
      `/applications/${id}/status`,
      data,
    );
    return response.data;
  },

  async addNote(
    id: string,
    data: AddApplicationNoteInput,
  ): Promise<ApplicationDetailsResponse> {
    const response = await api.post<ApplicationDetailsResponse>(
      `/applications/${id}/notes`,
      data,
    );
    return response.data;
  },
};
