import { Download, ExternalLink, FileText } from 'lucide-react';

import { Button, Card } from '@/components/ui';
import type { ApplicationResume } from '@/features/applications/types';

interface SubmittedResumeCardProps {
  resume: ApplicationResume | null | undefined;
}

export function SubmittedResumeCard({ resume }: SubmittedResumeCardProps) {
  return (
    <Card>
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold text-text">Submitted resume</h2>
        <p className="mt-1 text-sm text-text-muted">
          The resume associated with this application.
        </p>
      </div>

      {resume ? (
        <div className="mt-5 space-y-4">
          <div className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-neutral-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <FileText className="h-5 w-5" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text">
                {resume.name}
              </p>
              <p className="mt-0.5 truncate text-xs text-text-muted">
                {resume.fileName}
              </p>
              {resume.uploadedAt && (
                <time
                  dateTime={resume.uploadedAt}
                  className="mt-0.5 block text-xs text-text-muted"
                >
                  Uploaded{' '}
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(new Date(resume.uploadedAt))}
                </time>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <a
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button type="button" variant="outline" fullWidth>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                View resume
              </Button>
            </a>

            <a href={resume.url} download className="block">
              <Button type="button" variant="outline" fullWidth>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download
              </Button>
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-dashed border-border bg-neutral-50 p-5 text-center">
          <FileText
            className="mx-auto h-8 w-8 text-text-muted"
            aria-hidden="true"
          />
          <p className="mt-3 text-sm font-medium text-text">
            No resume submitted
          </p>
          <p className="mt-1 text-sm text-text-muted">
            No resume is currently associated with this application.
          </p>
        </div>
      )}
    </Card>
  );
}
