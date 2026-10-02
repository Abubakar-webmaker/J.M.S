/**
 * Theme system constants.
 *
 * The storage key is versioned (`-v2`) to migrate cleanly from the previous
 * `light | dark | system` schema (v1).
 */
export const THEME_STORAGE_KEY = 'jobmanager-theme-v2';

export const LEGACY_THEME_STORAGE_KEY = 'jobmanager-theme-v1';

export const DEFAULT_THEME = 'light' as const;
