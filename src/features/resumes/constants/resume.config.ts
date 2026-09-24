export const RESUME_FILE_RULES = {
  maxSizeBytes: 10 * 1024 * 1024,
  maxSizeLabel: '10 MB',

  allowedMimeTypes: [
    'application/pdf',
  ] as const,

  allowedExtensions: ['.pdf'] as const,

  maxDisplayNameLength: 150,

  maxFileNameLength: 255,
} as const;

export const RESUME_UPLOAD_CONFIG = {
  timeoutMs: 120_000,
} as const;

export const RESUME_LIST_DEFAULTS = {
  page: 1,
  limit: 20,
} as const;

export const RESUME_NAME_RULES = {
  minLength: 1,
  maxLength: 150,
} as const;

export const RESUME_ERROR_MESSAGES = {
  invalidType: 'Only PDF files are supported.',
  tooLarge: `Resume must be ${RESUME_FILE_RULES.maxSizeLabel} or smaller.`,
  emptyFile: 'The selected file is empty.',
  missingFile: 'Please select a resume file.',
  invalidName: 'Please enter a valid resume name.',
  nameTooLong: `Resume name must be ${RESUME_NAME_RULES.maxLength} characters or less.`,
  fileNameTooLong: `Filename must be ${RESUME_FILE_RULES.maxFileNameLength} characters or less.`,
} as const;

export const DEFAULT_RESUME_FORM_VALUES = {
  name: '',
  file: undefined,
};
