/**
 * Format an ISO date string using the user's locale.
 * Defaults to { dateStyle: 'medium' } (e.g. "Sep 28, 2026").
 */
export function formatDate(
  value: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(undefined, options ?? { dateStyle: 'medium' }).format(
    new Date(value),
  );
}

/**
 * Format an ISO date string as both date + time.
 * e.g. "Sep 28, 2026, 10:30 AM"
 */
export function formatDateTime(value: string): string {
  return formatDate(value, { dateStyle: 'medium', timeStyle: 'short' });
}
