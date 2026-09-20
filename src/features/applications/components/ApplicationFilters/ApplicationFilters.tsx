import { RotateCcw, Search } from 'lucide-react';

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

export function ApplicationFilters({
  filters,
  onChange,
  onReset,
  disabled = false,
}: ApplicationFiltersProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Search with inline icon */}
        <div className="relative w-full">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <Input
            label="Search"
            placeholder="Company or job title"
            value={filters.search ?? ''}
            onChange={(event) =>
              onChange({ ...filters, search: event.target.value })
            }
            disabled={disabled}
            className="pl-9"
          />
        </div>

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
          placeholder="e.g. Remote"
          value={filters.location ?? ''}
          onChange={(event) =>
            onChange({ ...filters, location: event.target.value })
          }
          disabled={disabled}
        />

        <Input
          label="Applied from"
          type="date"
          value={filters.applicationDateFrom ?? ''}
          onChange={(event) =>
            onChange({
              ...filters,
              applicationDateFrom: event.target.value || undefined,
            })
          }
          disabled={disabled}
        />

        <Input
          label="Applied to"
          type="date"
          value={filters.applicationDateTo ?? ''}
          onChange={(event) =>
            onChange({
              ...filters,
              applicationDateTo: event.target.value || undefined,
            })
          }
          disabled={disabled}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={disabled}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset filters
        </Button>
      </div>
    </div>
  );
}