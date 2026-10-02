import { forwardRef, useState, type ReactNode } from 'react';
import type { InputHTMLAttributes } from 'react';
import {
  Eye,
  EyeOff,
} from 'lucide-react';

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  leftIcon?: ReactNode;
}

/**
 * Professional Password Input Component
 * 
 * Features:
 * - Show/hide password toggle
 * - Consistent sizing (h-10)
 * - Error states
 * - Optional icons
 * - Accessibility support
 */
export const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      label,
      error,
      hint,
      id,
      className = '',
      required = false,
      leftIcon,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

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

        <div className={leftIcon ? 'relative' : 'relative'}>
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
            type={visible ? 'text' : 'password'}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            className={[
              'h-10 w-full rounded-lg border bg-surface px-3 py-2 text-sm text-neutral-900',
              'placeholder:text-neutral-500',
              'transition-all duration-200',
              'focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100',
              'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500',
              leftIcon ? 'pl-9' : '',
              'pr-11',
              error
                ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100'
                : 'border-neutral-300 hover:border-neutral-400 focus:border-primary-600',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />

          <button
            type="button"
            aria-label={
              visible
                ? 'Hide password'
                : 'Show password'
            }
            onClick={() => setVisible((current) => !current)}
            className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-neutral-400 transition-colors hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
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

PasswordInput.displayName = 'PasswordInput';