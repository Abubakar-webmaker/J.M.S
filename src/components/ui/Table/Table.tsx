import {
  type ReactNode,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';

/* ========================================
   Table Component
   ======================================== */

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <table
        className={`w-full text-left text-sm ${className || ''}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

/* ========================================
   TableHead
   ======================================== */

export interface TableHeadProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableHead({ children, className, ...props }: TableHeadProps) {
  return (
    <thead className={`bg-neutral-50 border-b border-neutral-200 ${className || ''}`} {...props}>
      {children}
    </thead>
  );
}

/* ========================================
   TableBody
   ======================================== */

export interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableBody({ children, className, ...props }: TableBodyProps) {
  return (
    <tbody className={className || ''} {...props}>
      {children}
    </tbody>
  );
}

/* ========================================
   TableRow
   ======================================== */

export interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  isHoverable?: boolean;
}

export function TableRow({
  children,
  isHoverable = true,
  className,
  ...props
}: TableRowProps) {
  return (
    <tr
      className={`border-b border-neutral-200 transition-colors ${
        isHoverable ? 'hover:bg-neutral-100' : ''
      } ${className || ''}`}
      {...props}
    >
      {children}
    </tr>
  );
}

/* ========================================
   TableHeader (th)
   ======================================== */

export interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  sortable?: boolean;
  onSort?: () => void;
}

export function TableHeader({
  children,
  sortable = false,
  onSort,
  className,
  ...props
}: TableHeaderProps) {
  return (
    <th
      className={`px-6 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-700 ${
        sortable ? 'cursor-pointer select-none hover:bg-neutral-200' : ''
      } ${className || ''}`}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      {children}
    </th>
  );
}

/* ========================================
   TableCell (td)
   ======================================== */

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export function TableCell({
  children,
  className,
  ...props
}: TableCellProps) {
  return (
    <td
      className={`px-6 py-4 text-neutral-900 ${className || ''}`}
      {...props}
    >
      {children}
    </td>
  );
}

/* ========================================
   TableEmpty
   ======================================== */

interface TableEmptyProps {
  colSpan: number;
  message?: string;
}

export function TableEmpty({ colSpan, message = 'No data available' }: TableEmptyProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-6 py-12 text-center text-sm text-neutral-600"
      >
        {message}
      </td>
    </tr>
  );
}
