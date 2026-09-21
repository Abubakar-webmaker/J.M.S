import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui';
import { PAGE_SIZE_OPTIONS } from '@/features/applications/constants';
import type { ApplicationPagination as PaginationData } from '@/features/applications/types';

interface ApplicationPaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  disabled?: boolean;
}

export function ApplicationPagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  disabled = false,
}: ApplicationPaginationProps) {
  const canGoPrevious = pagination.page > 1;
  const canGoNext = pagination.page < pagination.totalPages;

  const start = (pagination.page - 1) * pagination.limit + 1;
  const end = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <p className="text-sm text-text-muted">
          Showing {start}–{end} of {pagination.total}{' '}
          {pagination.total === 1 ? 'application' : 'applications'}
        </p>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5">
            <label
              htmlFor="page-size-select"
              className="text-sm text-text-muted"
            >
              Per page:
            </label>
            <select
              id="page-size-select"
              value={pagination.limit}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              disabled={disabled}
              className="rounded-md border border-border bg-surface px-2 py-1 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || !canGoPrevious}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || !canGoNext}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
