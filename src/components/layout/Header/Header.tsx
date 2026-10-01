import { Menu, Bell, Search } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { UserMenu } from '../UserMenu/UserMenu';

interface HeaderProps {
  onMenuClick: () => void;
}

/**
 * Page titles mapped from routes
 * Used to display consistent page context in header
 */
const PAGE_TITLES: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/applications': 'Applications',
  '/app/applications/new': 'Add Application',
  '/app/resumes': 'Resumes',
  '/app/profile': 'Profile',
  '/app/change-password': 'Change Password',
};

/**
 * Professional Header Component
 * 
 * Displays:
 * - Mobile menu button (hidden on desktop)
 * - Page title / breadcrumb context
 * - Search input (desktop only)
 * - Notifications bell with badge
 * - User menu with avatar and dropdown
 * 
 * Fixed height: 64px (h-16)
 * Sticky positioning at top
 * Professional styling with subtle border
 */
export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get page title from current route
  const title = PAGE_TITLES[location.pathname] ?? 'Job Manager';

  // Placeholder notification count
  const unreadNotifications = 3;

  return (
    <header 
      className="sticky top-0 z-30 h-16 border-b border-neutral-200 bg-white"
      role="banner"
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left: Mobile menu button + page title */}
        <div className="flex min-w-0 items-center gap-4">
          {/* Mobile menu button - only visible on mobile */}
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={false}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Page title */}
          <h1 className="truncate text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
            {title}
          </h1>
        </div>

        {/* Center: Search (desktop only) */}
        <div className="hidden flex-1 max-w-md md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 placeholder-neutral-500 transition-all hover:border-neutral-300 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
              aria-label="Search applications"
            />
          </div>
        </div>

        {/* Right: Notifications + User menu */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Notifications button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              
              {/* Notification badge */}
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger-500 text-xs font-bold text-white">
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
                <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-neutral-200 bg-white shadow-lg">
                  {/* Header */}
                  <div className="border-b border-neutral-100 px-4 py-3">
                    <h2 className="text-sm font-semibold text-neutral-900">Notifications</h2>
                  </div>

                  {/* Notification list */}
                  <div className="max-h-96 divide-y divide-neutral-100 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-neutral-50 cursor-pointer transition-colors">
                      <p className="text-sm font-medium text-neutral-900">New application received</p>
                      <p className="text-xs text-neutral-600 mt-1">Your application for Senior Developer at Acme Corp has been received</p>
                      <p className="text-xs text-neutral-500 mt-2">5 minutes ago</p>
                    </div>

                    <div className="px-4 py-3 hover:bg-neutral-50 cursor-pointer transition-colors">
                      <p className="text-sm font-medium text-neutral-900">Interview scheduled</p>
                      <p className="text-xs text-neutral-600 mt-1">Your interview for Product Manager role is scheduled for tomorrow at 2:00 PM</p>
                      <p className="text-xs text-neutral-500 mt-2">1 hour ago</p>
                    </div>

                    <div className="px-4 py-3 hover:bg-neutral-50 cursor-pointer transition-colors">
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
