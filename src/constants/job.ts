export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Temporary',
  'Freelance',
] as const;

export type JobType = (typeof JOB_TYPES)[number];

export const JOB_TYPE_CONFIG: Record<
  JobType,
  {
    label: string;
    backendValue: string;
  }
> = {
  'Full-time': {
    label: 'Full-time',
    backendValue: 'FULL_TIME',
  },

  'Part-time': {
    label: 'Part-time',
    backendValue: 'PART_TIME',
  },

  Contract: {
    label: 'Contract',
    backendValue: 'CONTRACT',
  },

  Internship: {
    label: 'Internship',
    backendValue: 'INTERNSHIP',
  },

  Temporary: {
    label: 'Temporary',
    backendValue: 'TEMPORARY',
  },

  Freelance: {
    label: 'Freelance',
    backendValue: 'FREELANCE',
  },
};

// Convert frontend job type to backend format
export function toBackendJobType(frontendValue: JobType): string {
  return JOB_TYPE_CONFIG[frontendValue]?.backendValue || frontendValue;
}

// Convert backend job type to frontend format
export function toFrontendJobType(backendValue: string): JobType {
  const entry = Object.entries(JOB_TYPE_CONFIG).find(
    ([, config]) => config.backendValue === backendValue
  );
  return (entry?.[0] as JobType) || (backendValue as JobType);
}