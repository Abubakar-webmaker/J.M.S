import { forwardRef, type ReactNode } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'link';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

/**
 * Button Variants
 * 
 * primary: Main actions, green background
 * secondary: Secondary actions, neutral background
 * outline: Tertiary actions, border only
 * ghost: Minimal, text only with hover background
 * danger: Destructive actions, red background
 * link: Text link style
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 hover:shadow-md',

  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300',

  outline:
    'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 shadow-sm',

  ghost:
    'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200',

  danger:
    'bg-danger-600 text-white shadow-sm hover:bg-danger-700 active:bg-danger-800 hover:shadow-md',

  link: 'text-primary-600 hover:text-primary-700 hover:underline',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

/**
 * Professional Button Component
 * 
 * Variants:
 * - primary: main CTAs (green)
 * - secondary: secondary actions (gray)
 * - outline: tertiary (bordered)
 * - ghost: minimal (no background)
 * - danger: destructive (red)
 * - link: text only
 * 
 * Sizes:
 * - sm: 32px height
 * - md: 40px height (default)
 * - lg: 48px height
 * 
 * Features:
 * - Loading state with spinner
 * - Icon support (left/right)
 * - Full width option
 * - Disabled state
 */
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
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={[
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? 'w-full' : '',
        ]
          .filter(Boolean)
          .join(' ')}
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
