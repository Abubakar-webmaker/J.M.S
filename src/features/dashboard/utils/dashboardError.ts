import { AppApiError } from '@/types/api';

export function getDashboardErrorMessage(
  error: AppApiError | null,
): string {
  if (!error) return 'Something went wrong. Please try again.';

  switch (error.status) {
    case null:
      // Network / timeout errors come through with null status
      if (error.message.toLowerCase().includes('took too long')) {
        return 'The dashboard request took too long. Please try again.';
      }
      return 'Please check your internet connection and try again.';

    case 403:
      return "You don't have permission to view dashboard data.";

    case 429:
      return 'Too many requests. Please wait a moment and try again.';

    case 503:
      return 'Dashboard service is temporarily unavailable.';

    case 500:
    case 502:
    case 504:
      return 'Something went wrong on the server.';

    default:
      return error.message || 'Something went wrong. Please try again.';
  }
}
