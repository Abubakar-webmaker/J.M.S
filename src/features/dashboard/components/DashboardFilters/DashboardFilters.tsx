import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/Button';

interface DashboardFiltersProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function DashboardFilters({
  isRefreshing,
  onRefresh,
}: DashboardFiltersProps) {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing}
        aria-label="Refresh dashboard"
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
