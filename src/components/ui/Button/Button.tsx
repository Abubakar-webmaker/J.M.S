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

const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200 hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50';

const variantStyles: Record<ButtonVariant, { className: string; style: CSSProperties }> = {
  primary: {
    className:
      'bg-primary-600 text-white shadow-md hover:bg-primary-700 hover:shadow-glow focus-visible:ring-primary-500 dark:bg-primary-600 dark:text-neutral-900 dark:hover:bg-primary-500',
    style: {},
  },
  secondary: {
    className:
      'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-primary-400',
    style: {},
  },
  outline: {
    className:
      'border border-neutral-300 text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400 focus-visible:ring-primary-400',
    style: {},
  },
  ghost: {
    className:
      'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-primary-400',
    style: {},
  },
  danger: {
    className:
      'bg-danger-600 text-white shadow-md hover:bg-danger-700 focus-visible:ring-danger-500',
    style: {},
  },
  link: {
    className: 'text-primary-600 hover:underline focus-visible:ring-primary-400',
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
