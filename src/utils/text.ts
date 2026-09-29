/**
 * Trims a string and returns empty string for null / undefined.
 * Use only for display purposes — do not mutate server data.
 */
export function normalizeText(value?: string | null): string {
  return value?.trim() ?? '';
}

/**
 * Truncates a string to `maxLength` characters and appends "…" if truncated.
 */
export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}…`;
}
