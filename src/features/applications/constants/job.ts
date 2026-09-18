import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from '@/constants/application';

import {
  JOB_TYPES,
  type JobType,
} from '@/constants/job';

export interface ApplicationStatusOption {
  value: ApplicationStatus;
  label: string;
}

export interface JobTypeOption {
  value: JobType;
  label: string;
}

export const APPLICATION_STATUS_OPTIONS: ApplicationStatusOption[] =
  APPLICATION_STATUSES.map((status) => ({
    value: status,
    label: status,
  }));

export const JOB_TYPE_OPTIONS: JobTypeOption[] = JOB_TYPES.map(
  (jobType) => ({
    value: jobType,
    label: jobType,
  }),
);

export const DEFAULT_APPLICATION_FORM_VALUES = {
  companyName: '',
  jobTitle: '',
  jobUrl: '',
  location: '',
  jobType: 'Full-time' as JobType,
  applicationDate: '',
  status: 'Applied' as ApplicationStatus,
  salaryMin: undefined,
  salaryMax: undefined,
  salaryCurrency: 'USD',
  jobDescription: '',
  notes: '',
  resumeId: '',
};

export const APPLICATION_LIST_DEFAULTS = {
  page: 1,
  limit: 20,
};

export const DEFAULT_APPLICATION_SORT = {
  field: 'applicationDate',
  direction: 'desc' as const,
};

export const APPLICATION_FILTER_KEYS = {
  search: 'search',
  status: 'status',
  location: 'location',
  jobType: 'jobType',
  applicationDateFrom: 'applicationDateFrom',
  applicationDateTo: 'applicationDateTo',
} as const;