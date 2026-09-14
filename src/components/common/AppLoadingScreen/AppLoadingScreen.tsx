import { Spinner } from '@/components/ui';

export function AppLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />

        <p className="text-sm text-text-muted">
          Loading your account...
        </p>
      </div>
    </div>
  );
}