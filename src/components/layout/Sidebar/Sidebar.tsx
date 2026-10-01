import { BriefcaseBusiness, X } from 'lucide-react';
import { NavLink } from 'react-router';
import {
  ACCOUNT_NAVIGATION,
  MAIN_NAVIGATION,
} from '@/constants/navigation';

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  mobile = false,
  onClose,
}: SidebarProps) {
  return (
    <aside
      className={
        mobile
          ? 'flex h-full w-72 flex-col bg-white'
          : 'hidden h-screen w-64 shrink-0 border-r border-neutral-100 bg-white lg:flex'
      }
    >
      <div className="flex h-16 items-center justify-between border-b border-neutral-100 px-5">
        <a
          href="/app/dashboard"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-lg"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
            <BriefcaseBusiness
              className="h-5 w-5"
              aria-hidden="true"
            />
          </span>

          <span className="text-base font-bold tracking-tight text-neutral-900">
            JobTracker
          </span>
        </a>

        {mobile && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <nav
        className="flex-1 overflow-y-auto px-3 py-5"
        aria-label="Main navigation"
      >
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-600">
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
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive
                          ? 'text-primary-600'
                          : 'text-neutral-600'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="my-6 border-t border-neutral-100" />

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Account
        </p>

        <div className="space-y-1">
          {ACCOUNT_NAVIGATION.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive
                          ? 'text-primary-600'
                          : 'text-neutral-600'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-neutral-100 p-4">
        <div className="rounded-lg bg-neutral-50 px-3 py-2.5">
          <p className="text-xs font-semibold text-neutral-900">
            JobTracker
          </p>
          <p className="mt-1 text-xs text-neutral-600">
            V1
          </p>
        </div>
      </div>
    </aside>
  );
}