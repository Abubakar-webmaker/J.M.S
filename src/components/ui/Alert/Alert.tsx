import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { type ReactNode, useState } from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  closable?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  children?: ReactNode;
}

const variantConfig: Record<
  AlertVariant,
  {
    bg: string;
    border: string;
    title: string;
    description: string;
    icon: ReactNode;
  }
> = {
  success: {
    bg: 'bg-success-50',
    border: 'border-success-200',
    title: 'text-success-900',
    description: 'text-success-700',
    icon: <CheckCircle className="h-5 w-5 text-success-600" strokeWidth={2} />,
  },
  error: {
    bg: 'bg-danger-50',
    border: 'border-danger-200',
    title: 'text-danger-900',
    description: 'text-danger-700',
    icon: <AlertCircle className="h-5 w-5 text-danger-600" strokeWidth={2} />,
  },
  warning: {
    bg: 'bg-warning-50',
    border: 'border-warning-200',
    title: 'text-warning-900',
    description: 'text-warning-700',
    icon: (
      <AlertTriangle className="h-5 w-5 text-warning-600" strokeWidth={2} />
    ),
  },
  info: {
    bg: 'bg-info-50',
    border: 'border-info-200',
    title: 'text-info-900',
    description: 'text-info-700',
    icon: <Info className="h-5 w-5 text-info-600" strokeWidth={2} />,
  },
};

/**
 * Professional Alert Component
 * 
 * Features:
 * - Multiple variants (success, error, warning, info)
 * - Icon support
 * - Closable alerts
 * - Flexible content with title/description or children
 * - Accessibility support
 */
export function Alert({
  variant = 'info',
  title,
  description,
  closable = false,
  onClose,
  icon,
  children,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const config = variantConfig[variant];

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const roleMap: Record<AlertVariant, string> = {
    success: 'status',
    error: 'alert',
    warning: 'alert',
    info: 'status',
  };

  return (
    <div
      role={roleMap[variant]}
      className={`flex gap-3 rounded-lg border ${config.bg} ${config.border} p-4`}
    >
      {/* Icon */}
      <div className="shrink-0 pt-0.5" aria-hidden="true">
        {icon || config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={`text-sm font-semibold ${config.title}`}>{title}</p>
        )}

        {description && (
          <p className={`text-sm ${config.description} ${title ? 'mt-1' : ''}`}>
            {description}
          </p>
        )}

        {children && (
          <div className={`text-sm ${config.description} ${title ? 'mt-1' : ''}`}>
            {children}
          </div>
        )}
      </div>

      {/* Close button */}
      {closable && (
        <button
          type="button"
          onClick={handleClose}
          className="shrink-0 rounded p-0.5 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600"
          aria-label="Close alert"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
