import { Skeleton } from '@/components/ui';

/**
 * Application List Loading Skeleton
 * 
 * Provides placeholder loading state for:
 * - Desktop: table rows
 * - Mobile: card-based layout
 */
export function ApplicationListSkeleton() {
  return (
    <>
      {/* Desktop table skeleton */}
      <div className="hidden overflow-hidden rounded-lg border border-neutral-200 bg-surface md:block shadow-sm">
        <div className="space-y-0 divide-y divide-neutral-200">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 px-6 py-4"
            >
              <Skeleton className="h-5 w-32 rounded-md bg-neutral-200" />
              <Skeleton className="h-5 w-40 rounded-md bg-neutral-200" />
              <Skeleton className="h-5 w-24 rounded-md bg-neutral-200" />
              <Skeleton className="h-5 w-20 rounded-md bg-neutral-200" />
              <Skeleton className="h-5 w-24 rounded-md bg-neutral-200" />
              <Skeleton className="h-6 w-20 rounded-full bg-neutral-200" />
              <div className="flex justify-end">
                <Skeleton className="h-9 w-9 rounded-lg bg-neutral-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile card skeleton */}
      <div className="space-y-4 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-neutral-200 bg-surface p-5 shadow-sm"
          >
            <div className="flex justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40 rounded-md bg-neutral-200" />
                <Skeleton className="h-4 w-28 rounded-md bg-neutral-200" />
              </div>

              <Skeleton className="h-6 w-20 rounded-full bg-neutral-200" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Skeleton className="h-8 w-full rounded-md bg-neutral-200" />
              <Skeleton className="h-8 w-full rounded-md bg-neutral-200" />
              <Skeleton className="h-8 w-full rounded-md bg-neutral-200" />
              <Skeleton className="h-8 w-full rounded-md bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}