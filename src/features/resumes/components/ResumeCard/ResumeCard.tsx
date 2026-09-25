import {
  Download,
  ExternalLink,
  FileText,
  MoreVertical,
  Pencil,
  Trash2,
} from 'lucide-react';

import { Badge, Button, Dropdown } from '@/components/ui';
import { formatFileSize } from '@/features/resumes/utils';
import type { Resume } from '@/features/resumes/types';

interface ResumeCardProps {
  resume: Resume;
  onRename: (resume: Resume) => void;
  onDelete: (resume: Resume) => void;
  disabled?: boolean;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function ResumeCard({
  resume,
  onRename,
  onDelete,
  disabled = false,
}: ResumeCardProps) {
  const isInUse = (resume.applicationCount ?? 0) > 0;

  return (
    <article className="rounded-xl border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="break-words text-sm font-semibold text-text">
              {resume.name}
            </h2>

            {isInUse && (
              <Badge variant="info">In use</Badge>
            )}
          </div>

          <p className="mt-1 break-all text-xs text-text-muted">
            {resume.fileName}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
            <span>{formatFileSize(resume.fileSize)}</span>

            <span aria-hidden="true">•</span>

            <time dateTime={resume.createdAt}>
              {formatDate(resume.createdAt)}
            </time>

            {isInUse && (
              <>
                <span aria-hidden="true">•</span>
                <span>
                  {resume.applicationCount}{' '}
                  {resume.applicationCount === 1
                    ? 'application'
                    : 'applications'}
                </span>
              </>
            )}
          </div>
        </div>

        <Dropdown
          trigger={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={disabled}
              aria-label={`Actions for ${resume.name}`}
              className="h-9 w-9 p-0"
            >
              <MoreVertical className="h-4 w-4" aria-hidden="true" />
            </Button>
          }
        >
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${resume.name}`}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            View
          </a>

          <a
            href={resume.fileUrl}
            download
            aria-label={`Download ${resume.name}`}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </a>

          <button
            type="button"
            onClick={() => onRename(resume)}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Rename
          </button>

          <button
            type="button"
            onClick={() => onDelete(resume)}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </button>
        </Dropdown>
      </div>
    </article>
  );
}
