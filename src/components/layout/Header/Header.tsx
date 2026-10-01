import { Menu } from 'lucide-react';
import { useLocation } from 'react-router';

import { UserMenu } from '../UserMenu/UserMenu';

interface HeaderProps {
  onMenuClick: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/applications': 'Applications',
  '/app/resumes': 'Resumes',
  '/app/profile': 'Profile',
  '/app/change-password': 'Change Password',
};

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();

  const title = PAGE_TITLES[location.pathname] ?? 'Job Tracker';

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-neutral-100 bg-white/95 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={false}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <h2 className="truncate text-base font-semibold tracking-tight text-neutral-900 sm:text-lg">
            {title}
          </h2>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}
