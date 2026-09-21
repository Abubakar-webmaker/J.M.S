import { Skeleton } from '@/components/ui';

export function ApplicationListSkeleton() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
        <div className="space-y-0 divide-y divide-border">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 px-5 py-5"
            >
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <div className="flex justify-end">
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <div className="flex justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
              </div>

              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}