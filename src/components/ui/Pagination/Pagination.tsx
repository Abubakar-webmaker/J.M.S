import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

/**
 * Professional Pagination Component
 * 
 * Features:
 * - Previous/Next navigation buttons
 * - Page number indicators
 * - Disabled states
 * - Responsive design
 * - Keyboard accessible
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Show maximum 5 page buttons (current ±2)
  let visiblePages = pages;
  if (totalPages > 5) {
    const start = Math.max(0, currentPage - 3);
    const end = Math.min(totalPages, start + 5);
    visiblePages = pages.slice(start, end);
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Info text */}
      {totalItems && itemsPerPage && (
        <p className="text-xs text-neutral-600">
          Showing{' '}
          <span className="font-semibold">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{' '}
          to{' '}
          <span className="font-semibold">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{' '}
          of <span className="font-semibold">{totalItems}</span> results
        </p>
      )}

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {/* First page (if not visible) */}
          {visiblePages[0] > 1 && (
            <>
              <button
                type="button"
                onClick={() => onPageChange(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                aria-label="Go to page 1"
              >
                1
              </button>
              <span className="px-1 text-neutral-400">…</span>
            </>
          )}

          {/* Visible pages */}
          {visiblePages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 ${
                page === currentPage
                  ? 'bg-primary-600 text-white'
                  : 'border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Last page (if not visible) */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              <span className="px-1 text-neutral-400">…</span>
              <button
                type="button"
                onClick={() => onPageChange(totalPages)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                aria-label={`Go to page ${totalPages}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
