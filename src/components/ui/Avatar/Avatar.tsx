import type { ImgHTMLAttributes } from 'react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeStyles = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-xl',
};

function getInitials(name?: string) {
  if (!name?.trim()) {
    return 'U';
  }

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Avatar({
  name,
  src,
  alt,
  size = 'md',
  className = '',
  ...props
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? name ?? 'User avatar'}
        className={[
          'rounded-full object-cover',
          sizeStyles[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt ?? name ?? 'User avatar'}
      className={[
        'flex shrink-0 items-center justify-center rounded-full',
        'bg-green-100 font-semibold text-green-700',
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {getInitials(name)}
    </div>
  );
}