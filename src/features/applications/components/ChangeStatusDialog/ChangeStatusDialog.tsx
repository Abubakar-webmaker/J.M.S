import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';

import { Button, Modal, Select, Textarea } from '@/components/ui';
import { APPLICATION_STATUS_OPTIONS } from '@/features/applications/constants';
import {
  changeApplicationStatusSchema,
  type ChangeApplicationStatusFormData,
} from '@/features/applications/schemas';
import type { ApplicationStatus } from '@/constants/application';

interface ChangeStatusDialogProps {
  open: boolean;
  currentStatus: ApplicationStatus;
  isSubmitting: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (data: ChangeApplicationStatusFormData) => Promise<void>;
}

export function ChangeStatusDialog({
  open,
  currentStatus,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: ChangeStatusDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ChangeApplicationStatusFormData>({
    resolver: zodResolver(changeApplicationStatusSchema) as never,
    defaultValues: { status: currentStatus, note: '' },
  });

  const noteValue = useWatch({ control, name: 'note' }) ?? '';

  useEffect(() => {
    if (open) {
      reset({ status: currentStatus, note: '' });
    }
  }, [open, currentStatus, reset]);

  const submit: SubmitHandler<ChangeApplicationStatusFormData> = async (
    data,
  ) => {
    await onSubmit(data);
  };

  return (
    <Modal
      open={open}
      onClose={isSubmitting ? () => undefined : onClose}
      title="Change application status"
      description="Update the current status and optionally record a note."
      size="sm"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="change-status-form"
            loading={isSubmitting}
          >
            Change status
          </Button>
        </div>
      }
    >
      <form
        id="change-status-form"
        onSubmit={handleSubmit(submit)}
        className="space-y-5"
        noValidate
      >
        <Select
          label="New status"
          error={errors.status?.message}
          {...register('status')}
        >
          {APPLICATION_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
              {option.value === currentStatus ? ' (current)' : ''}
            </option>
          ))}
        </Select>

        <div className="space-y-1">
          <Textarea
            label="Note (optional)"
            placeholder="e.g. Moved to interview stage after phone screen..."
            rows={4}
            maxLength={5000}
            error={errors.note?.message}
            {...register('note')}
          />
          <p className="text-right text-xs text-text-muted">
            {noteValue.length}/5000
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700"
          >
            {error}
          </div>
        )}
      </form>
    </Modal>
  );
}
