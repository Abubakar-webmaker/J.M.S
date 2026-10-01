import { Settings, X } from 'lucide-react';
import { NavLink } from 'react-router';

import logo from '@/assets/logo.png';
import { MAIN_NAVIGATION } from '@/constants/navigation';

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

/**
 * Professional Sidebar Navigation
 * 
 * Desktop:
 * - Always visible on the left
 * - Width: 256px (w-64)
 * - Shows full navigation
 * 
 * Mobile:
 * - Drawer overlay
 * - Width: 288px (w-72)
 * - Close button in header
 * 
 * Structure:
 * - Brand/Logo section (60px height, h-15)
 * - Main navigation
 * - Divider
 * - Account navigation
 * - App version footer
 */
export function Sidebar({
  mobile = false,
  onClose,
}: SidebarProps) {
  return (
    <aside
      className={
        mobile
          ? 'flex w-72 flex-col border-r border-neutral-200 bg-surface'
          : 'hidden w-64 shrink-0 flex-col border-r border-neutral-200 bg-surface lg:flex'
      }
    >
      {/* Brand section - fixed height */}
      <div className="flex h-18 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
        <a
          href="/app/dashboard"
          className="flex min-w-0 flex-1 items-center rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          aria-label="JobManager home"
        >
          {/* Brand logo */}
          <img
            src={logo}
            alt="JobManager"
            className="h-11 w-auto max-w-full object-contain sm:h-12"
            width={2172}
            height={724}
          />
        </a>

        {/* Mobile close button */}
        {mobile && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Navigation sections - scrollable */}
      <nav
        className="flex-1 overflow-y-auto px-2 py-4"
        aria-label="Main navigation"
      >
        {/* Main navigation section */}
        <div>
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-neutral-600">
            Workspace
          </p>

          <div className="space-y-1">
            {MAIN_NAVIGATION.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`h-5 w-5 shrink-0 transition-colors ${
                          isActive
                            ? 'text-primary-600'
                            : 'text-neutral-600'
                        }`}
                        aria-hidden="true"
                        strokeWidth={2}
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

      </nav>

      {/* Footer section - pinned Settings item */}
      <div className="border-t border-neutral-200 px-2 py-3">
        <NavLink
          to="/app/settings"
          end
          onClick={onClose}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              <Settings
                className={`h-5 w-5 shrink-0 transition-colors ${
                  isActive ? 'text-primary-600' : 'text-neutral-600'
                }`}
                aria-hidden="true"
                strokeWidth={2}
              />
              <span>Settings</span>
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
}