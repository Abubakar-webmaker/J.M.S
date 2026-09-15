import axios from 'axios';

import { AppApiError } from '@/types/api';

interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: { field: string; message: string }[];
}

type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'NETWORK_ERROR'
  | 'TIMEOUT'
  | 'UNKNOWN';

function getErrorCode(status?: number): ApiErrorCode {
  switch (status) {
    case 400: return 'BAD_REQUEST';
    case 401: return 'UNAUTHORIZED';
    case 403: return 'FORBIDDEN';
    case 404: return 'NOT_FOUND';
    case 409: return 'CONFLICT';
    case 422: return 'VALIDATION_ERROR';
    case 429: return 'RATE_LIMITED';
    case 500: return 'SERVER_ERROR';
    case 503: return 'SERVICE_UNAVAILABLE';
    default:  return 'UNKNOWN';
  }
}

function getDefaultMessage(code: ApiErrorCode): string {
  switch (code) {
    case 'BAD_REQUEST':          return 'The request could not be processed.';
    case 'UNAUTHORIZED':         return 'Your session is invalid or has expired.';
    case 'FORBIDDEN':            return 'You do not have permission to perform this action.';
    case 'NOT_FOUND':            return 'The requested resource could not be found.';
    case 'CONFLICT':             return 'This request conflicts with existing data.';
    case 'VALIDATION_ERROR':     return 'Please check the information you entered.';
    case 'RATE_LIMITED':         return 'Too many requests. Please try again later.';
    case 'SERVER_ERROR':         return 'Something went wrong on the server.';
    case 'SERVICE_UNAVAILABLE':  return 'The service is temporarily unavailable.';
    case 'NETWORK_ERROR':        return 'Unable to connect to the server. Please check your connection.';
    case 'TIMEOUT':              return 'The request took too long. Please try again.';
    default:                     return 'Something went wrong. Please try again.';
  }
}

export function normalizeApiError(error: unknown): AppApiError {
  if (error instanceof AppApiError) return error;

  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) return new AppApiError(error.message);
    return new AppApiError('Something went wrong. Please try again.');
  }

  if (error.code === 'ECONNABORTED') {
    return new AppApiError(getDefaultMessage('TIMEOUT'));
  }

  if (!error.response) {
    return new AppApiError(getDefaultMessage('NETWORK_ERROR'));
  }

  const { status, data } = error.response as { status: number; data: ApiErrorResponse | undefined };
  const code = getErrorCode(status);
  const message = data?.message ?? data?.error ?? getDefaultMessage(code);

  return new AppApiError(message, status, data?.errors ?? []);
}
