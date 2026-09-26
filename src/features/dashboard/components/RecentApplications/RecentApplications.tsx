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
      className="rounded-xl border border-border bg-surface p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="recent-apps-heading"
          className="text-sm font-semibold text-text"
        >
          Recent applications
        </h2>

        <Link
          to="/app/applications"
          className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
        <ul className="divide-y divide-border" aria-label="Recent applications">
          {applications.map((app) => {
            const statusConfig =
              APPLICATION_STATUS_CONFIG[
                app.status as keyof typeof APPLICATION_STATUS_CONFIG
              ];

            return (
              <li key={app.id}>
                <Link
                  to={`/app/applications/${app.id}`}
                  className="flex items-center justify-between gap-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-text">
                      {app.jobTitle}
                    </p>
                    <p className="truncate text-xs text-text-muted">
                      {app.companyName}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <time
                      dateTime={app.applicationDate}
                      className="hidden text-xs text-text-muted sm:block"
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
