import type { HTMLAttributes } from 'react';

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Page Container - Wraps main page content
 * 
 * Provides:
 * - Responsive padding
 * - Max width constraint for readability
 * - Consistent vertical spacing
 * 
 * Breakpoints:
 * - Mobile: px-4, py-6
 * - Tablet: px-6
 * - Desktop: px-8
 */
export function PageContainer({
  children,
  className = '',
  ...props
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}