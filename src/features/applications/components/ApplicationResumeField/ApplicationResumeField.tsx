import { FileText } from 'lucide-react';

import { Card } from '@/components/ui';
import type { ApplicationResume } from '@/features/applications/types';

interface ApplicationResumeFieldProps {
  selectedResume?: ApplicationResume | null;
}

export function ApplicationResumeField({
  selectedResume,
}: ApplicationResumeFieldProps) {
  if (!selectedResume) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-neutral-50 p-4">
        <div className="flex items-start gap-3">
          <FileText
            className="mt-0.5 h-5 w-5 text-text-muted"
            aria-hidden="true"
          />

          <div>
            <p className="text-sm font-medium text-text">
              No resume selected
            </p>

            <p className="mt-1 text-sm text-text-muted">
              Resume selection will be available when Resume Management
              is connected.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card padding="sm">
      <div className="flex items-center gap-3">
        <FileText
          className="h-5 w-5 text-primary-600"
          aria-hidden="true"
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text">
            {selectedResume.name}
          </p>

          <p className="truncate text-xs text-text-muted">
            {selectedResume.fileName}
          </p>
        </div>
      </div>
    </Card>
  );
}