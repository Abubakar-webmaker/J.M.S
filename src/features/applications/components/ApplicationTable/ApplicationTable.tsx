import { ExternalLink, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router';

import { Badge } from '@/components/ui';
import { APPLICATION_STATUS_CONFIG } from '@/constants/application';
import type { Application } from '@/features/applications/types';

interface ApplicationTableProps {
  applications: Application[];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function ApplicationTable({
  applications,
}: ApplicationTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <caption className="sr-only">Job applications</caption>
          <thead className="border-b border-border bg-neutral-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              <th className="px-5 py-3.5">Company</th>
              <th className="px-5 py-3.5">Position</th>
              <th className="px-5 py-3.5">Location</th>
              <th className="px-5 py-3.5">Job type</th>
              <th className="px-5 py-3.5">Applied</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {applications.map((application) => {
              const statusConfig =
                APPLICATION_STATUS_CONFIG[application.status];

              return (
                <tr
                  key={application.id}
                  className="transition-colors hover:bg-neutral-50"
                >
                  <td className="px-5 py-4">
                    <div className="font-medium text-text">
                      {application.companyName}
                    </div>

                    {application.jobUrl && (
                      <a
                        href={application.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs text-text-muted hover:text-primary-600"
                      >
                        Job posting
                        <ExternalLink
                          className="h-3 w-3"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      to={`/app/applications/${application.id}`}
                      className="font-medium text-text hover:text-primary-600"
                    >
                      {application.jobTitle}
                    </Link>
                  </td>

                  <td className="px-5 py-4 text-sm text-text-muted">
                    {application.location || '—'}
                  </td>

                  <td className="px-5 py-4 text-sm text-text-muted">
                    {application.jobType}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-text-muted">
                    {formatDate(application.applicationDate)}
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant={statusConfig.variant}>
                      {statusConfig.label}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/app/applications/${application.id}`}
                      aria-label={`View ${application.jobTitle} at ${application.companyName}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-neutral-100 hover:text-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <MoreHorizontal
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}