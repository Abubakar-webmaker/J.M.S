import type { ApplicationStatus } from '@/constants/application';
import type { JobType } from '@/constants/job';

// ─── Resume ────────────────────────────────────────────────────────────────

export interface ApplicationResume {
  id: string;
  name: string;
  fileName: string;
  url: string;
  uploadedAt?: string;
}

// ─── History ───────────────────────────────────────────────────────────────

export type ApplicationHistoryAction =
  | 'created'
  | 'status_changed'
  | 'note_added';

export interface ApplicationHistoryItem {
  id: string;
  action: ApplicationHistoryAction;
  status: ApplicationStatus;
  previousStatus?: ApplicationStatus | null;
  note?: string | null;
  createdAt: string;
}

// ─── Application ───────────────────────────────────────────────────────────

export interface Application {
  id: string;

  companyName: string;
  jobTitle: string;

  jobUrl?: string | null;
  location?: string | null;

  jobType: JobType;

  applicationDate: string;

  status: ApplicationStatus;

  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string | null;

  jobDescription?: string | null;
  notes?: string | null;

  submittedResume?: ApplicationResume | null;

  createdAt: string;
  updatedAt: string;
}

/** Application + full status/note history — returned by GET /applications/:id */
export interface ApplicationDetailsResponse extends Application {
  statusHistory: ApplicationHistoryItem[];
}

// ─── Inputs ────────────────────────────────────────────────────────────────

export interface CreateApplicationInput {
  companyName: string;
  jobTitle: string;

  jobUrl?: string;
  location?: string;

  jobType: JobType;

  applicationDate: string;

  status: ApplicationStatus;

  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;

  jobDescription?: string;
  notes?: string;

  resumeId?: string;
}

export interface UpdateApplicationInput {
  companyName?: string;
  jobTitle?: string;

  jobUrl?: string;
  location?: string;

  jobType?: JobType;

  applicationDate?: string;

  status?: ApplicationStatus;

  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;

  jobDescription?: string;
  notes?: string;

  resumeId?: string | null;
}

export interface ChangeApplicationStatusInput {
  status: ApplicationStatus;
  note?: string;
}

export interface AddApplicationNoteInput {
  note: string;
}

// ─── List / Filters ────────────────────────────────────────────────────────

export interface ApplicationFilters {
  search?: string;
  status?: ApplicationStatus;
  location?: string;
  jobType?: JobType;
  applicationDateFrom?: string;
  applicationDateTo?: string;
}

export interface ApplicationPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApplicationListResponse {
  data: Application[];
  pagination: ApplicationPagination;
}

export interface ApplicationListParams extends ApplicationFilters {
  page?: number;
  limit?: number;
}
