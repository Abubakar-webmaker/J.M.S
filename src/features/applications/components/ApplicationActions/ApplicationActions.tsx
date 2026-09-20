import { MessageSquarePlus, Pencil, RefreshCw, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui';

interface ApplicationActionsProps {
  applicationId: string;
  onChangeStatus: () => void;
  onAddNote: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  disabled?: boolean;
}

export function ApplicationActions({
  applicationId,
  onChangeStatus,
  onAddNote,
  onDelete,
  isDeleting = false,
  disabled = false,
}: ApplicationActionsProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
      <Link to={`/app/applications/${applicationId}/edit`}>
        <Button
          type="button"
          variant="outline"
          disabled={disabled || isDeleting}
          className="w-full sm:w-auto"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit
        </Button>
      </Link>

      <Button
        type="button"
        variant="outline"
        disabled={disabled || isDeleting}
        onClick={onChangeStatus}
        className="w-full sm:w-auto"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Change status
      </Button>

      <Button
        type="button"
        variant="outline"
        disabled={disabled || isDeleting}
        onClick={onAddNote}
        className="w-full sm:w-auto"
      >
        <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
        Add note
      </Button>

      <Button
        type="button"
        variant="danger"
        loading={isDeleting}
        disabled={disabled || isDeleting}
        onClick={onDelete}
        className="w-full sm:w-auto"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        Delete
      </Button>
    </div>
  );
}
