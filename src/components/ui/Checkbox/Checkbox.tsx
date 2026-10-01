import { forwardRef, type InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Professional Checkbox Component
 * 
 * Features:
 * - Accessible with proper labels
 * - Custom styled with green theme
 * - Error states
 * - Helper text support
 * - Responsive sizing
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, error, helperText, className, disabled, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={checkboxId}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="relative flex h-5 w-5 shrink-0">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              disabled={disabled}
              className={`peer h-full w-full cursor-pointer appearance-none rounded border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 ${
                error
                  ? 'border-danger-500 hover:border-danger-600'
                  : 'border-neutral-300 hover:border-neutral-400 checked:border-primary-600 checked:bg-primary-600'
              } ${disabled ? 'cursor-not-allowed opacity-50 bg-neutral-100' : ''} ${className || ''}`}
              {...props}
            />

            {/* Checkmark icon */}
            <Check
              className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
              strokeWidth={3}
              aria-hidden="true"
            />
          </div>

          {label && (
            <span
              className={`text-sm font-medium ${
                error
                  ? 'text-danger-600'
                  : disabled
                    ? 'text-neutral-500'
                    : 'text-neutral-900'
              }`}
            >
              {label}
            </span>
          )}
        </label>

        {error && <p className="text-xs font-medium text-danger-600">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-neutral-600">{helperText}</p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
