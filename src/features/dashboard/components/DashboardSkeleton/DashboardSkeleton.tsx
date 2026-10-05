import { Skeleton } from '@/components/ui/Skeleton';

export function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard" className="space-y-8">
      <span className="sr-only">Loading dashboard…</span>

      {/* Stats grid — 4 cards (matches StatsGrid) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <Skeleton className="mb-3.5 h-10 w-10 rounded-lg bg-neutral-200" />
            <Skeleton className="h-3.5 w-28 rounded-md bg-neutral-200" />
            <Skeleton className="mt-2 h-7 w-16 rounded-md bg-neutral-200" />
            <Skeleton className="mt-2 h-3 w-36 rounded-md bg-neutral-200" />
          </div>
        ))}
      </div>

      {/* Charts side by side */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 bg-surface p-6 shadow-sm">
          <Skeleton className="mb-6 h-5 w-40 rounded-md bg-neutral-200" />
          <Skeleton className="h-72 w-full rounded-lg bg-neutral-200" />
        </div>

        <div className="rounded-lg border border-neutral-200 bg-surface p-6 shadow-sm">
          <Skeleton className="mb-6 h-5 w-44 rounded-md bg-neutral-200" />
          <Skeleton className="mx-auto h-56 w-56 rounded-full bg-neutral-200" />
          <div className="mt-8 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full rounded-md bg-neutral-200" />
            ))}
          </div>
        </div>
      </div>

      {/* Recent applications */}
      <div className="rounded-lg border border-neutral-200 bg-surface p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-5 w-44 rounded-md bg-neutral-200" />
          <Skeleton className="h-4 w-16 rounded-md bg-neutral-200" />
        </div>
        <div className="divide-y divide-neutral-200">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-48 rounded-md bg-neutral-200" />
                <Skeleton className="h-3 w-32 rounded-md bg-neutral-200" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full bg-neutral-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
