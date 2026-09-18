import {
  cloneElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

export interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: ReactElement;
  /** Pass either `items` for the standard menu or `children` for custom content. */
  items?: DropdownItem[];
  children?: ReactNode;
  align?: 'left' | 'right';
}

export function Dropdown({
  trigger,
  items,
  children,
  align = 'right',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const triggerElement = cloneElement(
    trigger as ReactElement<Record<string, unknown>>,
    {
      'aria-expanded': open,
      'aria-haspopup': true,
      onClick: (event: React.MouseEvent) => {
        const triggerProps = trigger.props as Record<string, unknown>;
        if (typeof triggerProps.onClick === 'function') {
          triggerProps.onClick(event);
        }
        setOpen((current) => !current);
      },
    },
  );

  const menuContent =
    children ??
    items?.map((item) => (
      <button
        key={item.label}
        type="button"
        role="menuitem"
        disabled={item.disabled}
        onClick={() => {
          item.onClick();
          setOpen(false);
        }}
        className={[
          'flex w-full items-center gap-2 rounded-md px-3 py-2',
          'text-left text-sm transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50',
          item.danger
            ? 'text-red-600 hover:bg-red-50'
            : 'text-slate-700 hover:bg-slate-100',
        ].join(' ')}
      >
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        <span>{item.label}</span>
      </button>
    ));

  return (
    <div ref={containerRef} className="relative inline-block">
      {triggerElement}

      {open && (
        <div
          role="menu"
          className={[
            'absolute z-[100] mt-2 min-w-44 rounded-lg',
            'border border-slate-200 bg-white p-1 shadow-lg',
            align === 'right' ? 'right-0' : 'left-0',
          ].join(' ')}
          onClick={() => setOpen(false)}
        >
          {menuContent}
        </div>
      )}
    </div>
  );
}
