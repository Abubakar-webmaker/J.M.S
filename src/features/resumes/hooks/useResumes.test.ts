import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { AppApiError } from '@/types/api';

import { useResumes } from './useResumes';

const getResumes = vi.fn();

vi.mock('@/features/resumes/services', () => ({
  resumeService: {
    getResumes: (...args: unknown[]) => getResumes(...args),
  },
}));

beforeEach(() => {
  getResumes.mockReset();
});

describe('useResumes', () => {
  it('stores resumes and pagination on a successful load', async () => {
    getResumes.mockResolvedValue({
      data: [{ id: 'res-1', name: 'My Resume' }],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
    });

    const { result } = renderHook(() => useResumes());

    await act(async () => {
      await result.current.fetchResumes();
    });

    expect(result.current.resumes).toHaveLength(1);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('ignores a CanceledError by name without setting an error', async () => {
    const canceled = new Error('canceled');
    canceled.name = 'CanceledError';
    getResumes.mockRejectedValue(canceled);

    const { result } = renderHook(() => useResumes());

    await act(async () => {
      await result.current.fetchResumes();
    });

    expect(result.current.error).toBeNull();
  });

  it('ignores an ERR_CANCELED rejection by code without setting an error', async () => {
    getResumes.mockRejectedValue({ code: 'ERR_CANCELED', message: 'canceled' });

    const { result } = renderHook(() => useResumes());

    await act(async () => {
      await result.current.fetchResumes();
    });

    expect(result.current.error).toBeNull();
  });

  it('normalizes an unexpected failure into an AppApiError', async () => {
    getResumes.mockRejectedValue(new Error('kaboom'));

    const { result } = renderHook(() => useResumes());

    await act(async () => {
      await result.current.fetchResumes();
    });

    expect(result.current.error).toBeInstanceOf(AppApiError);
    expect(result.current.error?.message).toBe(
      'Unable to load resumes. Please try again.',
    );
  });
});
