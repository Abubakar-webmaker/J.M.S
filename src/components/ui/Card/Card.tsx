import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  variant?: 'default' | 'elevated';
}

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const variantStyles = {
  default: 'border border-neutral-200 shadow-sm hover:shadow-card',
  elevated: 'shadow-md hover:shadow-lg',
};

/**
 * Professional Card Component
 * 
 * Provides consistent container styling for content
 * 
 * Variants:
 * - default: bordered with subtle shadow
 * - elevated: prominent shadow
 * 
 * Padding options:
 * - none: no padding
 * - sm: 16px (1rem)
 * - md: 24px (1.5rem) - default
 * - lg: 32px (2rem)
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      padding = 'md',
      hover = false,
      variant = 'default',
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={[
          'rounded-xl border border-neutral-200 bg-surface',
          paddingStyles[padding],
          variantStyles[variant],
          hover
            ? 'cursor-pointer transition-shadow duration-150 hover:shadow-md'
            : 'transition-shadow duration-150',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';