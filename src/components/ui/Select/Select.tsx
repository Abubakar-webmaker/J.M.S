import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, id, className = '', children, ...props }, ref) => {
    const selectId = id ?? props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-2 block text-sm font-medium text-neutral-900"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error
                ? `${selectId}-error`
                : hint
                  ? `${selectId}-hint`
                  : undefined
            }
            className={[
              'min-h-10 w-full appearance-none rounded-lg border bg-white',
              'px-3 py-2 pr-10 text-sm text-neutral-900',
              'transition-all duration-200',
              'focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500',
              error
                ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100'
                : 'border-neutral-300',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          >
            {children}
          </select>

          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
          />
        </div>

        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-2 text-sm text-danger-600"
          >
            {error}
          </p>
        )}

        {!error && hint && (
          <p
            id={`${selectId}-hint`}
            className="mt-2 text-sm text-neutral-600"
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';