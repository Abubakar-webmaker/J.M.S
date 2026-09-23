import type { Resume } from '@/features/resumes/types';

export function isResumeReferenced(
  resume: Resume | null | undefined,
): boolean {
  return Boolean(
    resume?.applicationCount &&
      resume.applicationCount > 0,
  );
}

export function getResumeDeleteMessage(
  resume: Resume | null | undefined,
): string {
  if (isResumeReferenced(resume)) {
    const count = resume?.applicationCount ?? 0;

    return `This resume is currently associated with ${count} application${
      count === 1 ? '' : 's'
    }.`;
  }

  return 'This resume will be permanently deleted.';
}