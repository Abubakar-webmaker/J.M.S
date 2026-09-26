import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

import { DASHBOARD_PERIODS } from '../../constants/dashboard.constants';
import type { DashboardPeriod } from '../../types/dashboard.types';

interface DashboardFiltersProps {
  period: DashboardPeriod;
  onPeriodChange: (period: DashboardPeriod) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function DashboardFilters({
  period,
  onPeriodChange,
  isRefreshing,
  onRefresh,
}: DashboardFiltersProps) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <div className="w-40">
        <Select
          aria-label="Select time period"
          value={period}
          onChange={(e) =>
            onPeriodChange(e.target.value as DashboardPeriod)
          }
        >
          {DASHBOARD_PERIODS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </Select>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing}
        aria-label="Refresh dashboard"
        leftIcon={
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
        }
      >
        Refresh
      </Button>
    </div>
  );
}
