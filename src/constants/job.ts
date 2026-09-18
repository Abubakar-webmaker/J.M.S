export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Temporary',
] as const;

export type JobType = (typeof JOB_TYPES)[number];

export const JOB_TYPE_CONFIG: Record<
  JobType,
  {
    label: string;
  }
> = {
  'Full-time': {
    label: 'Full-time',
  },

  'Part-time': {
    label: 'Part-time',
  },

  Contract: {
    label: 'Contract',
  },

  Internship: {
    label: 'Internship',
  },

  Temporary: {
    label: 'Temporary',
  },
};