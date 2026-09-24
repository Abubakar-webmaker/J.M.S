import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Input, Modal } from '@/components/ui';
import { RESUME_FILE_RULES } from '@/features/resumes/constants';
import { useResumeMutations } from '@/features/resumes/hooks';
import {
  uploadResumeSchema,
  type UploadResumeFormData,
} from '@/features/resumes/schemas';
import { formatFileSize, getResumeDisplayName } from '@/features/resumes/utils';

interface UploadResumeDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UploadResumeDialog({
  open,
  onClose,
  onSuccess,
}: UploadResumeDialogProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    uploadResume,
    cancelUpload,
    isUploading,
    uploadProgress,
    uploadError,
    clearUploadError,
  } = useResumeMutations();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UploadResumeFormData>({
    resolver: zodResolver(uploadResumeSchema),
    defaultValues: { name: '', file: undefined },
    mode: 'onBlur',
  });

  // Reset form state when dialog closes.
  // setState calls are deferred via Promise so they run inside an async callback,
  // satisfying the react-hooks/set-state-in-effect rule.
  useEffect(() => {
    if (!open) {
      void Promise.resolve().then(() => {
        setSelectedFile(null);
        clearUploadError();
        reset({ name: '', file: undefined });
      });
    }
  }, [open, clearUploadError, reset]);

  // Block close while uploading.
  const handleClose = () => {
    if (isUploading) return;
    onClose();
  };

  const onSubmit = async (data: UploadResumeFormData) => {
    const file = data.file;

    if (!(file instanceof File)) {
      setError('file', {
        type: 'manual',
        message: 'Please select a resume file.',
      });
      return;
    }

    const result = await uploadResume({
      file,
      name: data.name?.trim() || getResumeDisplayName('', file.name),
    });

    // Cancelled or error — stay open.
    if (!result.data) return;

    onSuccess();
    reset({ name: '', file: undefined });
    setSelectedFile(null);
  };

  const handleFileChange = (
    file: File | null,
    onChange: (value: File | undefined) => void,
  ) => {
    clearUploadError();
    setSelectedFile(file);
    onChange(file ?? undefined);

    if (file) {
      reset(
        { name: getResumeDisplayName('', file.name), file },
        { keepErrors: true },
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Upload resume"
      description="Upload a PDF resume to use with your job applications."
      size="sm"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {isUploading ? (
            <Button
              type="button"
              variant="outline"
              onClick={cancelUpload}
            >
              Cancel upload
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form="upload-resume-form"
                leftIcon={<Upload className="h-4 w-4" aria-hidden="true" />}
              >
                Upload resume
              </Button>
            </>
          )}
        </div>
      }
    >
      <form
        id="upload-resume-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        <Input
          label="Resume name"
          placeholder="e.g. Frontend Developer Resume"
          maxLength={RESUME_FILE_RULES.maxDisplayNameLength}
          error={errors.name?.message}
          {...register('name')}
        />

        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <span className="block text-sm font-medium text-text">
                Resume file
              </span>

              {/* Hidden native file input — triggered by the visible button */}
              <input
                ref={(el) => {
                  inputRef.current = el;
                  field.ref(el);
                }}
                type="file"
                accept=".pdf,application/pdf"
                aria-label="Select PDF resume file"
                className="sr-only"
                onChange={(event) => {
                  handleFileChange(
                    event.target.files?.[0] ?? null,
                    field.onChange,
                  );
                }}
              />

              <button
                type="button"
                disabled={isUploading}
                onClick={() => inputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-border px-5 py-8 text-center transition-colors hover:border-primary-400 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Upload className="h-5 w-5" aria-hidden="true" />
                </div>

                <span className="mt-3 text-sm font-medium text-text">
                  Choose a PDF resume
                </span>

                <span className="mt-1 text-xs text-text-muted">
                  Maximum size: {RESUME_FILE_RULES.maxSizeLabel}
                </span>
              </button>

              {selectedFile && (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-neutral-50 p-3">
                  <FileText
                    className="h-5 w-5 shrink-0 text-primary-600"
                    aria-hidden="true"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text">
                      {selectedFile.name}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>

                  {!isUploading && (
                    <button
                      type="button"
                      aria-label="Remove selected file"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted hover:bg-neutral-200 hover:text-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                      onClick={() => {
                        setSelectedFile(null);
                        field.onChange(undefined);
                        if (inputRef.current) {
                          inputRef.current.value = '';
                        }
                      }}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}

              {errors.file && (
                <p role="alert" className="text-sm text-danger-600">
                  {errors.file.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Upload progress bar */}
        {uploadProgress && isUploading && (
          <div
            className="space-y-2"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-text">
                Uploading — {uploadProgress.percentage}%
              </span>
              <span className="text-text-muted">
                {formatFileSize(uploadProgress.loaded)} /{' '}
                {formatFileSize(uploadProgress.total)}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-primary-600 transition-[width] duration-200"
                style={{ width: `${uploadProgress.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Inline error — dialog stays open on failure, user can retry */}
        {uploadError && (
          <div
            role="alert"
            className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700"
          >
            {uploadError.message}
          </div>
        )}
      </form>
    </Modal>
  );
}
