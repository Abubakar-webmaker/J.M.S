import { ArrowUpRight, ExternalLink, MapPin } from 'lucide-react';
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
            className="relative rounded-xl border border-neutral-200 bg-surface p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  to={`/app/applications/${application.id}`}
                  className="block truncate font-semibold text-neutral-900 transition-colors hover:text-primary-600"
                >
                  {application.jobTitle}
                </Link>

                <p className="mt-0.5 truncate text-sm text-neutral-600">
                  {application.companyName}
                </p>
              </div>

              <Badge variant={statusConfig.variant}>
                {statusConfig.label}
              </Badge>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div className="min-w-0">
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Location
                </dt>
                <dd className="mt-1 flex items-center gap-1 truncate text-neutral-900">
                  {application.location ? (
                    <>
                      <MapPin
                        className="h-3.5 w-3.5 shrink-0 text-neutral-400"
                        aria-hidden="true"
                      />
                      {application.location}
                    </>
                  ) : (
                    <span className="text-neutral-400">—</span>
                  )}
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Job type
                </dt>
                <dd className="mt-1 truncate text-neutral-900">
                  {application.jobType}
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Applied
                </dt>
                <dd className="mt-1 truncate text-neutral-900">
                  {formatDate(application.applicationDate)}
                </dd>
              </div>

              {application.jobUrl && (
                <div className="min-w-0">
                  <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Posting
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={application.jobUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-primary-600 transition-colors hover:text-primary-700"
                    >
                      Open
                      <ExternalLink
                        className="h-3 w-3"
                        aria-hidden="true"
                      />
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            <Link
              to={`/app/applications/${application.id}`}
              aria-label={`View ${application.jobTitle} at ${application.companyName}`}
              className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
            >
              <ArrowUpRight
                className="h-4 w-4"
                aria-hidden="true"
                strokeWidth={2}
              />
            </Link>
          </article>
        );
      })}
    </div>
  );
}