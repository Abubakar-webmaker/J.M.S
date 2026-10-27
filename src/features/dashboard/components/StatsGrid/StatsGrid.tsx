import {
  BriefcaseBusiness,
  CalendarDays,
  MessageSquare,
  Star,
} from 'lucide-react';

import type { DashboardSummary } from '../../types/dashboard.types';
import { StatCard } from '../StatCard/StatCard';

const ICONS = {
  briefcase: BriefcaseBusiness,
  calendar: CalendarDays,
  message: MessageSquare,
  star: Star,
} as const;

interface StatsGridProps {
  summary?: DashboardSummary;
}

/**
 * Dashboard Statistics Grid
 *
 * Displays the 4 key metrics:
 * - Total Applications
 * - This Week
 * - Interviews
 * - Offers
 *
 * Layout: 4 columns on desktop, 2 on tablet, 1 on mobile.
 */
export function StatsGrid({ summary }: StatsGridProps) {
  // Default values if summary not available
  const defaultSummary: DashboardSummary = {
    totalApplications: 0,
    applicationsThisWeek: 0,
    applicationsThisMonth: 0,
    interviews: 0,
    offers: 0,
    rejections: 0,
    ghosted: 0,
    responseRate: 0,
  };

  const data = summary || defaultSummary;

  const stats = [
    {
      id: 'total',
      title: 'Total Applications',
      value: data.totalApplications,
      trend: `+${data.applicationsThisWeek} this week`,
      icon: 'briefcase',
    },
    {
      id: 'week',
      title: 'This Week',
      value: data.applicationsThisWeek,
      trend: `${data.applicationsThisMonth} this month`,
      icon: 'calendar',
    },
    {
      id: 'interviews',
      title: 'Interviews',
      value: data.interviews,
      trend: `${data.offers} offers`,
      icon: 'message',
    },
    {
      id: 'offers',
      title: 'Offers',
      value: data.offers,
      trend: `${data.rejections} rejections`,
      icon: 'star',
    },
  ];

  return (
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        Application statistics
      </h2>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = ICONS[stat.icon as keyof typeof ICONS];
          return (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              icon={<Icon className="h-6 w-6" strokeWidth={2} />}
              variant="accent"
            />
          );
        })}
      </div>
    </section>
  );
}
