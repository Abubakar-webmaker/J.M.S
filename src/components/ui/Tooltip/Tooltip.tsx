import type { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export function Tooltip({
  content,
  children,
}: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}

      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-[700] mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-md group-hover:block group-focus-within:block"
      >
        {content}
      </span>
    </span>
  );
}