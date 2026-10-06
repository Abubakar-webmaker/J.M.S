import {
  BriefcaseBusiness,
  CalendarDays,
  MessageSquare,
  Star,
} from 'lucide-react';

import { DASHBOARD_STATS } from '../../constants/dashboard.constants';
import { StatCard } from '../StatCard/StatCard';

const ICONS = {
  briefcase: BriefcaseBusiness,
  calendar: CalendarDays,
  message: MessageSquare,
  star: Star,
} as const;

/**
 * Dashboard Statistics Grid
 *
 * Displays the 4 key metrics defined in the JobManager spec:
 * - Total Applications
 * - This Week
 * - Interviews
 * - Offers
 *
 * Layout: 4 columns on desktop, 2 on tablet, 1 on mobile.
 */
export function StatsGrid() {
  return (
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        Application statistics
      </h2>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => {
          const Icon = ICONS[stat.icon];
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
