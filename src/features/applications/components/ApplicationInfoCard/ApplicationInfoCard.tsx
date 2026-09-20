import { ExternalLink } from 'lucide-react';

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

export function ApplicationInfoCard({
  application,
}: ApplicationInfoCardProps) {
  return (
    <Card>
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold text-text">
          Job information
        </h2>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
            Company
          </dt>
          <dd className="mt-1 text-sm text-text">
            {application.companyName}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
            Job type
          </dt>
          <dd className="mt-1 text-sm text-text">
            {application.jobType}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
            Location
          </dt>
          <dd className="mt-1 text-sm text-text">
            {application.location || 'Not specified'}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
            Application date
          </dt>
          <dd className="mt-1 text-sm text-text">
            {formatDate(application.applicationDate)}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
            Salary
          </dt>
          <dd className="mt-1 text-sm text-text">
            {formatSalary(application)}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
            Job posting
          </dt>
          <dd className="mt-1">
            {application.jobUrl ? (
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Open posting
                <ExternalLink
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            ) : (
              <span className="text-sm text-text-muted">
                Not provided
              </span>
            )}
          </dd>
        </div>
      </dl>
    </Card>
  );
}