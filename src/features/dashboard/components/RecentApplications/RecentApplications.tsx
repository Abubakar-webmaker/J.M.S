import { Link } from 'react-router';

import { DASHBOARD_BADGE_STYLES } from '../../constants/dashboard.constants';

interface CompanyRow {
  name: string;
  jobTitle: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';
  date: string;
}

const ROWS: CompanyRow[] = [
  {
    name: 'Google',
    jobTitle: 'Frontend Developer',
    status: 'Interview',
    date: 'Sep 18, 2026',
  },
  {
    name: 'Microsoft',
    jobTitle: 'Software Engineer',
    status: 'Screening',
    date: 'Sep 16, 2026',
  },
  {
    name: 'Meta',
    jobTitle: 'Full Stack Developer',
    status: 'Applied',
    date: 'Sep 15, 2026',
  },
  {
    name: 'Apple',
    jobTitle: 'iOS Developer',
    status: 'Offer',
    date: 'Sep 13, 2026',
  },
  {
    name: 'Amazon',
    jobTitle: 'Backend Developer',
    status: 'Rejected',
    date: 'Sep 10, 2026',
  },
];

/**
 * Recent Applications Section
 *
 * Table matching the JobManager spec: Company | Job Title | Status | Applied Date.
 * Statuses use the spec badge palette; the Company column shows the name only.
 */
export function RecentApplications() {
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
          {ROWS.map((row, index) => {
            const badge = DASHBOARD_BADGE_STYLES[row.status];
            return (
              <tr
                key={row.name}
                className={[
                  'transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800',
                  index === ROWS.length - 1 ? '' : 'border-b border-neutral-200',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <td className="px-3 py-3.5 text-sm font-medium text-neutral-900">
                  {row.name}
                </td>
                <td className="px-3 py-3.5 text-sm text-neutral-900">
                  {row.jobTitle}
                </td>
                <td className="px-3 py-3.5">
                  <span
                    className="inline-block whitespace-nowrap rounded-full px-2.5 py-[3px] text-xs font-medium"
                    style={{ backgroundColor: badge.bg, color: badge.text }}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-sm text-neutral-500">
                  {row.date}
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
