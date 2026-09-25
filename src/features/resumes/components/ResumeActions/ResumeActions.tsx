import {
  Download,
  ExternalLink,
  MoreVertical,
  Pencil,
} from 'lucide-react';

import { Button, Dropdown } from '@/components/ui';
import type { Resume } from '@/features/resumes/types';

interface ResumeActionsProps {
  resume: Resume;
  onRename: (resume: Resume) => void;
  disabled?: boolean;
}

export function ResumeActions({
  resume,
  onRename,
  disabled = false,
}: ResumeActionsProps) {
  return (
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
          <MoreVertical
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Button>
      }
    >
      <a
        href={resume.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 text-sm text-text hover:bg-neutral-50"
      >
        <ExternalLink
          className="h-4 w-4"
          aria-hidden="true"
        />
        View
      </a>

      <a
        href={resume.fileUrl}
        download
        className="flex items-center gap-2 px-3 py-2 text-sm text-text hover:bg-neutral-50"
      >
        <Download
          className="h-4 w-4"
          aria-hidden="true"
        />
        Download
      </a>

      <button
        type="button"
        onClick={() => onRename(resume)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-text hover:bg-neutral-50"
      >
        <Pencil
          className="h-4 w-4"
          aria-hidden="true"
        />
        Rename
      </button>
    </Dropdown>
  );
}