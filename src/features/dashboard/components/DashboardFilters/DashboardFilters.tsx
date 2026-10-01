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
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-3 md:w-auto md:gap-4">
      <div className="w-full sm:w-auto sm:min-w-max">
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
        fullWidth
        className="sm:w-auto"
        leftIcon={
          <RefreshCw
            className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
        }
      >
        Refresh
      </Button>
    </div>
  );
}
