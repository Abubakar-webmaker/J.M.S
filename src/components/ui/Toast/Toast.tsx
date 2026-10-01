import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  AlertTriangle,
} from 'lucide-react';

export type ToastVariant =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

interface ToastProps {
  title: string;
  message?: string;
  variant?: ToastVariant;
  onClose: () => void;
}

const variantStyles = {
  success: {
    icon: CheckCircle2,
    iconClass: 'text-success-600',
  },
  error: {
    icon: AlertCircle,
    iconClass: 'text-danger-600',
  },
  warning: {
    icon: AlertTriangle,
    iconClass: 'text-amber-600',
  },
  info: {
    icon: Info,
    iconClass: 'text-blue-600',
  },
};

export function Toast({
  title,
  message,
  variant = 'info',
  onClose,
}: ToastProps) {
  const config = variantStyles[variant];
  const Icon = config.icon;

  return (
    <div
      role="status"
      className="pointer-events-auto flex w-full max-w-sm gap-3 rounded-lg border border-neutral-200 bg-surface p-4 shadow-lg"
    >
      <Icon
        aria-hidden="true"
        className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconClass}`}
      />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-neutral-900">
          {title}
        </p>

        {message && (
          <p className="mt-1 text-sm text-neutral-500">
            {message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="h-7 w-7 shrink-0 rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
      >
        <X className="mx-auto h-4 w-4" />
      </button>
    </div>
  );
}