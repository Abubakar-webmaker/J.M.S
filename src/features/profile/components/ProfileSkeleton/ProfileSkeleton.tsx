import { Skeleton } from '@/components/ui';

export function ProfileSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading profile"
      className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]"
    >
      {/* Personal information card */}
      <div className="rounded-xl border border-neutral-200 bg-surface p-6 shadow-sm">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="mt-2 h-4 w-64" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="space-y-1.5">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      {/* Account info card */}
      <div className="rounded-xl border border-neutral-200 bg-surface p-6 shadow-sm">
        <Skeleton className="h-6 w-24" />
        <div className="mt-6 space-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading profile…</span>
    </div>
  );
}
