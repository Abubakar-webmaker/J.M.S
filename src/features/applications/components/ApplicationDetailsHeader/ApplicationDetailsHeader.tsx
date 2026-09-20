import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

import {
  APPLICATION_STATUS_CONFIG,
} from '@/constants/application';
import { Badge } from '@/components/ui';
import type { Application } from '@/features/applications/types';

interface ApplicationDetailsHeaderProps {
  application: Application;
}

export function ApplicationDetailsHeader({
  application,
}: ApplicationDetailsHeaderProps) {
  const status =
    APPLICATION_STATUS_CONFIG[application.status];

  return (
    <div className="space-y-4">
      <Link
        to="/app/applications"
        className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text"
      >
        <ArrowLeft
          className="h-4 w-4"
          aria-hidden="true"
        />
        Back to applications
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            {application.jobTitle}
          </h1>

          <Badge variant={status.variant}>
            {status.label}
          </Badge>
        </div>

        <p className="mt-2 text-base font-medium text-text-muted">
          {application.companyName}
        </p>

        {application.location && (
          <p className="mt-1 text-sm text-text-muted">
            {application.location}
          </p>
        )}
      </div>
    </div>
  );
}