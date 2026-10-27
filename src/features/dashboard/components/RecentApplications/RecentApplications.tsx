import { Link } from 'react-router';

import { DASHBOARD_BADGE_STYLES } from '../../constants/dashboard.constants';
import type { DashboardRecentApplication } from '../../types/dashboard.types';
import { toFrontendApplicationStatus } from '@/constants/application';

interface RecentApplicationsProps {
  applications?: DashboardRecentApplication[];
}

/**
 * Recent Applications Section
 *
 * Table matching the JobManager spec: Company | Job Title | Status | Applied Date.
 * Statuses use the spec badge palette; the Company column shows the name only.
 */
export function RecentApplications({ applications = [] }: RecentApplicationsProps) {
  if (applications.length === 0) {
    return (
      <section
        aria-labelledby="recent-apps-heading"
        className="rounded-xl bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            id="recent-apps-heading"
            className="text-[15px] font-semibold text-neutral-900"
          >
            Recent Applications
          </h2>

          <Link
            to="/app/applications"
            className="text-[13px] font-medium text-primary-600 hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="text-center py-8 text-neutral-500">
          No applications yet
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="recent-apps-heading"
      className="rounded-xl bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="recent-apps-heading"
          className="text-[15px] font-semibold text-neutral-900"
        >
          Recent Applications
        </h2>

        <Link
          to="/app/applications"
          className="text-[13px] font-medium text-primary-600 hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="bg-neutral-50">
              <th className="rounded-l-md px-3 py-2.5 text-left text-[12px] font-medium uppercase tracking-[0.05em] text-neutral-500">
                Company
              </th>
              <th className="px-3 py-2.5 text-left text-[12px] font-medium uppercase tracking-[0.05em] text-neutral-500">
                Job Title
              </th>
              <th className="px-3 py-2.5 text-left text-[12px] font-medium uppercase tracking-[0.05em] text-neutral-500">
                Status
              </th>
              <th className="rounded-r-md px-3 py-2.5 text-left text-[12px] font-medium uppercase tracking-[0.05em] text-neutral-500">
                Applied Date
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => {
              // Convert backend status to frontend format
              const frontendStatus = toFrontendApplicationStatus(app.status);
              const badge = DASHBOARD_BADGE_STYLES[frontendStatus];
              const appliedDate = new Date(app.applicationDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <tr
                  key={app.id}
                  className={[
                    'transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800',
                    index === applications.length - 1 ? '' : 'border-b border-neutral-200',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <td className="px-3 py-3.5 text-sm font-medium text-neutral-900">
                    {app.companyName}
                  </td>
                  <td className="px-3 py-3.5 text-sm text-neutral-900">
                    {app.jobTitle}
                  </td>
                  <td className="px-3 py-3.5">
                    <span
                      className="inline-block whitespace-nowrap rounded-full px-2.5 py-[3px] text-xs font-medium"
                      style={{ backgroundColor: badge?.bg || '#F3F4F6', color: badge?.text || '#6B7280' }}
                    >
                      {frontendStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-neutral-500">
                    {appliedDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
