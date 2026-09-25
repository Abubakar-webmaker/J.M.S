import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Modal } from '@/components/ui';

import {
  updateResumeSchema,
  type UpdateResumeFormData,
} from '@/features/resumes/schemas';

import type { Resume } from '@/features/resumes/types';

interface RenameResumeDialogProps {
  open: boolean;
  resume: Resume | null;
  isSubmitting: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (
    data: UpdateResumeFormData,
  ) => Promise<boolean>;
}

export function RenameResumeDialog({
  open,
  resume,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: RenameResumeDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateResumeFormData>({
    resolver: zodResolver(updateResumeSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (open && resume) {
      reset({
        name: resume.name,
      });
    }
  }, [open, resume, reset]);

  const submit = async (
    data: UpdateResumeFormData,
  ) => {
    const success = await onSubmit(data);

    if (success) {
      reset({
        name: '',
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={isSubmitting ? () => undefined : onClose}
      title="Rename resume"
      description="Choose a name that helps you identify this resume."
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
            form="rename-resume-form"
            loading={isSubmitting}
          >
            Save name
          </Button>
        </div>
      }
    >
      <form
        id="rename-resume-form"
        onSubmit={handleSubmit(submit)}
        className="space-y-5"
        noValidate
      >
        <Input
          label="Resume name"
          autoComplete="off"
          maxLength={150}
          error={errors.name?.message}
          {...register('name')}
        />

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