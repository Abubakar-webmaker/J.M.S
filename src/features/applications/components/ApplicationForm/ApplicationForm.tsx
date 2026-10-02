import { zodResolver } from '@hookform/resolvers/zod';
import {
  Briefcase,
  Building2,
  FileText,
  Save,
  Wallet,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
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

interface FormSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

function FormSection({
  icon,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-neutral-200 bg-surface shadow-sm">
      <header className="flex items-start gap-3 border-b border-neutral-200 bg-neutral-50/60 px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
          {icon}
        </span>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-neutral-900">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-neutral-500">{description}</p>
        </div>
      </header>

      <div className="space-y-5 p-5">{children}</div>
    </section>
  );
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
      className="space-y-6"
      noValidate
    >
      <FormSection
        icon={<Building2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
        title="Basic information"
        description="Enter the company and position details."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Company"
            placeholder="e.g. Microsoft"
            autoComplete="organization"
            required
            error={errors.companyName?.message}
            {...register('companyName')}
          />

          <Input
            label="Job title"
            placeholder="e.g. Frontend Developer"
            required
            error={errors.jobTitle?.message}
            {...register('jobTitle')}
          />
        </div>
      </FormSection>

      <FormSection
        icon={<Briefcase className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
        title="Job details"
        description="Keep the position information together with the application."
      >
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
            required
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
            required
            error={errors.applicationDate?.message}
            {...register('applicationDate')}
          />

          <Select
            label="Status"
            required
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
      </FormSection>

      <FormSection
        icon={<Wallet className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
        title="Compensation"
        description="Add salary information when available."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Input
            label="Minimum salary"
            type="number"
            min="0"
            step="1"
            placeholder="0"
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
            placeholder="0"
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
      </FormSection>

      <FormSection
        icon={<FileText className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
        title="Description & notes"
        description="Store useful information for this application."
      >
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
      </FormSection>

      <FormSection
        icon={<FileText className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
        title="Submitted resume"
        description="Attach the resume you submitted with this application."
      >
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
      </FormSection>

      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700"
        >
          <span aria-hidden="true" className="mt-0.5 shrink-0">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-13a1 1 0 011 1v4a1 1 0 11-2 0V6a1 1 0 011-1zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span>{submitError}</span>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={handleCancel}
          className="sm:mr-auto"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={isSubmitting}
          leftIcon={
            isSubmitting ? undefined : (
              <Save className="h-4 w-4" aria-hidden="true" />
            )
          }
        >
          {mode === 'create' ? 'Add application' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
}
