export interface Resume {
  id: string;

  name: string;
  fileName: string;

  fileUrl: string;

  mimeType: string;
  fileSize: number;

  applicationCount?: number;

  createdAt: string;
  updatedAt: string;
}

export interface ResumeApplicationReference {
  applicationId: string;
  companyName: string;
  jobTitle: string;
  status?: string;
}

export interface ResumeDetails extends Resume {
  applicationReferences: ResumeApplicationReference[];
}

export interface UploadResumeInput {
  file: File;
  name?: string;
}

export interface UpdateResumeInput {
  name: string;
}

export interface ResumePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ResumeListParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ResumeListResponse {
  data: Resume[];
  pagination: ResumePagination;
}

export interface DeleteResumeResult {
  success: boolean;
}
