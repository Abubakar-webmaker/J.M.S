import { FileText, Upload } from 'lucide-react';

import { Button, EmptyState } from '@/components/ui';

interface ResumesEmptyStateProps {
  hasSearch: boolean;
  onClearSearch: () => void;
  onUpload: () => void;
}

export function ResumesEmptyState({
  hasSearch,
  onClearSearch,
  onUpload,
}: ResumesEmptyStateProps) {
  if (hasSearch) {
    return (
      <EmptyState
        icon={
          <FileText
            className="h-6 w-6"
            aria-hidden="true"
          />
        }
        title="No resumes found"
        description="Try a different search term."
        action={
          <Button
            type="button"
            variant="outline"
            onClick={onClearSearch}
          >
            Clear search
          </Button>
        }
      />
    );
  }

  return (
    <EmptyState
      icon={
        <Upload
          className="h-6 w-6"
          aria-hidden="true"
        />
      }
      title="No resumes yet"
      description="Upload your first resume to use it with your job applications."
      action={
        <Button
          type="button"
          onClick={onUpload}
          leftIcon={
            <Upload
              className="h-4 w-4"
              aria-hidden="true"
            />
          }
        >
          Upload resume
        </Button>
      }
    />
  );
}