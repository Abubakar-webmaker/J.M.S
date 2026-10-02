import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button, Select } from '@/components/ui';
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
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-surface px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <p className="text-sm text-neutral-600">
          Showing{' '}
          <span className="font-semibold text-neutral-900">
            {start}–{end}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-neutral-900">
            {pagination.total}
          </span>{' '}
          {pagination.total === 1 ? 'application' : 'applications'}
        </p>

        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="page-size-select"
              className="whitespace-nowrap text-sm font-medium text-neutral-700"
            >
              Per page
            </label>

            <Select
              id="page-size-select"
              value={pagination.limit}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              disabled={disabled}
              className="h-9 w-[4.5rem] py-0 pr-8"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
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

        <span className="whitespace-nowrap px-1 text-sm font-medium text-neutral-600">
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
