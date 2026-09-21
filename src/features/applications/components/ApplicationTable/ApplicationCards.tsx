import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

import { Badge } from '@/components/ui';
import { APPLICATION_STATUS_CONFIG } from '@/constants/application';
import type { Application } from '@/features/applications/types';

interface ApplicationCardsProps {
  applications: Application[];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function ApplicationCards({
  applications,
}: ApplicationCardsProps) {
  return (
    <div className="space-y-3 md:hidden">
      {applications.map((application) => {
        const statusConfig =
          APPLICATION_STATUS_CONFIG[application.status];

        return (
          <article
            key={application.id}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  to={`/app/applications/${application.id}`}
                  className="block truncate font-semibold text-text hover:text-primary-600"
                >
                  {application.jobTitle}
                </Link>

                <p className="mt-1 truncate text-sm text-text-muted">
                  {application.companyName}
                </p>
              </div>

              <Badge variant={statusConfig.variant}>
                {statusConfig.label}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="block text-xs text-text-muted">
                  Location
                </span>
                <span className="text-text">
                  {application.location || '—'}
                </span>
              </div>

              <div>
                <span className="block text-xs text-text-muted">
                  Job type
                </span>
                <span className="text-text">
                  {application.jobType}
                </span>
              </div>

              <div>
                <span className="block text-xs text-text-muted">
                  Applied
                </span>
                <span className="text-text">
                  {formatDate(application.applicationDate)}
                </span>
              </div>

              {application.jobUrl && (
                <div>
                  <span className="block text-xs text-text-muted">
                    Posting
                  </span>

                  <a
                    href={application.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700"
                  >
                    Open
                    <ExternalLink
                      className="h-3 w-3"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}