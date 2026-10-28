import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, Card, Input, Modal, useToast } from '@/components/ui';
import { useProfileMutations } from '@/features/profile/hooks/useProfileMutations';
import { useAuth } from '@/features/auth/context/useAuth';

/**
 * Danger Zone Panel
 *
 * Destructive account actions. The delete-account flow is guarded by a
 * confirmation modal requiring the user to type DELETE.
 */
export function DangerZonePanel() {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { logout } = useAuth();
  const { deleteAccount, isDeletingAccount, deleteError } = useProfileMutations();

  const canDelete = confirmation.trim() === 'DELETE';

  const handleDeleteAccount = async () => {
    const result = await deleteAccount();

    if (result.data === null && result.error === null) {
      // Success
      showToast({
        variant: 'success',
        title: 'Account deleted successfully.',
      });
      
      // Logout and redirect
      setTimeout(async () => {
        await logout();
        navigate('/');
      }, 1000);
    } else if (result.error) {
      showToast({
        variant: 'error',
        title: 'Failed to delete account',
        description: result.error.message,
      });
    }
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
        onClose={() => {
          setOpen(false);
          setConfirmation('');
        }}
        title="Delete account"
        description="This action cannot be undone."
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setConfirmation('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={!canDelete || isDeletingAccount}
              onClick={handleDeleteAccount}
            >
              {isDeletingAccount ? 'Deleting...' : 'Delete account'}
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

          {deleteError && (
            <div className="rounded-md bg-danger-50 p-3 text-sm text-danger-700">
              {deleteError.message}
            </div>
          )}

          <Input
            id="delete-confirmation"
            label='Type "DELETE" to confirm'
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            autoComplete="off"
          />
        </div>
      </Modal>
    </>
  );
}
