import type { ReactNode } from 'react';

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * Form Field Wrapper Component
 * 
 * Provides consistent styling for form labels, inputs, errors, and hints
 * 
 * Features:
 * - Consistent spacing
 * - Required indicator
 * - Error and hint text
 * - Accessibility attributes
 */
export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-2 block text-sm font-semibold text-neutral-900"
        >
          {label}

          {required && (
            <span
              aria-hidden="true"
              className="ml-1 text-danger-600"
            >
              *
            </span>
          )}
        </label>
      )}

      {children}

      {error && (
        <p className="mt-2 text-sm font-medium text-danger-600">
          {error}
        </p>
      )}

      {!error && hint && (
        <p className="mt-2 text-sm text-neutral-600">
          {hint}
        </p>
      )}
    </div>
  );
}