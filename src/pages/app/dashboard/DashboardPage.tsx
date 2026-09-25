import { useSearchParams } from 'react-router';

import { PageContainer } from '@/components/layout/PageContainer/PageContainer';

import {
  ApplicationTrendChart,
  DashboardError,
  DashboardFilters,
  DashboardSkeleton,
  RecentApplications,
  StatsGrid,
  StatusDistributionChart,
  useDashboard,
} from '@/features/dashboard';
import { getDashboardPeriod } from '@/features/dashboard/utils/dashboard.utils';
import type { DashboardPeriod } from '@/features/dashboard/types/dashboard.types';

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const period: DashboardPeriod = getDashboardPeriod(
    searchParams.get('period'),
  );

  const { data, isLoading, isRefreshing, error, refresh } =
    useDashboard(period);

  function handlePeriodChange(next: DashboardPeriod) {
    setSearchParams({ period: next });
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Page header */}
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              Track your job search at a glance.
            </p>
          </div>

          <DashboardFilters
            period={period}
            onPeriodChange={handlePeriodChange}
            isRefreshing={isRefreshing}
            onRefresh={() => void refresh()}
          />
        </header>

        {/* Loading — first fetch only */}
        {isLoading && !data && <DashboardSkeleton />}

        {/* Error — no data available */}
        {error && !data && (
          <DashboardError error={error} onRetry={() => void refresh()} />
        )}

        {/* Data available — dim during refresh but never blank */}
        {data && (
          <div
            className={
              isRefreshing ? 'opacity-70 transition-opacity' : undefined
            }
          >
            <div className="space-y-6">
              <StatsGrid summary={data.summary} />

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <ApplicationTrendChart data={data.applicationTrend} />
                <StatusDistributionChart data={data.statusDistribution} />
              </div>

              <RecentApplications applications={data.recentApplications} />
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
