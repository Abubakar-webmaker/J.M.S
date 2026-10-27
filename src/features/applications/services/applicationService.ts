import api from '@/lib/api';

import type {
  AddApplicationNoteInput,
  Application,
  ApplicationDetailsResponse,
  ApplicationListParams,
  ApplicationListResponse,
  ApplicationPagination,
  ChangeApplicationStatusInput,
  CreateApplicationInput,
  UpdateApplicationInput,
} from '@/features/applications/types';

import { buildApplicationParams } from '@/features/applications/utils/applicationParams';
import { toFrontendApplicationStatus, toBackendApplicationStatus } from '@/constants/application';
import { toFrontendJobType, toBackendJobType } from '@/constants/job';

// Helper function to convert backend application data to frontend format
function convertApplicationFromBackend(backendApp: any): Application {
  const converted = {
    ...backendApp,
    status: toFrontendApplicationStatus(backendApp.status),
    jobType: toFrontendJobType(backendApp.jobType),
  };
  
  // Convert field names back to frontend schema
  if ('company' in converted && !('companyName' in converted)) {
    (converted as any).companyName = converted.company;
    delete (converted as any).company;
  }
  
  if ('jobURL' in converted && !('jobUrl' in converted)) {
    (converted as any).jobUrl = (converted as any).jobURL;
    delete (converted as any).jobURL;
  }
  
  if ('minSalary' in converted && !('salaryMin' in converted)) {
    (converted as any).salaryMin = converted.minSalary;
    delete (converted as any).minSalary;
  }
  
  if ('maxSalary' in converted && !('salaryMax' in converted)) {
    (converted as any).salaryMax = converted.maxSalary;
    delete (converted as any).maxSalary;
  }
  
  if ('currency' in converted && !('salaryCurrency' in converted)) {
    (converted as any).salaryCurrency = converted.currency;
    delete (converted as any).currency;
  }
  
  if ('Notes' in converted && !('notes' in converted)) {
    (converted as any).notes = (converted as any).Notes;
    delete (converted as any).Notes;
  }
  
  return converted as Application;
}

// Helper function to convert backend response with applications array
function convertApplicationsFromBackend(backendApps: any[]): Application[] {
  return backendApps.map(convertApplicationFromBackend);
}

// Helper function to convert backend details response
function convertDetailsFromBackend(backendDetails: any): ApplicationDetailsResponse {
  // First convert the application part
  const converted = convertApplicationFromBackend(backendDetails);
  
  // Then convert statusHistory items
  const statusHistory = backendDetails.statusHistory?.map((item: any) => ({
    ...item,
    status: toFrontendApplicationStatus(item.status),
    previousStatus: item.previousStatus ? toFrontendApplicationStatus(item.previousStatus) : null,
  })) || [];
  
  return {
    ...converted,
    statusHistory,
  } as ApplicationDetailsResponse;
}

// Helper function to convert frontend input to backend format
function convertApplicationToBackend(frontendData: any): any {
  const converted = { ...frontendData };
  
  // Convert enum values
  if (converted.status) {
    converted.status = toBackendApplicationStatus(converted.status);
  }
  
  if (converted.jobType) {
    converted.jobType = toBackendJobType(converted.jobType);
  }
  
  // Convert field names to match backend schema
  if ('companyName' in converted) {
    converted.company = converted.companyName;
    delete converted.companyName;
  }
  
  if ('jobUrl' in converted) {
    converted.jobURL = converted.jobUrl;
    delete converted.jobUrl;
  }
  
  if ('salaryMin' in converted) {
    converted.minSalary = converted.salaryMin;
    delete converted.salaryMin;
  }
  
  if ('salaryMax' in converted) {
    converted.maxSalary = converted.salaryMax;
    delete converted.salaryMax;
  }
  
  if ('salaryCurrency' in converted) {
    converted.currency = converted.salaryCurrency;
    delete converted.salaryCurrency;
  }
  
  if ('notes' in converted) {
    converted.Notes = converted.notes;
    delete converted.notes;
  }
  
  return converted;
}

export const applicationService = {
  async getApplications(
    params?: ApplicationListParams,
    signal?: AbortSignal,
  ): Promise<ApplicationListResponse> {
    const response = await api.get<{ 
      message: string; 
      data: { applications: Application[]; pagination: ApplicationPagination } 
    }>('/applications', {
      params: buildApplicationParams(params),
      signal,
    });
    // Backend returns { message, data: { applications, pagination } }
    // Convert backend enum values to frontend format
    return {
      data: convertApplicationsFromBackend(response.data.data.applications),
      pagination: response.data.data.pagination,
    };
  },

  async getApplication(
    id: string,
    signal?: AbortSignal,
  ): Promise<ApplicationDetailsResponse> {
    const response = await api.get<{ message: string; data: ApplicationDetailsResponse }>(
      `/applications/${id}`,
      { signal },
    );
    // Backend returns { message, data: application }
    // Convert backend enum values to frontend format
    return convertDetailsFromBackend(response.data.data);
  },

  async createApplication(data: CreateApplicationInput): Promise<Application> {
    // Convert frontend enums to backend format before sending
    const backendData = convertApplicationToBackend(data);
    const response = await api.post<{ message: string; data: Application }>('/applications', backendData);
    // Convert backend enum values to frontend format
    return convertApplicationFromBackend(response.data.data);
  },

  async updateApplication(
    id: string,
    data: UpdateApplicationInput,
  ): Promise<Application> {
    // Convert frontend enums to backend format before sending
    const backendData = convertApplicationToBackend(data);
    const response = await api.patch<{ message: string; data: Application }>(`/applications/${id}`, backendData);
    // Convert backend enum values to frontend format
    return convertApplicationFromBackend(response.data.data);
  },

  async deleteApplication(id: string): Promise<void> {
    await api.delete(`/applications/${id}`);
  },

  async changeStatus(
    id: string,
    data: ChangeApplicationStatusInput,
  ): Promise<ApplicationDetailsResponse> {
    // Convert frontend status to backend format before sending
    const backendData = convertApplicationToBackend(data);
    const response = await api.patch<{ message: string; data: ApplicationDetailsResponse }>(
      `/applications/${id}/status`,
      backendData,
    );
    // Convert backend enum values to frontend format
    return convertDetailsFromBackend(response.data.data);
  },

  async addNote(
    id: string,
    data: AddApplicationNoteInput,
  ): Promise<ApplicationDetailsResponse> {
    const response = await api.post<{ message: string; data: ApplicationDetailsResponse }>(
      `/applications/${id}/notes`,
      data,
    );
    // Convert backend enum values to frontend format
    return convertDetailsFromBackend(response.data.data);
  },
};
