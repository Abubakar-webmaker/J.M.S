import { Skeleton } from '@/components/ui/Skeleton';

export function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard" className="space-y-8">
      <span className="sr-only">Loading dashboard…</span>

      {/* Stats grid — 8 cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-28 bg-neutral-200" />
                <Skeleton className="h-7 w-16 bg-neutral-200" />
                <Skeleton className="h-3 w-36 bg-neutral-200" />
              </div>
              <Skeleton className="h-10 w-10 shrink-0 rounded-lg bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts side by side */}
      <div className="grid grid-cols-1 gap-6 lg:gap-8 xl:grid-cols-2">
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
          <Skeleton className="mb-4 h-5 w-40 bg-neutral-200" />
          <Skeleton className="h-72 w-full rounded-lg bg-neutral-200" />
        </div>

        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
          <Skeleton className="mb-4 h-5 w-44 bg-neutral-200" />
          <Skeleton className="mx-auto h-56 w-56 rounded-full bg-neutral-200" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full bg-neutral-200" />
            ))}
          </div>
        </div>
      </div>

      {/* Recent applications */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-5 w-44 bg-neutral-200" />
          <Skeleton className="h-4 w-16 bg-neutral-200" />
        </div>
        <div className="divide-y divide-neutral-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-48 bg-neutral-200" />
                <Skeleton className="h-3 w-32 bg-neutral-200" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full bg-neutral-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
