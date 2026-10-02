import { createContext } from 'react';

export type Theme = 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
  /** User-selected preference: light | dark */
  theme: Theme;
  /** The actual applied theme (identical to `theme`) */
  resolvedTheme: ResolvedTheme;
  /** Update the preference (persists to localStorage + DOM) */
  setTheme: (theme: Theme) => void;
  /** Convenience toggle between light and dark */
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
