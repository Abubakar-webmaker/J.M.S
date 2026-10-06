import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../../hooks/useTheme';

/**
 * Theme Toggle Switch
 *
 * Settings-panel switch for light/dark. Renders as an accessible switch
 * with sun/moon icons and a sliding thumb, styled to match the app's
 * surface tokens in both themes.
 */
export function ThemeToggleSwitch() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-neutral-900">
          Dark mode
        </p>
        <p className="mt-0.5 text-sm text-neutral-500">
          {isDark ? 'Easy on the eyes' : 'Bright and clean'}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle dark mode"
        onClick={toggleTheme}
        className={[
          'group relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          isDark
            ? 'border-primary-600 bg-primary-600'
            : 'border-neutral-300 bg-neutral-200',
        ].join(' ')}
      >
        {/* Decorative inline icons */}
        <Sun
          className={[
            'absolute left-1.5 h-4 w-4 transition-opacity',
            isDark ? 'text-white opacity-40' : 'opacity-0',
          ].join(' ')}
          aria-hidden="true"
        />
        <Moon
          className={[
            'absolute right-1.5 h-4 w-4 transition-opacity',
            isDark ? 'opacity-0' : 'text-neutral-600 opacity-60',
          ].join(' ')}
          aria-hidden="true"
        />

        {/* Sliding thumb */}
        <span
          className={[
            'relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200',
            isDark ? 'translate-x-7' : 'translate-x-1',
          ].join(' ')}
        >
          {isDark ? (
            <Moon className="h-3.5 w-3.5 text-primary-700" aria-hidden="true" />
          ) : (
            <Sun className="h-3.5 w-3.5 text-warning-600" aria-hidden="true" />
          )}
        </span>
      </button>
    </div>
  );
}
