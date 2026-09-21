import { RefreshCw } from 'lucide-react';

import { Button, ErrorState } from '@/components/ui';

interface ApplicationLoadErrorProps {
  message: string;
  onRetry: () => void;
}

export function ApplicationLoadError({
  message,
  onRetry,
}: ApplicationLoadErrorProps) {
  return (
    <ErrorState
      title="Unable to load application"
      description={message}
      action={
        <Button type="button" variant="outline" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
      }
    />
  );
}
