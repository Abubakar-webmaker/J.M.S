import { Skeleton } from '@/components/ui';

export function ApplicationFormSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4].map((section) => (
        <section
          key={section}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </section>
      ))}
    </div>
  );
}