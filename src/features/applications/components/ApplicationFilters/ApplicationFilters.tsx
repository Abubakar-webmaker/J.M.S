import {
  CalendarDays,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

import { Button, Input, Select } from '@/components/ui';
import {
  APPLICATION_STATUS_OPTIONS,
  JOB_TYPE_OPTIONS,
} from '@/features/applications/constants';
import type { ApplicationFilters as ApplicationFilterValues } from '@/features/applications/types';

interface ApplicationFiltersProps {
  filters: ApplicationFilterValues;
  onChange: (filters: ApplicationFilterValues) => void;
  onReset: () => void;
  disabled?: boolean;
}

/**
 * Application Filters Panel
 *
 * Provides filtering for applications by:
 * - Search (company or job title)
 * - Status
 * - Job type
 * - Location
 * - Application date range
 */
export function ApplicationFilters({
  filters,
  onChange,
  onReset,
  disabled = false,
}: ApplicationFiltersProps) {
  const activeCount = [
    filters.search?.trim(),
    filters.status,
    filters.jobType,
    filters.location?.trim(),
    filters.applicationDateFrom,
    filters.applicationDateTo,
  ].filter(Boolean).length;

  const hasInvalidRange = Boolean(
    filters.applicationDateFrom &&
      filters.applicationDateTo &&
      filters.applicationDateFrom > filters.applicationDateTo,
  );

  return (
    <section
      aria-label="Application filters"
      className="overflow-hidden rounded-xl border border-neutral-200 bg-surface shadow-sm"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-50/60 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal
            className="h-4 w-4 text-neutral-500"
            aria-hidden="true"
          />

          <h2 className="text-sm font-semibold text-neutral-900">
            Filters
          </h2>

          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-100 px-1.5 text-xs font-semibold text-primary-700">
              {activeCount}
            </span>
          )}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={disabled || activeCount === 0}
          leftIcon={<RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />}
        >
          Reset filters
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <Input
          label="Search"
          placeholder="Company or job title"
          value={filters.search ?? ''}
          onChange={(event) =>
            onChange({ ...filters, search: event.target.value })
          }
          disabled={disabled}
          leftIcon={<Search className="h-4 w-4" />}
        />

        <Select
          label="Status"
          value={filters.status ?? ''}
          onChange={(event) =>
            onChange({
              ...filters,
              status:
                event.target.value === ''
                  ? undefined
                  : (event.target.value as ApplicationFilterValues['status']),
            })
          }
          disabled={disabled}
        >
          <option value="">All statuses</option>

          {APPLICATION_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          label="Job type"
          value={filters.jobType ?? ''}
          onChange={(event) =>
            onChange({
              ...filters,
              jobType:
                event.target.value === ''
                  ? undefined
                  : (event.target.value as ApplicationFilterValues['jobType']),
            })
          }
          disabled={disabled}
        >
          <option value="">All job types</option>

          {JOB_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Input
          label="Location"
          placeholder="e.g. Remote, New York"
          value={filters.location ?? ''}
          onChange={(event) =>
            onChange({ ...filters, location: event.target.value })
          }
          disabled={disabled}
          leftIcon={<MapPin className="h-4 w-4" />}
        />

        <Input
          label="Applied from"
          type="date"
          value={filters.applicationDateFrom ?? ''}
          max={filters.applicationDateTo || undefined}
          onChange={(event) =>
            onChange({
              ...filters,
              applicationDateFrom: event.target.value || undefined,
            })
          }
          disabled={disabled}
          leftIcon={<CalendarDays className="h-4 w-4" />}
        />

        <Input
          label="Applied to"
          type="date"
          value={filters.applicationDateTo ?? ''}
          min={filters.applicationDateFrom || undefined}
          error={
            hasInvalidRange
              ? '"Applied from" must be on or before "Applied to".'
              : undefined
          }
          onChange={(event) =>
            onChange({
              ...filters,
              applicationDateTo: event.target.value || undefined,
            })
          }
          disabled={disabled}
          leftIcon={<CalendarDays className="h-4 w-4" />}
        />
      </div>
    </section>
  );
}