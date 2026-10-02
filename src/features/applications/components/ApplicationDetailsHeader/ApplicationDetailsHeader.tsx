import { ArrowLeft, Building2, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router';

import {
  APPLICATION_STATUS_CONFIG,
} from '@/constants/application';
import { Badge } from '@/components/ui';
import type { Application } from '@/features/applications/types';

interface ApplicationDetailsHeaderProps {
  application: Application;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export function ApplicationDetailsHeader({
  application,
}: ApplicationDetailsHeaderProps) {
  const status =
    APPLICATION_STATUS_CONFIG[application.status];

  return (
    <div className="min-w-0 space-y-4">
      <Link
        to="/app/applications"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft
          className="h-4 w-4"
          aria-hidden="true"
        />
        Back to applications
      </Link>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            {application.jobTitle}
          </h1>

          <Badge variant={status.variant}>
            {status.label}
          </Badge>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-600">
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-neutral-400" aria-hidden="true" />
            <span className="font-medium text-neutral-900">
              {application.companyName}
            </span>
          </span>

          {application.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-neutral-400" aria-hidden="true" />
              {application.location}
            </span>
          )}

          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-neutral-400" aria-hidden="true" />
            Applied {formatDate(application.applicationDate)}
          </span>
        </div>
      </div>
    </div>
  );
}