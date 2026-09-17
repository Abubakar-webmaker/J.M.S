import { createContext } from 'react';

export interface ToastItem {
  id: number;
  title: string;
  message?: string;
  variant: 'success' | 'error' | 'warning' | 'info';
}

export interface ToastContextValue {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(
  null,
);
