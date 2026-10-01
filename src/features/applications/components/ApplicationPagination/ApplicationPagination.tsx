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

/**
 * Application List Pagination
 * 
 * Controls for:
 * - Page navigation (previous/next)
 * - Page size selection
 * - Results summary
 */
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
    <div className="flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <p className="text-sm text-neutral-600">
          Showing <span className="font-semibold text-neutral-900">{start}–{end}</span> of <span className="font-semibold text-neutral-900">{pagination.total}</span>{' '}
          {pagination.total === 1 ? 'application' : 'applications'}
        </p>

        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="page-size-select"
              className="text-sm font-medium text-neutral-700"
            >
              Per page:
            </label>
            <select
              id="page-size-select"
              value={pagination.limit}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              disabled={disabled}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 transition-colors hover:border-neutral-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:bg-neutral-50 disabled:opacity-50"
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
          leftIcon={<ChevronLeft className="h-4 w-4" strokeWidth={2} />}
        >
          Previous
        </Button>

        <span className="text-sm font-medium text-neutral-600 px-2">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || !canGoNext}
          onClick={() => onPageChange(pagination.page + 1)}
          rightIcon={<ChevronRight className="h-4 w-4" strokeWidth={2} />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
