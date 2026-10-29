import type { ApplicationListParams } from '@/features/applications/types';
import { toBackendJobType } from '@/constants/job';
import { toBackendApplicationStatus } from '@/constants/application';

export function buildApplicationParams(
  params: ApplicationListParams = {},
): Record<string, string | number> {
  const result: Record<string, string | number> = {};

  if (params.search?.trim()) {
    result.search = params.search.trim();
  }

  if (params.status) {
    // Convert frontend status (e.g., "Applied") to backend format (e.g., "APPLIED")
    result.status = toBackendApplicationStatus(params.status);
  }

  if (params.location?.trim()) {
    result.location = params.location.trim();
  }

  if (params.jobType) {
    // Convert frontend jobType (e.g., "Full-time") to backend format (e.g., "FULL_TIME")
    result.jobType = toBackendJobType(params.jobType);
  }

  // Backend expects 'fromDate' and 'toDate', not 'applicationDateFrom' and 'applicationDateTo'
  if (params.applicationDateFrom) {
    result.fromDate = params.applicationDateFrom;
  }

  if (params.applicationDateTo) {
    result.toDate = params.applicationDateTo;
  }

  if (params.page !== undefined) {
    result.page = params.page;
  }

  if (params.limit !== undefined) {
    result.limit = params.limit;
  }

  return result;
}