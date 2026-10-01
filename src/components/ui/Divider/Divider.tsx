import type { ReactNode } from 'react';

interface DividerProps {
  text?: string;
  className?: string;
}

/**
 * Divider Component
 * 
 * Features:
 * - Optional centered text
 * - Clean horizontal line with text overlay
 * - Fully customizable
 */
export function Divider({ text, className = '' }: DividerProps) {
  if (!text) {
    return (
      <div className={`h-px bg-neutral-300 ${className}`} />
    );
  }

  return (
    <div className={`relative flex items-center gap-3 sm:gap-4 ${className}`}>
      <div className="flex-1 h-px bg-neutral-300" />
      <span className="text-xs sm:text-sm font-medium text-neutral-600 px-2 whitespace-nowrap">
        {text}
      </span>
      <div className="flex-1 h-px bg-neutral-300" />
    </div>
  );
}
