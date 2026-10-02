import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

/**
 * Access the theme preference and resolved theme.
 * Must be used within a `ThemeProvider`.
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return context;
}
