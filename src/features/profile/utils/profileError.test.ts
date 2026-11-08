import { describe, expect, it } from 'vitest';

import { AppApiError } from '@/types/api';

import { isIncorrectCurrentPassword } from './profileError';

describe('isIncorrectCurrentPassword', () => {
  it('identifies an incorrect current password response', () => {
    expect(
      isIncorrectCurrentPassword(
        new AppApiError('Current password is incorrect', 400),
      ),
    ).toBe(true);
  });

  it('does not identify other bad requests as an incorrect password', () => {
    expect(
      isIncorrectCurrentPassword(
        new AppApiError('New password must be at least 8 characters long', 400),
      ),
    ).toBe(false);
  });

  it('does not identify an unauthorized session as an incorrect password', () => {
    expect(
      isIncorrectCurrentPassword(
        new AppApiError('Unauthorized', 401),
      ),
    ).toBe(false);
  });
});
