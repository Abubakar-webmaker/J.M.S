import { ChevronDown, KeyRound, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

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
        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open user menu"
      >
        <Avatar name={name} size="sm" />

        <div className="hidden text-left sm:block">
          <p className="max-w-[140px] truncate text-sm font-medium text-text">
            {name}
          </p>
          <p className="max-w-[140px] truncate text-xs text-text-muted">
            {email}
          </p>
        </div>

        <ChevronDown
          className={`hidden h-4 w-4 text-text-muted transition-transform sm:block ${
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
            className="fixed inset-0 z-dropdown cursor-default"
            onClick={() => setOpen(false)}
          />

          <div
            className="absolute right-0 top-full z-dropdown mt-2 w-56 rounded-xl border border-border bg-surface p-1 shadow-lg"
            role="menu"
            aria-label="User menu"
          >
            {/* User info */}
            <div className="border-b border-border px-3 py-2">
              <p className="truncate text-sm font-medium text-text">{name}</p>
              <p className="truncate text-xs text-text-muted">{email}</p>
            </div>

            {/* Profile link */}
            <Link
              to="/app/profile"
              role="menuitem"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              onClick={() => setOpen(false)}
            >
              <User className="h-4 w-4" aria-hidden="true" />
              Profile
            </Link>

            {/* Change password link */}
            <Link
              to="/app/change-password"
              role="menuitem"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              onClick={() => setOpen(false)}
            >
              <KeyRound className="h-4 w-4" aria-hidden="true" />
              Change Password
            </Link>

            {/* Logout */}
            <button
              type="button"
              role="menuitem"
              disabled={isLoggingOut}
              aria-busy={isLoggingOut}
              onClick={() => void handleLogout()}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {isLoggingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
