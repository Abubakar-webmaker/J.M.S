import type { ApplicationListParams } from '@/features/applications/types';

export function buildApplicationParams(
  params: ApplicationListParams = {},
): Record<string, string | number> {
  const result: Record<string, string | number> = {};

  if (params.search?.trim()) {
    result.search = params.search.trim();
  }

  if (params.status) {
    result.status = params.status;
  }

  if (params.location?.trim()) {
    result.location = params.location.trim();
  }

  if (params.jobType) {
    result.jobType = params.jobType;
  }

  if (params.applicationDateFrom) {
    result.applicationDateFrom = params.applicationDateFrom;
  }

  if (params.applicationDateTo) {
    result.applicationDateTo = params.applicationDateTo;
  }

  if (params.page !== undefined) {
    result.page = params.page;
  }

  if (params.limit !== undefined) {
    result.limit = params.limit;
  }

  return result;
}