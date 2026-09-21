import { BriefcaseBusiness, Plus } from 'lucide-react';
import { Link } from 'react-router';

import { Button, EmptyState } from '@/components/ui';

interface ApplicationsEmptyStateProps {
  hasFilters: boolean;
  searchTerm?: string;
  onResetFilters: () => void;
}

export function ApplicationsEmptyState({
  hasFilters,
  searchTerm,
  onResetFilters,
}: ApplicationsEmptyStateProps) {
  if (hasFilters) {
    const description = searchTerm?.trim()
      ? `No applications found for "${searchTerm.trim()}". Try changing your search or filters.`
      : 'Try changing or clearing your filters to see more applications.';

    return (
      <EmptyState
        icon={
          <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
        }
        title="No applications found"
        description={description}
        action={
          <Button type="button" variant="outline" onClick={onResetFilters}>
            Clear filters
          </Button>
        }
      />
    );
  }

  return (
    <EmptyState
      icon={
        <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
      }
      title="No applications yet"
      description="Start tracking your job search by adding your first application."
      action={
        <Link to="/app/applications/new">
          <Button type="button">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add application
          </Button>
        </Link>
      }
    />
  );
}
