import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface OtpInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  length?: number;
  required?: boolean;
}

/**
 * OTP Input Component
 *
 * A centred, spaced-out single-field input for entering a numeric
 * one-time code. Uses `inputMode="numeric"` for mobile keypads and
 * `autoComplete="one-time-code"` for OS/browser autofill.
 */
export const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(
  (
    {
      label,
      error,
      hint,
      id,
      length = 6,
      className = '',
      required = false,
      ...props
    },
    ref,
  ) => {
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

        <input
          ref={ref}
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={length}
          placeholder={'0'.repeat(length)}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${inputId}-error`
              : hint
                ? `${inputId}-hint`
                : undefined
          }
          className={[
            'h-12 w-full rounded-lg border bg-white px-3 py-2 text-center text-lg font-semibold',
            'tracking-[0.5em] text-neutral-900 placeholder:tracking-[0.5em] placeholder:text-neutral-400',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2',
            'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500',
            error
              ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100'
              : 'border-neutral-300 hover:border-neutral-400 focus:border-primary-600 focus:ring-primary-100',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

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

OtpInput.displayName = 'OtpInput';
