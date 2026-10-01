import { ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Avatar } from '@/components/ui';
import { useAuth } from '@/features/auth/context/useAuth';

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const name = user?.name ?? 'User';
  const email = user?.email ?? '';

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setOpen(false);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open user menu"
      >
        <Avatar name={name} size="sm" />

        <div className="hidden text-left sm:block">
          <p className="max-w-[120px] truncate text-sm font-semibold text-neutral-900">
            {name}
          </p>
          <p className="max-w-[120px] truncate text-xs text-neutral-600">
            {email}
          </p>
        </div>

        <ChevronDown
          className={`hidden h-4 w-4 text-neutral-600 transition-transform duration-200 sm:block ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <>
          {/* Invisible backdrop to close on outside click */}
          <button
            type="button"
            aria-label="Close user menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div
            className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-neutral-200 bg-surface shadow-xl shadow-black/10 ring-1 ring-black/5"
            role="menu"
            aria-label="User menu"
          >
            {/* User info */}
            <div className="border-b border-neutral-100 px-4 py-3">
              <p className="truncate text-sm font-semibold text-neutral-900">{name}</p>
              <p className="truncate text-xs text-neutral-600 mt-1">{email}</p>
            </div>

            {/* Logout */}
            <div className="p-2">
              <button
                type="button"
                role="menuitem"
                disabled={isLoggingOut}
                aria-busy={isLoggingOut}
                onClick={() => void handleLogout()}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-danger-600 transition-colors hover:bg-danger-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 disabled:pointer-events-none disabled:opacity-50"
              >
                <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>{isLoggingOut ? 'Signing out…' : 'Sign out'}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
