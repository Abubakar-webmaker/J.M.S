import { AlertTriangle } from 'lucide-react';

import { Button, Modal } from '@/components/ui';

interface DeleteApplicationDialogProps {
  open: boolean;
  applicationName: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteApplicationDialog({
  open,
  applicationName,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteApplicationDialogProps) {
  return (
    <Modal
      open={open}
      onClose={isDeleting ? () => undefined : onClose}
      title="Delete application?"
      description="This action cannot be undone."
      size="sm"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="danger"
            loading={isDeleting}
            disabled={isDeleting}
            onClick={onConfirm}
          >
            Delete application
          </Button>
        </div>
      }
    >
      <div className="flex gap-3 rounded-lg border border-danger-200 bg-danger-50 p-4">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-danger-600"
          aria-hidden="true"
        />

        <p className="text-sm leading-6 text-danger-700">
          You are about to permanently delete{' '}
          <strong>{applicationName}</strong>. All application data
          associated with this record will be removed.
        </p>
      </div>
    </Modal>
  );
}