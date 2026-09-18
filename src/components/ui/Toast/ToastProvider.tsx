import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { Toast } from './Toast';
import { ToastContext, type ToastItem } from './ToastContext';

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({
  children,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = Date.now();

      setToasts((current) => [
        ...current,
        { ...toast, id },
      ]);

      window.setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast],
  );

  const value = useMemo(
    () => ({ showToast }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-[600] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            message={toast.message}
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
