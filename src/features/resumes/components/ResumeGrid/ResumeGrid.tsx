import type { Resume } from '@/features/resumes/types';

import { ResumeCard } from '@/features/resumes/components/ResumeCard/ResumeCard';
import { ResumeListSkeleton } from '@/features/resumes/components/ResumeListSkeleton/ResumeListSkeleton';

interface ResumeGridProps {
  resumes: Resume[];
  onRename: (resume: Resume) => void;
  onDelete: (resume: Resume) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ResumeGrid({
  resumes,
  onRename,
  onDelete,
  isLoading = false,
  disabled = false,
}: ResumeGridProps) {
  if (isLoading) {
    return <ResumeListSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          onRename={onRename}
          onDelete={onDelete}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
