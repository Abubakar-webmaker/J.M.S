import type { ApplicationFilters } from '@/features/applications/types';

export function hasInvalidDateRange(
  filters: ApplicationFilters,
): boolean {
  if (
    !filters.applicationDateFrom ||
    !filters.applicationDateTo
  ) {
    return false;
  }

  return (
    new Date(filters.applicationDateFrom) >
    new Date(filters.applicationDateTo)
  );
}