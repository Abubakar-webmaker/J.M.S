import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

/**
 * Professional Textarea Component
 * 
 * Features:
 * - Resizable (vertical only)
 * - Min height: 96px (min-h-24)
 * - Consistent with Input styling
 * - Error and hint text
 * - Accessibility support
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = '', required = false, ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-semibold text-neutral-900"
          >
            {label}
            {required && (
              <span aria-hidden="true" className="ml-1 text-danger-600">
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : hint
                ? `${textareaId}-hint`
                : undefined
          }
          className={[
            'min-h-24 w-full resize-y rounded-lg border bg-surface px-3 py-2',
            'text-sm text-neutral-900 placeholder:text-neutral-500',
            'transition-all duration-200',
            'focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100',
            'hover:border-neutral-400',
            'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500',
            error
              ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100'
              : 'border-neutral-300',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-2 text-sm font-medium text-danger-600"
          >
            {error}
          </p>
        )}

        {!error && hint && (
          <p
            id={`${textareaId}-hint`}
            className="mt-2 text-sm text-neutral-600"
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';