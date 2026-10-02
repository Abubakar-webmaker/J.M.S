import { ArrowUpRight, ExternalLink, MapPin } from 'lucide-react';
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
    <div className="hidden overflow-hidden rounded-xl border border-neutral-200 bg-surface shadow-sm md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <caption className="sr-only">Job applications</caption>

          <thead className="border-b border-neutral-200 bg-neutral-50/80">
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              <th scope="col" className="px-6 py-3.5">
                Company
              </th>
              <th scope="col" className="px-6 py-3.5">
                Position
              </th>
              <th scope="col" className="px-6 py-3.5">
                Location
              </th>
              <th scope="col" className="px-6 py-3.5">
                Job type
              </th>
              <th scope="col" className="px-6 py-3.5">
                Applied
              </th>
              <th scope="col" className="px-6 py-3.5">
                Status
              </th>
              <th scope="col" className="px-6 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {applications.map((application) => {
              const statusConfig =
                APPLICATION_STATUS_CONFIG[application.status];

              return (
                <tr
                  key={application.id}
                  className="group transition-colors hover:bg-neutral-50/80"
                >
                  <td className="px-6 py-4 align-middle">
                    <div className="font-semibold text-neutral-900">
                      {application.companyName}
                    </div>

                    {application.jobUrl && (
                      <a
                        href={application.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary-600 transition-colors hover:text-primary-700"
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

                  <td className="px-6 py-4 align-middle">
                    <Link
                      to={`/app/applications/${application.id}`}
                      className="font-semibold text-neutral-900 transition-colors hover:text-primary-600"
                    >
                      {application.jobTitle}
                    </Link>
                  </td>

                  <td className="px-6 py-4 align-middle text-neutral-600">
                    {application.location ? (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin
                          className="h-3.5 w-3.5 shrink-0 text-neutral-400"
                          aria-hidden="true"
                        />
                        {application.location}
                      </span>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
                      {application.jobType}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 align-middle text-neutral-600">
                    {formatDate(application.applicationDate)}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <Badge variant={statusConfig.variant}>
                      {statusConfig.label}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-right align-middle">
                    <Link
                      to={`/app/applications/${application.id}`}
                      aria-label={`View ${application.jobTitle} at ${application.companyName}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                    >
                      <ArrowUpRight
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