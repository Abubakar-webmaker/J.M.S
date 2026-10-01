import type { ReactNode } from 'react';
import { Link } from 'react-router';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  illustration?: string;
}

/**
 * Professional Authentication Layout
 * 
 * Split screen design:
 * - Left: Form section with logo, title, and form content
 * - Right: Visual panel with illustration image (desktop only)
 * 
 * Desktop: Side-by-side layout
 * Mobile: Stacked, form centered
 */
export function AuthLayout({
  children,
  title,
  subtitle,
  illustration,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Main container */}
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left side: Form section */}
        <div className="flex w-full flex-col items-center justify-center px-4 py-8 sm:px-6 lg:w-1/2 lg:px-12">
          <div className="w-full max-w-md">
            {/* Logo/Brand */}
            <Link
              to="/login"
              className="mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
            >
              <img 
                src="/favicon.svg" 
                alt="JobManager" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-neutral-900">
                JobManager
              </span>
            </Link>

            {/* Form Card */}
            <div className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
              {/* Title & Subtitle */}
              {(title || subtitle) && (
                <div className="mb-8 space-y-2">
                  {title && (
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                      {title}
                    </h1>
                  )}

                  {subtitle && (
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {subtitle}
                    </p>
                  )}
                </div>
              )}

              {/* Form Content */}
              {children}
            </div>

            {/* Footer text */}
            <p className="mt-6 text-center text-sm text-neutral-600">
              © 2024 JobManager. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right side: Visual panel with illustration (desktop only) */}
        {illustration && (
          <div className="hidden flex-col items-center justify-center bg-gradient-to-b from-primary-600 to-primary-700 px-12 py-8 lg:flex lg:w-1/2">
            <img
              src={illustration}
              alt="Illustration"
              className="max-w-full h-auto object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}