import type { ResumeListParams } from '@/features/resumes/types';

/**
 * Builds a clean query-param object from ResumeListParams.
 * Omits undefined values and empty strings so Axios doesn't
 * append empty keys to the URL.
 */
export function buildResumeParams(
  params?: ResumeListParams,
): Record<string, string | number> {
  if (!params) {
    return {};
  }

  const result: Record<string, string | number> = {};

  if (params.search?.trim()) {
    result.search = params.search.trim();
  }

  if (params.page !== undefined && params.page > 0) {
    result.page = params.page;
  }

  if (params.limit !== undefined && params.limit > 0) {
    result.limit = params.limit;
  }

  return result;
}
