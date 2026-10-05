import { useState } from 'react';

import { Button, Card, Input, Modal } from '@/components/ui';

interface DeleteAccountCardProps {
  isDeleting: boolean;
  error?: string;
  onDelete: () => Promise<void>;
}

/**
 * Delete Account Card
 *
 * Irreversible account deletion. Guarded by a confirmation modal that
 * requires the user to type DELETE, so it cannot be triggered accidentally.
 */
export function DeleteAccountCard({
  isDeleting,
  error,
  onDelete,
}: DeleteAccountCardProps) {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState('');

  const canDelete = confirmation.trim() === 'DELETE';

  const close = () => {
    setOpen(false);
    setConfirmation('');
  };

  const handleDelete = async () => {
    await onDelete();
  };

  return (
    <>
      <Card className="border-danger-200">
        <div className="border-b border-neutral-200 pb-5">
          <h2 className="text-base font-semibold text-danger-700">
            Danger zone
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Irreversible actions that affect your account and data.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Delete account
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Permanently remove your account and all associated data.
            </p>
          </div>

          <Button
            variant="danger"
            onClick={() => setOpen(true)}
            className="shrink-0"
          >
            Delete account
          </Button>
        </div>
      </Card>

      <Modal
        open={open}
        onClose={close}
        title="Delete account"
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="outline" onClick={close} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant="danger"
              loading={isDeleting}
              disabled={!canDelete || isDeleting}
              onClick={() => void handleDelete()}
            >
              Delete account
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            Deleting your account will permanently remove your profile,
            applications, resumes, and all related data. This cannot be
            reversed.
          </p>

          <Input
            id="delete-confirmation"
            label='Type "DELETE" to confirm'
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            autoComplete="off"
            disabled={isDeleting}
          />

          {error && (
            <p role="alert" className="text-sm text-danger-600">
              {error}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}
