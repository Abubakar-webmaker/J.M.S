import type { HTMLAttributes } from 'react';

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageContainer({
  children,
  className = '',
  ...props
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}