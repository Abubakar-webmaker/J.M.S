import { Skeleton } from '@/components/ui';

export function AppLoadingScreen() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background"
      aria-busy="true"
      aria-label="Loading application"
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-4 px-6">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-32" />

        <p className="sr-only">Loading...</p>
      </div>
    </main>
  );
}