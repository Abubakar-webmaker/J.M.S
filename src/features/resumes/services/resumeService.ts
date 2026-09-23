import api from '@/lib/api';

import { RESUME_UPLOAD_CONFIG } from '@/features/resumes/constants';
import type {
  Resume,
  ResumeDetails,
  ResumeListParams,
  ResumeListResponse,
  UpdateResumeInput,
  UploadResumeInput,
} from '@/features/resumes/types';
import { buildResumeParams } from '@/features/resumes/utils';

export interface ResumeUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export const resumeService = {
  async getResumes(
    params?: ResumeListParams,
    signal?: AbortSignal,
  ): Promise<ResumeListResponse> {
    const response = await api.get<ResumeListResponse>('/resumes', {
      params: buildResumeParams(params),
      signal,
    });

    return response.data;
  },

  async getResume(id: string): Promise<ResumeDetails> {
    const response = await api.get<ResumeDetails>(`/resumes/${id}`);

    return response.data;
  },

  async uploadResume(
    data: UploadResumeInput,
    options?: {
      signal?: AbortSignal;
      onProgress?: (progress: ResumeUploadProgress) => void;
    },
  ): Promise<Resume> {
    const formData = new FormData();

    formData.append('file', data.file);

    if (data.name?.trim()) {
      formData.append('name', data.name.trim());
    }

    const response = await api.post<Resume>('/resumes', formData, {
      timeout: RESUME_UPLOAD_CONFIG.timeoutMs,
      signal: options?.signal,

      onUploadProgress: (event) => {
        if (!options?.onProgress || !event.total) {
          return;
        }

        const percentage = Math.round(
          (event.loaded / event.total) * 100,
        );

        options.onProgress({
          loaded: event.loaded,
          total: event.total,
          percentage,
        });
      },
    });

    return response.data;
  },

  async updateResume(id: string, data: UpdateResumeInput): Promise<Resume> {
    const response = await api.patch<Resume>(`/resumes/${id}`, {
      name: data.name.trim(),
    });

    return response.data;
  },

  async deleteResume(id: string): Promise<void> {
    await api.delete(`/resumes/${id}`);
  },
};
