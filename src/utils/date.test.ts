import { describe, expect, it } from 'vitest';

import { formatCurrency } from './currency';
import { formatDate, formatDateTime } from './date';

describe('formatDate', () => {
  it('formats an ISO string with the medium date style by default', () => {
    expect(formatDate('2026-09-28T10:30:00.000Z')).toMatch(/Sep 2[78], 2026/);
  });

  it('honours a custom options object', () => {
    expect(formatDate('2026-09-28T00:00:00.000Z', { year: 'numeric' })).toBe(
      '2026',
    );
  });
});

describe('formatDateTime', () => {
  it('includes both the date and the time', () => {
    const result = formatDateTime('2026-09-28T10:30:00.000Z');
    expect(result).toMatch(/Sep 2[78], 2026/);
    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });
});

describe('formatCurrency', () => {
  it('formats a whole amount with no decimal places', () => {
    expect(formatCurrency(85000)).toBe('$85,000');
  });

  it('supports a custom currency', () => {
    expect(formatCurrency(1200, 'EUR')).toContain('1,200');
  });
});
