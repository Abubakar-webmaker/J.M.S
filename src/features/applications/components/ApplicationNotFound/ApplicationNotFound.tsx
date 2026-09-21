import { FileQuestion } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button, EmptyState } from '@/components/ui';

export function ApplicationNotFound() {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={
        <FileQuestion
          className="h-6 w-6"
          aria-hidden="true"
        />
      }
      title="Application not found"
      description="The application may have been deleted or the link may be incorrect."
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