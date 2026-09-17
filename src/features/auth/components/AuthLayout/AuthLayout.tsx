import type { ReactNode } from 'react';
import { Link } from 'react-router';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:flex sm:items-center sm:justify-center">
      <section className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            to="/login"
            className="inline-block text-2xl font-bold tracking-tight text-primary-600"
          >
            JobTracker
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-md sm:p-8">
          {(title || subtitle) && (
            <div className="mb-6 space-y-1">
              {title && (
                <h1 className="text-2xl font-semibold tracking-tight text-text">
                  {title}
                </h1>
              )}

              {subtitle && (
                <p className="text-sm leading-6 text-text-muted">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {children}
        </div>
      </section>
    </main>
  );
}