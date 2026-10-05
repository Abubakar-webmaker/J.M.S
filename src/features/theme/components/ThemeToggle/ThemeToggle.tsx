import { Moon, Sun } from 'lucide-react';

import { Tooltip } from '@/components/ui';

import { useTheme } from '../../hooks/useTheme';

/**
 * Theme Toggle
 *
 * Compact icon button that switches between light and dark themes.
 * Designed for the app header, matching the surrounding icon-button style.
 * The sun/moon icons cross-fade via transform + opacity for a polished feel.
 */
export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <Tooltip content={label}>
      <button
        type="button"
        onClick={toggleTheme}
        className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        aria-label={label}
        aria-pressed={isDark}
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <Sun
            className={[
              'absolute h-5 w-5 transition-all duration-300',
              isDark
                ? 'rotate-90 scale-0 opacity-0'
                : 'rotate-0 scale-100 opacity-100',
            ].join(' ')}
            strokeWidth={2}
            aria-hidden="true"
          />
          <Moon
            className={[
              'absolute h-5 w-5 transition-all duration-300',
              isDark
                ? 'rotate-0 scale-100 opacity-100'
                : '-rotate-90 scale-0 opacity-0',
            ].join(' ')}
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      </button>
    </Tooltip>
  );
}
