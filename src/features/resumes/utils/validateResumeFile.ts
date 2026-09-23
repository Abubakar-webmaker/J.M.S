import {
  RESUME_ERROR_MESSAGES,
  RESUME_FILE_RULES,
} from '@/features/resumes/constants';

export interface ResumeFileValidationResult {
  valid: boolean;
  message?: string;
}

export function validateResumeFile(
  file?: File | null,
): ResumeFileValidationResult {
  if (!file) {
    return {
      valid: false,
      message: RESUME_ERROR_MESSAGES.missingFile,
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      message: RESUME_ERROR_MESSAGES.emptyFile,
    };
  }

  if (file.size > RESUME_FILE_RULES.maxSizeBytes) {
    return {
      valid: false,
      message: RESUME_ERROR_MESSAGES.tooLarge,
    };
  }

  const extension = file.name
    .slice(file.name.lastIndexOf('.'))
    .toLowerCase();

  const validMimeType =
    RESUME_FILE_RULES.allowedMimeTypes.includes(
      file.type as (typeof RESUME_FILE_RULES.allowedMimeTypes)[number],
    );

  const validExtension =
    RESUME_FILE_RULES.allowedExtensions.includes(
      extension as (typeof RESUME_FILE_RULES.allowedExtensions)[number],
    );

  if (!validMimeType || !validExtension) {
    return {
      valid: false,
      message: RESUME_ERROR_MESSAGES.invalidType,
    };
  }

  if (
    file.name.length >
    RESUME_FILE_RULES.maxFileNameLength
  ) {
    return {
      valid: false,
      message: RESUME_ERROR_MESSAGES.fileNameTooLong,
    };
  }

  return {
    valid: true,
  };
}