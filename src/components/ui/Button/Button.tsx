import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50';

const variantStyles: Record<ButtonVariant, { className: string; style: CSSProperties }> = {
  primary: {
    className: 'text-white shadow-md hover:shadow-lg',
    style: { backgroundColor: '#16a34a' },
  },
  secondary: {
    className: 'text-neutral-900 hover:bg-neutral-200',
    style: { backgroundColor: '#f3f4f6' },
  },
  outline: {
    className: 'border-2 border-neutral-300 text-neutral-900 hover:bg-neutral-50',
    style: {},
  },
  ghost: {
    className: 'text-neutral-700 hover:bg-neutral-100',
    style: {},
  },
  danger: {
    className: 'text-white shadow-md hover:shadow-lg',
    style: { backgroundColor: '#dc2626' },
  },
  link: {
    className: 'text-primary-600 hover:underline',
    style: {},
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-12 px-6 text-base font-semibold',
  lg: 'h-14 px-8 text-lg font-bold',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      type = 'button',
      style,
      className = '',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const variantConfig = variantStyles[variant];
    const mergedStyle: CSSProperties = {
      ...variantConfig.style,
      ...style,
    };

    const finalClassName = [
      baseClasses,
      variantConfig.className,
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        style={mergedStyle}
        className={finalClassName}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon && (
            <span className="shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}

        <span>{children}</span>

        {!loading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
