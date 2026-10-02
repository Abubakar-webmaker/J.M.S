import axios, { isAxiosError } from 'axios';

import { AppApiError, type FieldError } from '@/types/api';

import { isAuthEndpoint } from './authEndpoints';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Only set Content-Type: application/json when the request body is NOT FormData.
// For FormData (file uploads) we let Axios set the multipart/form-data boundary automatically.
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

// Guard to prevent multiple simultaneous 401 events from spamming navigation
let isHandlingSessionExpiry = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      // Request was aborted (component unmount, param change, or React
      // StrictMode double-invoke). Re-throw untouched so callers can
      // detect and ignore it — do NOT convert to a "connection" error.
      if (error.code === 'ERR_CANCELED') {
        throw error;
      }

      // Timeout
      if (error.code === 'ECONNABORTED') {
        throw new AppApiError(
          'The request took too long. Please try again.',
        );
      }

      // No response — network error
      if (!error.response) {
        throw new AppApiError(
          'Unable to connect to the server. Please check your connection.',
        );
      }

      const { status, data } = error.response;
      const message: string =
        data?.message ?? 'Something went wrong. Please try again.';
      const fieldErrors: FieldError[] = data?.errors ?? [];

      // 401 on a non-auth endpoint = session expired
      // Emit a custom DOM event so AuthProvider can react once (no direct
      // navigate() call here — this file has no access to React Router).
      if (status === 401 && !isAuthEndpoint(error.config?.url)) {
        if (!isHandlingSessionExpiry) {
          isHandlingSessionExpiry = true;
          window.dispatchEvent(new CustomEvent('auth:session-expired'));
          // Reset the guard after a short delay so it can fire again on
          // a subsequent session (e.g. user logs back in and out again).
          window.setTimeout(() => {
            isHandlingSessionExpiry = false;
          }, 5_000);
        }
      }

      throw new AppApiError(message, status, fieldErrors);
    }

    throw error;
  },
);

export default api;
