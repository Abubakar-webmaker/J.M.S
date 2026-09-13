import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-8 w-8',
};

export function Spinner({
  size = 'md',
  label = 'Loading',
}: SpinnerProps) {
  return (
    <Loader2
      className={`${sizes[size]} animate-spin text-green-600`}
      aria-label={label}
      role="status"
    />
  );
}