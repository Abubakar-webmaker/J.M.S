import type { ReactNode } from 'react';
import { Link } from 'react-router';
import logo from '@/assets/logo.png';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  illustration?: string;
}

/**
 * Professional, fully responsive Authentication Layout
 *
 * Layout strategy by breakpoint:
 * - Mobile  (<640px):  Single column. Form fills width, vertical scroll only
 *                      when content overflows; safe-area aware padding.
 * - Tablet  (640-1023px): Single column, wider gutters, larger card padding,
 *                          illustration shown as a subtle backdrop is skipped
 *                          to preserve usable form space.
 * - Desktop (>=1024px): Split-screen. Form on the left (max 480px),
 *                       illustration on the right on a soft gradient.
 *
 * Uses `min-h-dvh` + flex auto-margins so the content is centered when it fits
 * and scrolls gracefully when it doesn't (small phones, keyboards, zoom).
 */
export function AuthLayout({
  children,
  title,
  subtitle,
  illustration,
}: AuthLayoutProps) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-gradient-to-br from-neutral-50 via-neutral-50 to-primary-50 lg:flex-row">
      {/* Left side: Form section */}
      <div
        className="flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden px-4 py-3 sm:px-6 sm:py-4 lg:w-1/2 lg:px-10 xl:px-14"
        style={{
          paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        }}
      >
        <div className="flex w-full max-w-md flex-col lg:max-w-[26rem]">
          {/* Logo/Brand */}
          <Link
            to="/login"
            className="mb-2.5 inline-flex shrink-0 items-center self-center rounded-lg px-2 py-1 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 lg:self-start"
            aria-label="JobManager home"
          >
            <img
              src={logo}
              alt="JobManager"
              className="h-8 w-auto object-contain sm:h-9"
              width={2172}
              height={724}
            />
          </Link>

          {/* Form Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg shadow-neutral-900/5 sm:p-6">
            {/* Title & Subtitle */}
            {(title || subtitle) && (
              <div className="mb-3 space-y-1 sm:mb-4">
                {title && (
                  <h1 className="text-lg font-bold tracking-tight text-neutral-900 sm:text-xl">
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <p className="text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Form Content */}
            {children}
          </div>
        </div>
      </div>

      {/* Right side: Illustration (desktop only) */}
      {illustration && (
        <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-neutral-50 to-neutral-100 lg:flex lg:w-1/2 lg:px-10 xl:px-16">
          {/* Decorative soft blobs for depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-100/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl"
          />

          <img
            src={illustration}
            alt=""
            aria-hidden="true"
            className="relative z-10 max-h-[70vh] w-auto max-w-full object-contain drop-shadow-sm xl:max-h-[78vh]"
          />
        </div>
      )}
    </div>
  );
}