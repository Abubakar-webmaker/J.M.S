import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui';
import type { ResumePagination as PaginationData } from '@/features/resumes/types';

interface ResumePaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function ResumePagination({
  pagination,
  onPageChange,
  disabled = false,
}: ResumePaginationProps) {
  const start =
    pagination.total === 0
      ? 0
      : (pagination.page - 1) *
          pagination.limit +
        1;

  const end = Math.min(
    pagination.page * pagination.limit,
    pagination.total,
  );

  return (
    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-text-muted">
        Showing {start}–{end} of {pagination.total} resumes
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={
            disabled || pagination.page <= 1
          }
          onClick={() =>
            onPageChange(pagination.page - 1)
          }
          leftIcon={
            <ChevronLeft
              className="h-4 w-4"
              aria-hidden="true"
            />
          }
        >
          Previous
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={
            disabled ||
            pagination.page >=
              pagination.totalPages
          }
          onClick={() =>
            onPageChange(pagination.page + 1)
          }
          rightIcon={
            <ChevronRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}