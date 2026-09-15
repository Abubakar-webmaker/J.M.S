import type { ReactNode } from 'react';

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

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
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}

          {required && (
            <span
              aria-hidden="true"
              className="ml-1 text-red-500"
            >
              *
            </span>
          )}
        </label>
      )}

      {children}

      {error && (
        <p className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}

      {!error && hint && (
        <p className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}