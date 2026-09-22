import type { ApplicationFilters } from '@/features/applications/types';

export function filtersFromSearchParams(
  searchParams: URLSearchParams,
): ApplicationFilters {
  return {
    search: searchParams.get('search') ?? '',
    status:
      (searchParams.get('status') as ApplicationFilters['status']) ||
      undefined,
    location: searchParams.get('location') ?? '',
    jobType:
      (searchParams.get('jobType') as ApplicationFilters['jobType']) ||
      undefined,
    applicationDateFrom:
      searchParams.get('applicationDateFrom') ?? undefined,
    applicationDateTo:
      searchParams.get('applicationDateTo') ?? undefined,
  };
}

export function updateSearchParams(
  searchParams: URLSearchParams,
  filters: ApplicationFilters,
  page: number,
): URLSearchParams {
  const next = new URLSearchParams(searchParams);

  const entries: Record<string, string | undefined> = {
    search: filters.search?.trim() || undefined,
    status: filters.status,
    location: filters.location?.trim() || undefined,
    jobType: filters.jobType,
    applicationDateFrom: filters.applicationDateFrom,
    applicationDateTo: filters.applicationDateTo,
  };

  Object.entries(entries).forEach(([key, value]) => {
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
  });

  if (page > 1) {
    next.set('page', String(page));
  } else {
    next.delete('page');
  }

  return next;
}