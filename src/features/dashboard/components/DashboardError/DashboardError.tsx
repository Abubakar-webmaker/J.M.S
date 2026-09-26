import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { AppApiError } from '@/types/api';

import { getDashboardErrorMessage } from '../../utils/dashboardError';

interface DashboardErrorProps {
  error: AppApiError | null;
  onRetry: () => void;
}

export function DashboardError({ error, onRetry }: DashboardErrorProps) {
  return (
    <ErrorState
      title="Unable to load dashboard"
      description={getDashboardErrorMessage(error)}
      action={
        <Button
          variant="outline"
          onClick={onRetry}
          leftIcon={<RefreshCw className="h-4 w-4" aria-hidden="true" />}
        >
          Try again
        </Button>
      }
    />
  );
}
