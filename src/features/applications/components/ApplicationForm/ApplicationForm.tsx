import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Controller,
  useForm,
  type DefaultValues,
  type Path,
  type SubmitHandler,
} from 'react-hook-form';

import { Button, Input, Select, Textarea } from '@/components/ui';
import {
  APPLICATION_STATUS_OPTIONS,
  JOB_TYPE_OPTIONS,
  getDefaultApplicationFormValues,
} from '@/features/applications/constants';
import { useApplicationMutations } from '@/features/applications/hooks';
import {
  applicationSchema,
  type ApplicationFormData,
} from '@/features/applications/schemas';
import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
} from '@/features/applications/types';
import { ApplicationResumeSelector } from '@/features/resumes/components';

interface ApplicationFormProps {
  mode: 'create' | 'edit';
  application?: Application | null;
  onSuccess: (application: Application) => void;
  onCancel: () => void;
}

function getDefaultValues(
  application?: Application | null,
): DefaultValues<ApplicationFormData> {
  if (!application) {
    return getDefaultApplicationFormValues();
  }

  return {
    companyName: application.companyName,
    jobTitle: application.jobTitle,
    jobUrl: application.jobUrl ?? '',
    location: application.location ?? '',
    jobType: application.jobType,
    applicationDate: application.applicationDate.slice(0, 10),
    status: application.status,
    salaryMin: application.salaryMin ?? undefined,
    salaryMax: application.salaryMax ?? undefined,
    salaryCurrency: application.salaryCurrency ?? 'USD',
    jobDescription: application.jobDescription ?? '',
    notes: application.notes ?? '',
    resumeId: application.submittedResume?.id ?? '',
  };
}

export function ApplicationForm({
  mode,
  application,
  onSuccess,
  onCancel,
}: ApplicationFormProps) {
  const { createApplication, updateApplication, isCreating, isUpdating } =
    useApplicationMutations();

  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isDirty },
  } = useForm<ApplicationFormData, unknown, ApplicationFormData>({
    resolver: zodResolver(applicationSchema) as never,
    defaultValues: getDefaultValues(application),
    mode: 'onBlur',
  });

  useEffect(() => {
    reset(getDefaultValues(application));
  }, [application, reset]);

  const isSubmitting = isCreating || isUpdating;

  const applyFieldErrors = (fieldErrors: { field: string; message: string }[]) => {
    for (const { field, message } of fieldErrors) {
      setError(field as Path<ApplicationFormData>, {
        type: 'server',
        message,
      });
    }
  };

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {
    setSubmitError('');

    if (mode === 'create') {
      const payload: CreateApplicationInput = {
        companyName: data.companyName.trim(),
        jobTitle: data.jobTitle.trim(),
        jobUrl: data.jobUrl?.trim() || undefined,
        location: data.location?.trim() || undefined,
        jobType: data.jobType,
        applicationDate: data.applicationDate,
        status: data.status,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        salaryCurrency: data.salaryCurrency?.trim() || undefined,
        jobDescription: data.jobDescription?.trim() || undefined,
        notes: data.notes?.trim() || undefined,
        resumeId: data.resumeId?.trim() || undefined,
      };

      const result = await createApplication(payload);
      if (result.error) {
        if (result.error.fieldErrors.length > 0) {
          applyFieldErrors(result.error.fieldErrors);
        }
        setSubmitError(
          result.error.fieldErrors.length > 0
            ? 'Please fix the errors above.'
            : result.error.message,
        );
        return;
      }

      onSuccess(result.data!);
      return;
    }

    if (!application) {
      setSubmitError('Application could not be found.');
      return;
    }

    const payload: UpdateApplicationInput = {
      companyName: data.companyName.trim(),
      jobTitle: data.jobTitle.trim(),
      jobUrl: data.jobUrl?.trim() || undefined,
      location: data.location?.trim() || undefined,
      jobType: data.jobType,
      applicationDate: data.applicationDate,
      status: data.status,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      salaryCurrency: data.salaryCurrency?.trim() || undefined,
      jobDescription: data.jobDescription?.trim() || undefined,
      notes: data.notes?.trim() || undefined,
      resumeId: data.resumeId?.trim() || null,
    };

    const result = await updateApplication(application.id, payload);

    if (result.error) {
      if (result.error.fieldErrors.length > 0) {
        applyFieldErrors(result.error.fieldErrors);
      }
      setSubmitError(
        result.error.fieldErrors.length > 0
          ? 'Please fix the errors above.'
          : result.error.message,
      );
      return;
    }

    onSuccess(result.data!);
  };

  const handleCancel = () => {
    if (isDirty) {
      const shouldLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?',
      );

      if (!shouldLeave) {
        return;
      }
    }

    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      noValidate
    >
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-text">
            Basic information
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Enter the company and position details.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Company"
            placeholder="e.g. Microsoft"
            autoComplete="organization"
            error={errors.companyName?.message}
            {...register('companyName')}
          />

          <Input
            label="Job title"
            placeholder="e.g. Frontend Developer"
            error={errors.jobTitle?.message}
            {...register('jobTitle')}
          />
        </div>
      </section>

      <div className="border-t border-border" />

      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-text">
            Job details
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Keep the position information together with the application.
          </p>
        </div>

        <Input
          label="Job posting URL"
          type="url"
          placeholder="https://example.com/jobs/frontend-developer"
          error={errors.jobUrl?.message}
          {...register('jobUrl')}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Location"
            placeholder="e.g. Karachi / Remote"
            error={errors.location?.message}
            {...register('location')}
          />

          <Select
            label="Job type"
            error={errors.jobType?.message}
            {...register('jobType')}
          >
            {JOB_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Input
            label="Application date"
            type="date"
            error={errors.applicationDate?.message}
            {...register('applicationDate')}
          />

          <Select
            label="Status"
            error={errors.status?.message}
            {...register('status')}
          >
            {APPLICATION_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </section>

      <div className="border-t border-border" />

      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-text">
            Compensation
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Add salary information when available.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Input
            label="Minimum salary"
            type="number"
            min="0"
            step="1"
            error={errors.salaryMin?.message}
            {...register('salaryMin', {
              setValueAs: (value) =>
                value === '' ? undefined : Number(value),
            })}
          />

          <Input
            label="Maximum salary"
            type="number"
            min="0"
            step="1"
            error={errors.salaryMax?.message}
            {...register('salaryMax', {
              setValueAs: (value) =>
                value === '' ? undefined : Number(value),
            })}
          />

          <Input
            label="Currency"
            placeholder="USD"
            maxLength={10}
            error={errors.salaryCurrency?.message}
            {...register('salaryCurrency')}
          />
        </div>
      </section>

      <div className="border-t border-border" />

      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-text">
            Description &amp; notes
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Store useful information for this application.
          </p>
        </div>

        <Textarea
          label="Job description"
          placeholder="Paste or summarize the job description..."
          rows={8}
          error={errors.jobDescription?.message}
          {...register('jobDescription')}
        />

        <Textarea
          label="Notes"
          placeholder="Recruiter details, interview notes, follow-up information..."
          rows={5}
          error={errors.notes?.message}
          {...register('notes')}
        />
      </section>

      <div className="border-t border-border" />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-text">
            Submitted resume
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Attach the resume you submitted with this application.
          </p>
        </div>

        <Controller
          name="resumeId"
          control={control}
          render={({ field, fieldState }) => (
            <ApplicationResumeSelector
              value={field.value ?? ''}
              selectedResume={
                application?.submittedResume
                  ? {
                      id: application.submittedResume.id,
                      name: application.submittedResume.name,
                    }
                  : null
              }
              onChange={field.onChange}
              error={fieldState.error?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </section>

      {submitError && (
        <div
          role="alert"
          className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700"
        >
          {submitError}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={isSubmitting}
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {mode === 'create' ? 'Add application' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
}
