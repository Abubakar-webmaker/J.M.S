import { RefreshCw } from 'lucide-react';

import { Button, ErrorState } from '@/components/ui';

interface ProfileErrorProps {
  title?: string;
  message: string;
  onRetry: () => void;
}

export function ProfileError({
  title = 'Unable to load profile',
  message,
  onRetry,
}: ProfileErrorProps) {
  return (
    <ErrorState
      title={title}
      description={message}
      action={
        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          leftIcon={
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          }
        >
          Try again
        </Button>
      }
    />
  );
}
