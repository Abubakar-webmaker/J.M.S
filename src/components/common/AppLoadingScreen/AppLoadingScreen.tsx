import { Spinner } from '@/components/ui';

export function AppLoadingScreen() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background"
      aria-busy="true"
      aria-label="Loading application"
    >
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />

        <p className="text-sm text-text-muted">
          Loading...
        </p>
      </div>
    </main>
  );
}