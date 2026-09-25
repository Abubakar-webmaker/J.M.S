import { Skeleton } from '@/components/ui';

export function ResumeListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-border bg-surface p-5"
        >
          <div className="flex gap-4">
            <Skeleton className="h-11 w-11 shrink-0 rounded-lg" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-5 w-40 max-w-full" />
              <Skeleton className="h-4 w-56 max-w-full" />

              <div className="flex gap-3 pt-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}