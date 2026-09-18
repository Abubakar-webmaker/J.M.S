import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps
>(
  (
    {
      value,
      onClear,
      className = '',
      ...props
    },
    ref,
  ) => {
    const hasValue =
      typeof value === 'string'
        ? value.length > 0
        : Boolean(value);

    return (
      <div className="relative w-full">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />

        <input
          ref={ref}
          type="search"
          value={value}
          className={[
            'min-h-10 w-full rounded-lg border border-slate-300 bg-white',
            'py-2 pl-9 pr-10 text-sm text-slate-900',
            'placeholder:text-slate-400',
            'transition-colors duration-200',
            'focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100',
            '[&::-webkit-search-cancel-button]:appearance-none',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';