import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  applyThemeToDocument,
  persistTheme,
  readStoredTheme,
} from '../utils/theme.utils';
import { ThemeContext } from './ThemeContext';
import type { ResolvedTheme, Theme } from './ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme Provider
 *
 * Owns the theme preference (light | dark), persists it to localStorage,
 * and keeps the DOM (`html.dark` class + `color-scheme`) in sync.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme());

  const resolvedTheme: ResolvedTheme = theme;

  // Keep the document in sync whenever the theme changes.
  useEffect(() => {
    applyThemeToDocument(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    persistTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      persistTheme(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
