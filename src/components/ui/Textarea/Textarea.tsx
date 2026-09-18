import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            {label}
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
            'min-h-24 w-full resize-y rounded-lg border bg-white px-3 py-2',
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

        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {!error && hint && (
          <p
            id={`${textareaId}-hint`}
            className="mt-1.5 text-sm text-slate-500"
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';