export const APPLICATION_STATUSES = [
  'Applied',
  'Screening',
  'Interview',
  'Offer',
  'Rejected',
  'Ghosted',
  'Withdrawn',
] as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUSES)[number];

export const APPLICATION_STATUS_CONFIG: Record<
  ApplicationStatus,
  {
    label: string;
    variant:
      | 'neutral'
      | 'success'
      | 'warning'
      | 'danger'
      | 'info';
  }
> = {
  Applied: {
    label: 'Applied',
    variant: 'info',
  },

  Screening: {
    label: 'Screening',
    variant: 'warning',
  },

  Interview: {
    label: 'Interview',
    variant: 'info',
  },

  Offer: {
    label: 'Offer',
    variant: 'success',
  },

  Rejected: {
    label: 'Rejected',
    variant: 'danger',
  },

  Ghosted: {
    label: 'Ghosted',
    variant: 'neutral',
  },

  Withdrawn: {
    label: 'Withdrawn',
    variant: 'neutral',
  },
};