import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { useOnlineStatus } from '@/hooks/useOnlineStatus';

import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

/**
 * Professional SaaS Application Shell
 * 
 * Desktop layout:
 * ┌─────────┬─────────────────────┐
 * │ Sidebar │ Header              │
 * ├─────────┼─────────────────────┤
 * │         │ Main Content        │
 * │         │                     │
 * └─────────┴─────────────────────┘
 * 
 * Mobile layout:
 * ┌─────────────────────┐
 * │ Header (menu icon)  │
 * ├─────────────────────┤
 * │ Main Content        │
 * │                     │
 * └─────────────────────┘
 * 
 * Sidebar drawer on mobile when menu opened
 */
export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOnline = useOnlineStatus();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Offline banner - always at top */}
      {!isOnline && (
        <div
          role="status"
          aria-live="polite"
          className="border-b border-warning-200 bg-warning-50 px-4 py-3 text-center text-sm font-medium text-warning-800"
        >
          You're offline. Some actions may not work until your connection is restored.
        </div>
      )}

      {/* Main app container */}
      <div className="flex h-screen flex-col lg:flex-row">
        {/* Desktop Sidebar - hidden on mobile, flex on desktop */}
        <Sidebar />

        {/* Mobile navigation drawer - overlay on mobile, hidden on desktop */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <button
              type="button"
              className="absolute inset-0 bg-black/50 transition-opacity"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="false"
            />

            {/* Sidebar drawer */}
            <div className="relative z-50 h-full animate-drawer-in">
              <Sidebar
                mobile
                onClose={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main content area - takes up remaining space */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Header - fixed height, contains title and user menu */}
          <Header onMenuClick={() => setMobileMenuOpen(true)} />

          {/* Content area - scrollable, flexible height */}
          <main className="min-w-0 flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
