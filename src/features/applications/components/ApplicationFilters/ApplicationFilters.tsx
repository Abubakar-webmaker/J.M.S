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
  return (
    <div className="rounded-lg border border-neutral-200 bg-surface p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search with inline icon */}
        <Input
          placeholder="Company or job title"
          value={filters.search ?? ''}
          onChange={(event) =>
            onChange({ ...filters, search: event.target.value })
          }
          disabled={disabled}
          aria-label="Search"
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

      <div className="mt-5 flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={disabled}
          leftIcon={<RotateCcw className="h-4 w-4" strokeWidth={2} />}
        >
          Reset filters
        </Button>
      </div>
    </div>
  );
}