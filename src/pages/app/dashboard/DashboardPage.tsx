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

export function DashboardPage() {
  const { data, isLoading, isRefreshing, error, refresh } = useDashboard();

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Page header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Here's your job application overview.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <DashboardFilters
              isRefreshing={isRefreshing}
              onRefresh={() => void refresh()}
            />
          </div>
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
              <StatsGrid />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ApplicationTrendChart />
                <StatusDistributionChart />
              </div>

              <RecentApplications />
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
