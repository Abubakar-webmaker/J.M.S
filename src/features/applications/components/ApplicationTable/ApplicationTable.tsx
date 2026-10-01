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
  }).format(new Date(value));
}

/**
 * Applications Table - Desktop View
 * 
 * Professional data table with:
 * - Company, position, location, job type, applied date, status
 * - Hover effects and interactive elements
 * - Hidden on tablet/mobile (cards view instead)
 */
export function ApplicationTable({
  applications,
}: ApplicationTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-lg border border-neutral-200 bg-white md:block shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <caption className="sr-only">Job applications</caption>
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Job type</th>
              <th className="px-6 py-4">Applied</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-200">
            {applications.map((application) => {
              const statusConfig =
                APPLICATION_STATUS_CONFIG[application.status];

              return (
                <tr
                  key={application.id}
                  className="transition-colors hover:bg-neutral-50"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-neutral-900">
                      {application.companyName}
                    </div>

                    {application.jobUrl && (
                      <a
                        href={application.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        Job posting
                        <ExternalLink
                          className="h-3 w-3"
                          aria-hidden="true"
                          strokeWidth={2}
                        />
                      </a>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      to={`/app/applications/${application.id}`}
                      className="font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                    >
                      {application.jobTitle}
                    </Link>
                  </td>

                  <td className="px-6 py-4 text-neutral-600">
                    {application.location || '—'}
                  </td>

                  <td className="px-6 py-4 text-neutral-600">
                    {application.jobType}
                  </td>

                  <td className="px-6 py-4 text-neutral-600 whitespace-nowrap">
                    {formatDate(application.applicationDate)}
                  </td>

                  <td className="px-6 py-4">
                    <Badge variant={statusConfig.variant}>
                      {statusConfig.label}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/app/applications/${application.id}`}
                      aria-label={`View ${application.jobTitle} at ${application.companyName}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                    >
                      <MoreHorizontal
                        className="h-4 w-4"
                        aria-hidden="true"
                        strokeWidth={2}
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