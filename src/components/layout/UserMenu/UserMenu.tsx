import { ChevronDown, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Avatar } from '@/components/ui';

interface UserMenuProps {
  name?: string;
  email?: string;
  onLogout?: () => void;
}

export function UserMenu({
  name = 'User',
  email = 'user@example.com',
  onLogout,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        aria-expanded={open}
        aria-haspopup="menu"
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
          <button
            type="button"
            aria-label="Close user menu"
            className="fixed inset-0 z-dropdown cursor-default"
            onClick={() => setOpen(false)}
          />

          <div
            className="absolute right-0 top-full z-dropdown mt-2 w-56 rounded-xl border border-border bg-surface p-1 shadow-lg"
            role="menu"
          >
            <div className="border-b border-border px-3 py-2">
              <p className="truncate text-sm font-medium text-text">
                {name}
              </p>
              <p className="truncate text-xs text-text-muted">
                {email}
              </p>
            </div>

            <a
              href="/app/profile"
              role="menuitem"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              onClick={() => setOpen(false)}
            >
              <User className="h-4 w-4" aria-hidden="true" />
              Profile
            </a>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onLogout?.();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger-600 transition-colors hover:bg-danger-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}