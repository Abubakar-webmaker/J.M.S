import { useNavigate } from 'react-router';
import { Link } from 'react-router';

import { APPLICATION_STATUS_CONFIG } from '@/constants/application';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

import type { DashboardRecentApplication } from '../../types/dashboard.types';

interface RecentApplicationsProps {
  applications: DashboardRecentApplication[];
}

export function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="recent-apps-heading"
      className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2
          id="recent-apps-heading"
          className="text-lg font-semibold text-neutral-900"
        >
          Recent applications
        </h2>

        <Link
          to="/app/applications"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600"
        >
          View all
        </Link>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="Add your first job application to see it here."
          action={
            <Button
              variant="primary"
              onClick={() => void navigate('/app/applications/new')}
            >
              Add application
            </Button>
          }
        />
      ) : (
        <ul className="divide-y divide-neutral-100" aria-label="Recent applications">
          {applications.map((app) => {
            const statusConfig =
              APPLICATION_STATUS_CONFIG[
                app.status as keyof typeof APPLICATION_STATUS_CONFIG
              ];

            return (
              <li key={app.id}>
                <Link
                  to={`/app/applications/${app.id}`}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 py-4 px-1 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {app.jobTitle}
                    </p>
                    <p className="truncate text-xs text-neutral-600 mt-1">
                      {app.companyName}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <time
                      dateTime={app.applicationDate}
                      className="hidden text-xs text-neutral-600 sm:block"
                    >
                      {new Date(app.applicationDate).toLocaleDateString(
                        'en-US',
                        { dateStyle: 'medium' },
                      )}
                    </time>

                    {statusConfig && (
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
