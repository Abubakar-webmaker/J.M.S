import { describe, expect, it } from 'vitest';

import { buildApplicationParams } from './applicationParams';
import { hasInvalidDateRange } from './applicationFilters';

describe('buildApplicationParams', () => {
  it('returns an empty object for no params', () => {
    expect(buildApplicationParams()).toEqual({});
  });

  it('trims search and location', () => {
    expect(
      buildApplicationParams({ search: '  Microsoft  ', location: ' Remote ' }),
    ).toEqual({ search: 'Microsoft', location: 'Remote' });
  });

  it('omits blank string filters', () => {
    expect(buildApplicationParams({ search: '   ', location: '' })).toEqual({});
  });

  it('passes through status, jobType, dates, and pagination', () => {
    expect(
      buildApplicationParams({
        status: 'Interview',
        jobType: 'Full-time',
        applicationDateFrom: '2026-01-01',
        applicationDateTo: '2026-12-31',
        page: 2,
        limit: 10,
      }),
    ).toEqual({
      status: 'Interview',
      jobType: 'Full-time',
      applicationDateFrom: '2026-01-01',
      applicationDateTo: '2026-12-31',
      page: 2,
      limit: 10,
    });
  });
});

describe('hasInvalidDateRange', () => {
  it('is false when either bound is missing', () => {
    expect(hasInvalidDateRange({ applicationDateFrom: '2026-01-01' })).toBe(false);
    expect(hasInvalidDateRange({ applicationDateTo: '2026-12-31' })).toBe(false);
    expect(hasInvalidDateRange({})).toBe(false);
  });

  it('is false when from <= to', () => {
    expect(
      hasInvalidDateRange({
        applicationDateFrom: '2026-01-01',
        applicationDateTo: '2026-12-31',
      }),
    ).toBe(false);
  });

  it('is true when from > to', () => {
    expect(
      hasInvalidDateRange({
        applicationDateFrom: '2026-12-31',
        applicationDateTo: '2026-01-01',
      }),
    ).toBe(true);
  });
});
