import { FileQuestion } from 'lucide-react';
import { Link } from 'react-router';

import { useAuth } from '@/features/auth/context/useAuth';

export function NotFoundPage() {
  const { isAuthenticated } = useAuth();
  const destination = isAuthenticated ? '/app/dashboard' : '/login';
  const ctaLabel = isAuthenticated ? 'Go to dashboard' : 'Go to login';

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50"
          aria-hidden="true"
        >
          <FileQuestion className="h-7 w-7 text-primary-600" />
        </div>

        <p className="mt-6 text-sm font-medium text-primary-600">404</p>

        <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-6">
          <Link
            to={destination}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 active:bg-primary-800"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
