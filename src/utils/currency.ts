/**
 * Format a numeric amount as currency.
 * Defaults to USD with no decimal places (e.g. "$85,000").
 */
export function formatCurrency(
  amount: number,
  currency = 'USD',
): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
