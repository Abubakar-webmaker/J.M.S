import { useEffect } from 'react';

interface UseUnsavedChangesOptions {
  isDirty: boolean;
  /** Set to false to disable the hook (e.g. after a successful save) */
  enabled?: boolean;
}

/**
 * Warns the user before closing / refreshing the browser tab when there are
 * unsaved form changes.  Client-side navigation blocking is handled separately
 * by each form (react-router v6 does not expose a stable route blocker API in
 * the Data Router API-less setup this project uses, so we rely on beforeunload
 * for the browser-close case and let individual forms handle Cancel UX).
 */
export function useUnsavedChanges({
  isDirty,
  enabled = true,
}: UseUnsavedChangesOptions): void {
  useEffect(() => {
    if (!enabled || !isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // Modern browsers show their own generic message; returnValue is kept for
      // legacy browser compat.
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty, enabled]);
}
