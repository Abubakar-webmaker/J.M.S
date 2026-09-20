import type { ApplicationStatus } from '@/constants/application';
import type { JobType } from '@/constants/job';
import type { ApplicationFormData } from '@/features/applications/schemas';

export interface ApplicationStatusOption {
  value: ApplicationStatus;
  label: string;
}

export interface JobTypeOption {
  value: JobType;
  label: string;
}

export const APPLICATION_STATUS_OPTIONS: ApplicationStatusOption[] = [
  { value: 'Applied', label: 'Applied' },
  { value: 'Screening', label: 'Screening' },
  { value: 'Interview', label: 'Interview' },
  { value: 'Offer', label: 'Offer' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Ghosted', label: 'Ghosted' },
  { value: 'Withdrawn', label: 'Withdrawn' },
];

export const JOB_TYPE_OPTIONS: JobTypeOption[] = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Temporary', label: 'Temporary' },
];

export function getDefaultApplicationFormValues(): ApplicationFormData {
  return {
    companyName: '',
    jobTitle: '',
    jobUrl: '',
    location: '',
    jobType: 'Full-time',
    applicationDate: new Date().toISOString().slice(0, 10),
    status: 'Applied',
    salaryMin: undefined,
    salaryMax: undefined,
    salaryCurrency: 'USD',
    jobDescription: '',
    notes: '',
    resumeId: '',
  };
}

/** @deprecated Use getDefaultApplicationFormValues() instead */
export const DEFAULT_APPLICATION_FORM_VALUES: ApplicationFormData =
  getDefaultApplicationFormValues();

export const APPLICATION_LIST_DEFAULTS = {
  page: 1,
  limit: 20,
} as const;

export const DEFAULT_APPLICATION_SORT = {
  sortBy: 'applicationDate',
  sortOrder: 'desc',
} as const;

export const APPLICATION_FILTER_KEYS = [
  'search',
  'status',
  'location',
  'jobType',
  'applicationDateFrom',
  'applicationDateTo',
] as const;

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;