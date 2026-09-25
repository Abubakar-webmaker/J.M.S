import { AlertTriangle } from 'lucide-react';

import { Button, Modal } from '@/components/ui';
import { getResumeDeleteMessage, isResumeReferenced } from '@/features/resumes/utils';
import type { Resume } from '@/features/resumes/types';

interface DeleteResumeDialogProps {
  open: boolean;
  resume: Resume | null;
  isDeleting: boolean;
  error?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteResumeDialog({
  open,
  resume,
  isDeleting,
  error,
  onClose,
  onConfirm,
}: DeleteResumeDialogProps) {
  const referenced = isResumeReferenced(resume);
  const warningMessage = getResumeDeleteMessage(resume);

  return (
    <Modal
      open={open}
      onClose={isDeleting ? () => undefined : onClose}
      title="Delete resume?"
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
            aria-label={`Delete ${resume?.name ?? 'this resume'}`}
            onClick={onConfirm}
          >
            Delete resume
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex gap-3 rounded-lg border border-danger-200 bg-danger-50 p-4">
          <AlertTriangle
            className="mt-0.5 h-5 w-5 shrink-0 text-danger-600"
            aria-hidden="true"
          />

          <div className="space-y-1">
            <p className="text-sm leading-6 text-danger-700">
              You are about to permanently delete{' '}
              <strong>{resume?.name ?? 'this resume'}</strong>.
            </p>

            {referenced && (
              <p className="text-sm text-danger-700">
                {warningMessage}
              </p>
            )}
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700"
          >
            {error}
          </div>
        )}
      </div>
    </Modal>
  );
}
