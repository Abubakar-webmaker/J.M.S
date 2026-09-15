export interface FieldError {
  field: string;
  message: string;
}

export class AppApiError extends Error {
  readonly status: number | null;
  readonly fieldErrors: FieldError[];

  constructor(
    message: string,
    status: number | null = null,
    fieldErrors: FieldError[] = [],
  ) {
    super(message);
    this.name = 'AppApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}
