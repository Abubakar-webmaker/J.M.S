import { describe, expect, it } from 'vitest';
import { AxiosError, AxiosHeaders } from 'axios';

import { AppApiError } from '@/types/api';
import api from './api';

/** Pull the response interceptor's rejected handler off the axios instance. */
function rejectHandler() {
  const handlers = (
    api.interceptors.response as unknown as {
      handlers: Array<{ rejected: (error: unknown) => unknown }>;
    }
  ).handlers;
  return handlers[handlers.length - 1].rejected;
}

function axiosError(config: {
  code?: string;
  status?: number;
  data?: unknown;
  url?: string;
}) {
  const headers = new AxiosHeaders();
  const error = new AxiosError(
    'boom',
    config.code,
    { url: config.url, headers },
    undefined,
    config.status !== undefined
      ? {
          status: config.status,
          statusText: 'x',
          headers,
          config: { url: config.url, headers },
          data: config.data,
        }
      : undefined,
  );
  if (config.code) error.code = config.code;
  return error;
}

describe('api response interceptor', () => {
  it('re-throws ERR_CANCELED untouched instead of masking it as a connection error', () => {
    const canceled = axiosError({ code: 'ERR_CANCELED', url: '/resumes' });

    let thrown: unknown;
    try {
      rejectHandler()(canceled);
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBe(canceled);
    expect((thrown as { code?: string }).code).toBe('ERR_CANCELED');
    expect(thrown).not.toBeInstanceOf(AppApiError);
  });

  it('converts a genuine no-response network failure to AppApiError', () => {
    const networkError = axiosError({ url: '/resumes' });

    expect(() => rejectHandler()(networkError)).toThrowError(AppApiError);
    expect(() => rejectHandler()(networkError)).toThrowError(
      'Unable to connect to the server. Please check your connection.',
    );
  });

  it('converts a timeout to a friendly AppApiError', () => {
    const timeout = axiosError({ code: 'ECONNABORTED', url: '/resumes' });

    expect(() => rejectHandler()(timeout)).toThrowError(
      'The request took too long. Please try again.',
    );
  });

  it('surfaces the server message and field errors for an HTTP error', () => {
    const serverError = axiosError({
      status: 400,
      url: '/applications',
      data: {
        message: 'Validation failed.',
        errors: [{ field: 'companyName', message: 'Required' }],
      },
    });

    try {
      rejectHandler()(serverError);
      throw new Error('expected interceptor to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(AppApiError);
      const appError = error as AppApiError;
      expect(appError.message).toBe('Validation failed.');
      expect(appError.status).toBe(400);
      expect(appError.fieldErrors).toEqual([
        { field: 'companyName', message: 'Required' },
      ]);
    }
  });
});
