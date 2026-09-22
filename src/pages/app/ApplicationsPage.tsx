import { Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import {
  ApplicationCards,
  ApplicationFilters,
  ApplicationListSkeleton,
  ApplicationPagination,
  ApplicationTable,
  ApplicationsEmptyState,
} from '@/features/applications/components';
import {
  APPLICATION_LIST_DEFAULTS,
} from '@/features/applications/constants';
import { useApplications } from '@/features/applications/hooks';
import type { ApplicationFilters as ApplicationFilterValues } from '@/features/applications/types';
import {
  filtersFromSearchParams,
  updateSearchParams,
} from '@/features/applications/utils/applicationUrl';
import { useDebounce } from '@/hooks/useDebounce';

import { Button, ErrorState } from '@/components/ui';
import { PageContainer, PageHeader } from '@/components/layout';

export default function ApplicationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial state from URL on first render only.
  const [filters, setFilters] = useState<ApplicationFilterValues>(() =>
    filtersFromSearchParams(searchParams),
  );
  const [page, setPage] = useState<number>(() => {
    const p = Number(searchParams.get('page'));
    return p > 0 ? p : APPLICATION_LIST_DEFAULTS.page;
  });
  const [limit, setLimit] = useState<number>(() => {
    const l = Number(searchParams.get('limit'));
    return l > 0 ? l : APPLICATION_LIST_DEFAULTS.limit;
  });

  // Debounce only the search string; other filters apply immediately.
  const debouncedSearch = useDebounce(filters.search, 300);

  const {
    applications,
    pagination,
    isLoading,
    isRefreshing,
    error,
    fetchApplications,
  } = useApplications();

  // Track the abort controller for the current fetch so we can cancel it.
  const abortRef = useRef<AbortController | null>(null);

  const effectiveFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearch, filters.status, filters.location, filters.jobType, filters.applicationDateFrom, filters.applicationDateTo],
  );

  const params = useMemo(
    () => ({ ...effectiveFilters, page, limit }),
    [effectiveFilters, page, limit],
  );

  // Sync URL whenever effective params change.
  useEffect(() => {
    const next = updateSearchParams(searchParams, effectiveFilters, page);
    if (limit !== APPLICATION_LIST_DEFAULTS.limit) {
      next.set('limit', String(limit));
    } else {
      next.delete('limit');
    }
    setSearchParams(next, { replace: true });
    // We intentionally exclude searchParams from deps to avoid a loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveFilters, page, limit, setSearchParams]);

  // Fetch whenever params change; abort previous in-flight request.
  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    void fetchApplications(params, controller.signal);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const hasFilters = Boolean(
    filters.search?.trim() ||
      filters.status ||
      filters.location?.trim() ||
      filters.jobType ||
      filters.applicationDateFrom ||
      filters.applicationDateTo,
  );

  const handleFilterChange = useCallback(
    (nextFilters: ApplicationFilterValues) => {
      setFilters(nextFilters);
      setPage(1); // reset to page 1 on any filter change
    },
    [],
  );

  const handleResetFilters = useCallback(() => {
    setFilters({ search: '' });
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handlePageSizeChange = useCallback((nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Applications"
        description="Track and manage all your job applications."
        actions={
          <Link to="/app/applications/new">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add application
            </Button>
          </Link>
        }
      />

      <div className="space-y-6">
        <ApplicationFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          disabled={isRefreshing}
        />

        {error ? (
          <ErrorState
            title="Unable to load applications"
            description={error.message}
            action={
              <Button
                type="button"
                variant="outline"
                onClick={() => void fetchApplications(params)}
              >
                Try again
              </Button>
            }
          />
        ) : isLoading ? (
          <ApplicationListSkeleton />
        ) : applications.length === 0 ? (
          <ApplicationsEmptyState
            hasFilters={hasFilters}
            searchTerm={filters.search}
            onResetFilters={handleResetFilters}
          />
        ) : (
          <>
            {/* Desktop table — ApplicationTable is self-hidden on mobile */}
            <ApplicationTable applications={applications} />

            {/* Mobile cards — ApplicationCards is self-hidden on desktop */}
            <ApplicationCards applications={applications} />

            {pagination && (
              <ApplicationPagination
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                disabled={isRefreshing}
              />
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}
