import { forwardRef, useState } from 'react';
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
}

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
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
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
              'min-h-10 w-full rounded-lg border bg-white px-3 py-2 pr-11',
              'text-sm text-slate-900 placeholder:text-slate-400',
              'transition-colors duration-200',
              'focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100',
              'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-300',
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
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
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
            className="mt-1.5 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {!error && hint && (
          <p
            id={`${inputId}-hint`}
            className="mt-1.5 text-sm text-slate-500"
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';