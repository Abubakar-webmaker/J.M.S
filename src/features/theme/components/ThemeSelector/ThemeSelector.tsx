import { Moon, Sun } from 'lucide-react';
import type { ComponentType } from 'react';

import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../context/ThemeContext';

interface ThemeOption {
  value: Theme;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'light',
    label: 'Light',
    description: 'Bright and clean',
    icon: Sun,
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Easy on the eyes',
    icon: Moon,
  },
];

/**
 * Theme Selector
 *
 * Segmented control for choosing between light and dark themes.
 * Accessible via a radiogroup with roving selection semantics.
 */
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme preference"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(option.value)}
            className={[
              'flex items-start gap-3 rounded-lg border p-4 text-left transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              isActive
                ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                : 'border-neutral-200 bg-surface hover:border-neutral-300 hover:bg-neutral-100',
            ].join(' ')}
          >
            <span
              className={[
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
                isActive
                  ? 'bg-primary-600 text-white dark:text-neutral-900'
                  : 'bg-neutral-100 text-neutral-600',
              ].join(' ')}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </span>

            <span className="min-w-0">
              <span className="block text-sm font-semibold text-neutral-900">
                {option.label}
              </span>
              <span className="mt-0.5 block text-xs text-neutral-500">
                {option.description}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
