import {
  Building2,
  CalendarDays,
  ExternalLink,
  MapPin,
  Wallet,
  Briefcase,
} from 'lucide-react';

import { Card } from '@/components/ui';
import type { Application } from '@/features/applications/types';

interface ApplicationInfoCardProps {
  application: Application;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function formatSalary(application: Application) {
  if (
    application.salaryMin == null &&
    application.salaryMax == null
  ) {
    return 'Not specified';
  }

  const currency = application.salaryCurrency || 'USD';

  if (
    application.salaryMin != null &&
    application.salaryMax != null
  ) {
    return `${currency} ${application.salaryMin.toLocaleString()} – ${application.salaryMax.toLocaleString()}`;
  }

  if (application.salaryMin != null) {
    return `${currency} ${application.salaryMin.toLocaleString()}+`;
  }

  return `Up to ${currency} ${application.salaryMax?.toLocaleString()}`;
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function InfoRow({ icon, label, children }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
        {icon}
      </span>

      <div className="min-w-0">
        <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {label}
        </dt>
        <dd className="mt-1 text-sm font-medium text-neutral-900">
          {children}
        </dd>
      </div>
    </div>
  );
}

export function ApplicationInfoCard({
  application,
}: ApplicationInfoCardProps) {
  return (
    <Card padding="none">
      <div className="border-b border-neutral-200 px-6 py-4">
        <h2 className="text-base font-semibold text-neutral-900">
          Job information
        </h2>
      </div>

      <dl className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
        <InfoRow
          icon={<Building2 className="h-4 w-4" aria-hidden="true" />}
          label="Company"
        >
          {application.companyName}
        </InfoRow>

        <InfoRow
          icon={<Briefcase className="h-4 w-4" aria-hidden="true" />}
          label="Job type"
        >
          {application.jobType}
        </InfoRow>

        <InfoRow
          icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
          label="Location"
        >
          {application.location || (
            <span className="font-normal text-neutral-500">
              Not specified
            </span>
          )}
        </InfoRow>

        <InfoRow
          icon={<CalendarDays className="h-4 w-4" aria-hidden="true" />}
          label="Application date"
        >
          {formatDate(application.applicationDate)}
        </InfoRow>

        <InfoRow
          icon={<Wallet className="h-4 w-4" aria-hidden="true" />}
          label="Salary"
        >
          {formatSalary(application)}
        </InfoRow>

        <InfoRow
          icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
          label="Job posting"
        >
          {application.jobUrl ? (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary-600 transition-colors hover:text-primary-700"
            >
              Open posting
              <ExternalLink
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </a>
          ) : (
            <span className="font-normal text-neutral-500">
              Not provided
            </span>
          )}
        </InfoRow>
      </dl>
    </Card>
  );
}