import { Menu, Bell, Search } from 'lucide-react';
import { useState } from 'react';

import { UserMenu } from '../UserMenu/UserMenu';

interface HeaderProps {
  onMenuClick: () => void;
}

/**
 * Professional Header Component
 *
 * Displays:
 * - Mobile menu button (hidden on desktop)
 * - Search input (expands from the left, desktop only)
 * - Notifications bell with badge
 * - User menu with avatar and dropdown
 *
 * Fixed height: 64px (h-16), aligned vertically with the logo.
 * Sticky positioning at top with a subtle border.
 */
export function Header({ onMenuClick }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder notification count
  const unreadNotifications = 3;

  return (
    <header 
      className="sticky top-0 z-30 h-16 border-b border-neutral-200 bg-surface"
      role="banner"
    >
      <div className="flex h-full items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        {/* Left: Mobile menu button (hidden on desktop) */}
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 lg:hidden"
          aria-label="Open navigation menu"
          aria-expanded={false}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Left-aligned, wide search (desktop only) */}
        <div className="hidden min-w-0 flex-1 md:block">
          <div className="relative w-full max-w-xl">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-neutral-200 bg-surface pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-500 transition-all hover:border-neutral-300 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
              aria-label="Search applications"
            />
          </div>
        </div>

        {/* Right: Notifications + User menu (pushed to the end) */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Notifications button */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden="true" />

              {/* Notification badge — offset outward so it never covers the bell */}
              {unreadNotifications > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-surface">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {notificationsOpen && (
              <>
                {/* Backdrop */}
                <button
                  type="button"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setNotificationsOpen(false)}
                  aria-label="Close notifications"
                />

                {/* Dropdown menu */}
                <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-neutral-200 bg-surface shadow-lg">
                  {/* Header */}
                  <div className="border-b border-neutral-100 px-4 py-3">
                    <h2 className="text-sm font-semibold text-neutral-900">Notifications</h2>
                  </div>

                  {/* Notification list */}
                  <div className="max-h-96 divide-y divide-neutral-100 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-neutral-100 cursor-pointer transition-colors">
                      <p className="text-sm font-medium text-neutral-900">New application received</p>
                      <p className="text-xs text-neutral-600 mt-1">Your application for Senior Developer at Acme Corp has been received</p>
                      <p className="text-xs text-neutral-500 mt-2">5 minutes ago</p>
                    </div>

                    <div className="px-4 py-3 hover:bg-neutral-100 cursor-pointer transition-colors">
                      <p className="text-sm font-medium text-neutral-900">Interview scheduled</p>
                      <p className="text-xs text-neutral-600 mt-1">Your interview for Product Manager role is scheduled for tomorrow at 2:00 PM</p>
                      <p className="text-xs text-neutral-500 mt-2">1 hour ago</p>
                    </div>

                    <div className="px-4 py-3 hover:bg-neutral-100 cursor-pointer transition-colors">
                      <p className="text-sm font-medium text-neutral-900">Application status updated</p>
                      <p className="text-xs text-neutral-600 mt-1">Your application status has been updated to "Under Review"</p>
                      <p className="text-xs text-neutral-500 mt-2">3 hours ago</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-neutral-100 px-4 py-3 text-center">
                    <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
