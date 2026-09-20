import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';

import { Button, Modal, Textarea } from '@/components/ui';
import {
  addApplicationNoteSchema,
  type AddApplicationNoteFormData,
} from '@/features/applications/schemas';

interface AddNoteDialogProps {
  open: boolean;
  isSubmitting: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (data: AddApplicationNoteFormData) => Promise<void>;
}

export function AddNoteDialog({
  open,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: AddNoteDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddApplicationNoteFormData>({
    resolver: zodResolver(addApplicationNoteSchema) as never,
    defaultValues: { note: '' },
    mode: 'onBlur',
  });

  const noteValue = useWatch({ control, name: 'note' }) ?? '';

  useEffect(() => {
    if (open) reset({ note: '' });
  }, [open, reset]);

  const submit: SubmitHandler<AddApplicationNoteFormData> = async (data) => {
    await onSubmit(data);
  };

  return (
    <Modal
      open={open}
      onClose={isSubmitting ? () => undefined : onClose}
      title="Add note"
      description="Save an important detail or update about this application."
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
            form="add-note-form"
            loading={isSubmitting}
          >
            Add note
          </Button>
        </div>
      }
    >
      <form
        id="add-note-form"
        onSubmit={handleSubmit(submit)}
        className="space-y-1"
        noValidate
      >
        <Textarea
          label="Note"
          placeholder="e.g. Recruiter contacted me about the next round..."
          rows={6}
          maxLength={5000}
          error={errors.note?.message}
          {...register('note')}
        />
        <p className="text-right text-xs text-text-muted">
          {noteValue.length}/5000
        </p>

        {error && (
          <div
            role="alert"
            className="mt-2 rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700"
          >
            {error}
          </div>
        )}
      </form>
    </Modal>
  );
}
