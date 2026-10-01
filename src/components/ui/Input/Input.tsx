import { forwardRef, type ReactNode } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  required?: boolean;
}

/**
 * Professional Input Component
 * 
 * Features:
 * - Consistent sizing (h-10)
 * - Rounded corners (rounded-lg)
 * - Subtle borders
 * - Error states
 * - Optional icons
 * - Accessibility support
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', leftIcon, required = false, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-xs font-semibold text-neutral-900 sm:text-sm"
          >
            {label}
            {required && (
              <span aria-hidden="true" className="ml-1 text-danger-600">
                *
              </span>
            )}
          </label>
        )}

        <div className={leftIcon ? 'relative' : undefined}>
          {leftIcon && (
            <span
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            className={[
              'h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-neutral-900',
              'placeholder:text-neutral-500',
              'transition-all duration-200',
              'focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100',
              'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500',
              leftIcon ? 'pl-9' : '',
              error
                ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100'
                : 'border-neutral-300 hover:border-neutral-400 focus:border-primary-600',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-xs font-medium text-danger-600"
          >
            {error}
          </p>
        )}

        {!error && hint && (
          <p
            id={`${inputId}-hint`}
            className="mt-1.5 text-xs text-neutral-600"
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
