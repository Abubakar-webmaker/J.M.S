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
        <div className="mt-8 space-y-5">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex justify-end gap-3">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>

      {/* Account info card */}
      <div className="rounded-xl border border-neutral-200 bg-surface p-6 shadow-sm">
        <Skeleton className="h-6 w-24" />
        <div className="mt-6 space-y-6">
          <div className="space-y-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      <span className="sr-only">Loading profile…</span>
    </div>
  );
}
