import { useRef, useState } from 'react';
import type {
  ChangeEvent,
  ClipboardEvent,
  FocusEvent,
  KeyboardEvent,
} from 'react';

interface OtpInputProps {
  label?: string;
  error?: string;
  hint?: string;
  length?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  /** Field name — used as the id prefix for accessibility wiring. */
  name: string;
  /** Current value (combined digits) for controlled usage. */
  value?: string;
  /** Change handler receiving the combined digits string. */
  onChange?: (value: string) => void;
  /** Blur handler (RHF integration). */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

/**
 * OTP Input Component
 *
 * Renders one box per digit with auto-advance, backspace navigation and
 * paste support. Designed to be driven by a controlled `value` string —
 * pair it with react-hook-form's `Controller` for composite field handling.
 */
export function OtpInput({
  label,
  error,
  hint,
  length = 6,
  required = false,
  disabled = false,
  className = '',
  name,
  value,
  onChange,
  onBlur,
}: OtpInputProps) {
  const inputId = name;

  const [internalDigits, setInternalDigits] = useState<string[]>(() =>
    Array.from({ length }, (_, i) => value?.[i] ?? ''),
  );

  // Keep internal state in sync when used as an uncontrolled component.
  const digits =
    value !== undefined
      ? Array.from({ length }, (_, i) => value[i] ?? '')
      : internalDigits;

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const commit = (next: string[]) => {
    if (value === undefined) setInternalDigits(next);
    onChange?.(next.join(''));
  };

  const focusIndex = (index: number) => {
    const target = Math.max(0, Math.min(index, length - 1));
    inputsRef.current[target]?.focus();
    inputsRef.current[target]?.select();
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');

    if (!raw) {
      const next = [...digits];
      next[index] = '';
      commit(next);
      return;
    }

    const next = [...digits];

    // Support typing/pasting multiple digits into a single box.
    for (let i = 0; i < raw.length && index + i < length; i += 1) {
      next[index + i] = raw[i];
    }

    commit(next);
    focusIndex(index + raw.length);
  };

  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = [...digits];
        next[index] = '';
        commit(next);
      } else if (index > 0) {
        const next = [...digits];
        next[index - 1] = '';
        commit(next);
        focusIndex(index - 1);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      focusIndex(index - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      focusIndex(index + 1);
      e.preventDefault();
    }
  };

  const handlePaste = (
    index: number,
    e: ClipboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length - index);

    if (!pasted) return;

    const next = [...digits];
    for (let i = 0; i < pasted.length; i += 1) {
      next[index + i] = pasted[i];
    }

    commit(next);
    focusIndex(index + pasted.length);
  };

  const boxClasses = [
    'h-12 w-11 rounded-lg border bg-surface text-center text-lg font-semibold',
    'text-neutral-900 caret-primary-600',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2',
    'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500',
    error
      ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100'
      : 'border-neutral-300 hover:border-neutral-400 focus:border-primary-600 focus:ring-primary-100',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="w-full">
      {label && (
        <span className="mb-1 block text-xs font-semibold text-neutral-900 sm:text-sm">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-1 text-danger-600">
              *
            </span>
          )}
        </span>
      )}

      <div
        className={`flex justify-center gap-2 sm:gap-2.5 ${className}`.trim()}
        role="group"
        aria-label={label ?? 'One-time code'}
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            onFocus={(e) => e.target.select()}
            onBlur={onBlur}
            className={boxClasses}
          />
        ))}
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-center text-xs font-medium text-danger-600"
        >
          {error}
        </p>
      )}

      {!error && hint && (
        <p
          id={`${inputId}-hint`}
          className="mt-1.5 text-center text-xs text-neutral-600"
        >
          {hint}
        </p>
      )}
    </div>
  );
}

