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
          ? 'flex h-full w-72 flex-col bg-surface'
          : 'hidden h-screen w-64 shrink-0 border-r border-border bg-surface lg:flex'
      }
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-5">
        <a
          href="/app/dashboard"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
            <BriefcaseBusiness
              className="h-5 w-5"
              aria-hidden="true"
            />
          </span>

          <span className="text-lg font-bold tracking-tight text-text">
            JobTracker
          </span>
        </a>

        {mobile && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:bg-neutral-100 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
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
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
          Workspace
        </p>

        <div className="space-y-1">
          {MAIN_NAVIGATION.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-text-secondary hover:bg-neutral-100 hover:text-text',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive
                          ? 'text-primary-600'
                          : 'text-text-muted'
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

        <div className="my-6 border-t border-border" />

        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
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
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-text-secondary hover:bg-neutral-100 hover:text-text',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive
                          ? 'text-primary-600'
                          : 'text-text-muted'
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

      <div className="border-t border-border p-4">
        <div className="rounded-lg bg-neutral-50 p-3">
          <p className="text-xs font-medium text-text">
            JobTracker
          </p>
          <p className="mt-0.5 text-xs text-text-muted">
            V1
          </p>
        </div>
      </div>
    </aside>
  );
}