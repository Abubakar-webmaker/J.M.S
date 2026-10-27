import type { BadgeVariant } from '@/components/ui/Badge';

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
    variant: BadgeVariant;
    backendValue: string;
  }
> = {
  Applied: {
    label: 'Applied',
    variant: 'info',
    backendValue: 'APPLIED',
  },

  Screening: {
    label: 'Screening',
    variant: 'warning',
    backendValue: 'SCREENING',
  },

  Interview: {
    label: 'Interview',
    variant: 'info',
    backendValue: 'INTERVIEW',
  },

  Offer: {
    label: 'Offer',
    variant: 'success',
    backendValue: 'OFFER',
  },

  Rejected: {
    label: 'Rejected',
    variant: 'danger',
    backendValue: 'REJECTED',
  },

  Ghosted: {
    label: 'Ghosted',
    variant: 'neutral',
    backendValue: 'GHOSTED',
  },

  Withdrawn: {
    label: 'Withdrawn',
    variant: 'neutral',
    backendValue: 'WITHDRAWN',
  },
};

// Convert frontend status to backend format
export function toBackendApplicationStatus(frontendValue: ApplicationStatus): string {
  return APPLICATION_STATUS_CONFIG[frontendValue]?.backendValue || frontendValue;
}

// Convert backend status to frontend format
export function toFrontendApplicationStatus(backendValue: string): ApplicationStatus {
  const entry = Object.entries(APPLICATION_STATUS_CONFIG).find(
    ([, config]) => config.backendValue === backendValue
  );
  return (entry?.[0] as ApplicationStatus) || (backendValue as ApplicationStatus);
}