import {
  BriefcaseBusiness,
  CalendarDays,
  CircleCheck,
  MessageSquare,
  Percent,
  RotateCcw,
  XCircle,
} from 'lucide-react';

import type { DashboardSummary } from '../../types/dashboard.types';
import { StatCard } from '../StatCard/StatCard';

interface StatsGridProps {
  summary: DashboardSummary;
}

export function StatsGrid({ summary }: StatsGridProps) {
  // Ensure no negative values leak through
  const safe = (n: number) => Math.max(0, n);

  return (
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        Application statistics
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total applications"
          value={safe(summary.totalApplications)}
          icon={<BriefcaseBusiness className="h-5 w-5" />}
        />

        <StatCard
          title="This week"
          value={safe(summary.applicationsThisWeek)}
          icon={<CalendarDays className="h-5 w-5" />}
        />

        <StatCard
          title="Interviews"
          value={safe(summary.interviews)}
          icon={<MessageSquare className="h-5 w-5" />}
        />

        <StatCard
          title="Offers"
          value={safe(summary.offers)}
          icon={<CircleCheck className="h-5 w-5" />}
        />

        <StatCard
          title="This month"
          value={safe(summary.applicationsThisMonth)}
          icon={<CalendarDays className="h-5 w-5" />}
        />

        <StatCard
          title="Rejections"
          value={safe(summary.rejections)}
          icon={<XCircle className="h-5 w-5" />}
        />

        <StatCard
          title="Ghosted"
          value={safe(summary.ghosted)}
          icon={<RotateCcw className="h-5 w-5" />}
        />

        <StatCard
          title="Response rate"
          value={`${Math.max(0, summary.responseRate).toFixed(1)}%`}
          icon={<Percent className="h-5 w-5" />}
          description="Applications with an employer response"
        />
      </div>
    </section>
  );
}
