import axios, { isAxiosError } from 'axios';

import { AppApiError, type FieldError } from '@/types/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new AppApiError(
          'The request took too long. Please try again.',
        );
      }

      if (!error.response) {
        throw new AppApiError(
          'Unable to connect to the server. Please check your connection.',
        );
      }

      const { status, data } = error.response;
      const message: string =
        data?.message ?? 'Something went wrong. Please try again.';
      const fieldErrors: FieldError[] = data?.errors ?? [];

      throw new AppApiError(message, status, fieldErrors);
    }

    throw error;
  },
);

export default api;
