import { FileText, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';

import { Button, Select } from '@/components/ui';
import { useResumeOptions } from '@/features/resumes/hooks';
import type { Resume } from '@/features/resumes/types';

// Minimal shape the ApplicationForm passes in for the currently saved resume.
export interface ApplicationResume {
  id: string;
  name: string;
}

interface ApplicationResumeSelectorProps {
  value: string;
  /** The resume saved on the application being edited — used for deleted-resume fallback. */
  selectedResume?: ApplicationResume | null;
  onChange: (resumeId: string) => void;
  error?: string;
  disabled?: boolean;
}

export function ApplicationResumeSelector({
  value,
  selectedResume,
  onChange,
  error,
  disabled = false,
}: ApplicationResumeSelectorProps) {
  const {
    resumes,
    isLoading,
    error: loadError,
    refresh,
  } = useResumeOptions();

  // If the saved resumeId is not found in the loaded list, the resume was
  // deleted from the library. Show it as a disabled "no longer in library" option.
  const savedNotInList =
    value &&
    selectedResume &&
    !resumes.some((r) => r.id === value);

  return (
    <div className="space-y-3">
      <Select
        label="Submitted resume"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        error={error}
        disabled={disabled || isLoading}
      >
        <option value="">No resume selected</option>

        {/* Deleted-resume fallback — shown as disabled so the user knows it's gone */}
        {savedNotInList && (
          <option value={selectedResume.id} disabled>
            {selectedResume.name} (no longer in library)
          </option>
        )}

        {resumes.map((resume: Resume) => (
          <option key={resume.id} value={resume.id}>
            {resume.name}
          </option>
        ))}
      </Select>

      {isLoading && (
        <div
          className="flex items-center gap-2 text-xs text-text-muted"
          role="status"
          aria-live="polite"
        >
          <RefreshCw className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          Loading resumes...
        </div>
      )}

      {loadError && (
        <div
          role="alert"
          className="rounded-lg border border-danger-200 bg-danger-50 p-3"
        >
          <p className="text-sm text-danger-700">{loadError.message}</p>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => void refresh()}
            className="mt-2"
            leftIcon={<RefreshCw className="h-4 w-4" aria-hidden="true" />}
          >
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !loadError && resumes.length === 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-dashed border-border bg-neutral-50 p-4">
          <FileText
            className="mt-0.5 h-5 w-5 shrink-0 text-text-muted"
            aria-hidden="true"
          />

          <div>
            <p className="text-sm font-medium text-text">
              No resumes available
            </p>

            <p className="mt-1 text-sm text-text-muted">
              <Link
                to="/app/resumes"
                className="text-primary-600 underline hover:text-primary-700"
              >
                Manage resumes
              </Link>{' '}
              to upload one before attaching it here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
