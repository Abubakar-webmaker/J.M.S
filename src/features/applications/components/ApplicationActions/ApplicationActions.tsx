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
    <div className="flex flex-wrap items-center gap-2 max-sm:grid max-sm:grid-cols-1">
      <Link to={`/app/applications/${applicationId}/edit`} className="sm:contents">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || isDeleting}
          leftIcon={<Pencil className="h-4 w-4" strokeWidth={2} />}
          className="w-full sm:w-auto"
        >
          Edit
        </Button>
      </Link>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled || isDeleting}
        onClick={onChangeStatus}
        leftIcon={<RefreshCw className="h-4 w-4" strokeWidth={2} />}
        className="w-full sm:w-auto"
      >
        Change status
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled || isDeleting}
        onClick={onAddNote}
        leftIcon={<MessageSquarePlus className="h-4 w-4" strokeWidth={2} />}
        className="w-full sm:w-auto"
      >
        Add note
      </Button>

      <Button
        type="button"
        variant="danger"
        size="sm"
        loading={isDeleting}
        disabled={disabled || isDeleting}
        onClick={onDelete}
        leftIcon={<Trash2 className="h-4 w-4" strokeWidth={2} />}
        className="w-full sm:w-auto"
      >
        Delete
      </Button>
    </div>
  );
}
