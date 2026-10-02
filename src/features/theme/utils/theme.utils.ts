import {
  DEFAULT_THEME,
  LEGACY_THEME_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from '../constants/theme.constants';
import type { ResolvedTheme, Theme } from '../context/ThemeContext';

const VALID_THEMES: readonly Theme[] = ['light', 'dark'];

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && VALID_THEMES.includes(value as Theme);
}

/**
 * Read the persisted theme preference.
 *
 * Returns a valid `Theme`; falls back to `DEFAULT_THEME` when the stored
 * value is missing or malformed. Migrates the legacy v1 key (which may
 * contain `system`) by resolving `system` against the OS preference once.
 */
export function readStoredTheme(): Theme {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (isTheme(stored)) {
      return stored;
    }

    // One-time migration from the v1 schema.
    const legacy = window.localStorage.getItem(LEGACY_THEME_STORAGE_KEY);

    if (legacy === 'light' || legacy === 'dark') {
      return legacy;
    }

    if (legacy === 'system') {
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    return DEFAULT_THEME;
  } catch {
    // localStorage can throw in private-mode / sandboxed iframes.
    return DEFAULT_THEME;
  }
}

export function persistTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Non-fatal: theme still applies for the current session.
  }
}

/**
 * Resolve a preference into a concrete theme.
 *
 * With the `system` option removed, the preference is already concrete;
 * this helper is retained for API symmetry.
 */
export function resolveTheme(theme: Theme): ResolvedTheme {
  return theme;
}

/**
 * Apply the resolved theme to the document root.
 *
 * Adds/removes the `dark` class and keeps `color-scheme` in sync so native
 * UI (scrollbars, form controls) matches the theme.
 */
export function applyThemeToDocument(resolved: ResolvedTheme): void {
  const root = document.documentElement;

  root.classList.toggle('dark', resolved === 'dark');
  root.style.colorScheme = resolved;
}
