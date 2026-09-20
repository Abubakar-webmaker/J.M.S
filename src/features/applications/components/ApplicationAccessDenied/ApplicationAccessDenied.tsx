import { ShieldOff } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button, EmptyState } from '@/components/ui';

export function ApplicationAccessDenied() {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={<ShieldOff className="h-6 w-6" aria-hidden="true" />}
      title="Access denied"
      description="You don't have permission to view this application."
      action={
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/app/applications')}
        >
          Back to applications
        </Button>
      }
    />
  );
}
