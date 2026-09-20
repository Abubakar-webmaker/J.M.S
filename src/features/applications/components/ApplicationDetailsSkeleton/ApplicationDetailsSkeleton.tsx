import { Skeleton } from '@/components/ui';

export function ApplicationDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-5 w-44" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-9 w-72 max-w-full" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>

          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-20 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-surface p-6">
            <Skeleton className="h-6 w-40" />

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <Skeleton className="h-6 w-44" />

            <div className="mt-6 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-9/12" />

              <Skeleton className="mt-6 h-4 w-full" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <Skeleton className="h-6 w-36" />

            <div className="mt-6 space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex gap-4">
                  <Skeleton className="h-5 w-5 rounded-full" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="h-fit rounded-xl border border-border bg-surface p-6">
          <Skeleton className="h-6 w-40" />

          <div className="mt-5 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Skeleton className="h-10 rounded-lg" />
            <Skeleton className="h-10 rounded-lg" />
          </div>
        </section>
      </div>
    </div>
  );
}