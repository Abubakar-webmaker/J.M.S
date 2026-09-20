import { CheckCircle2 } from 'lucide-react';

import { Badge, Card } from '@/components/ui';
import { APPLICATION_STATUS_CONFIG } from '@/constants/application';
import type { ApplicationStatus } from '@/constants/application';
import type {
  ApplicationHistoryItem,
} from '@/features/applications/types';

interface ApplicationHistoryTimelineProps {
  history: ApplicationHistoryItem[];
  currentStatus: ApplicationStatus;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function getActionTitle(item: ApplicationHistoryItem): string {
  switch (item.action) {
    case 'created':
      return 'Application created';
    case 'status_changed':
      return `Status changed to ${item.status}`;
    case 'note_added':
      return 'Note added';
    default:
      return 'Update';
  }
}

export function ApplicationHistoryTimeline({
  history,
  currentStatus,
}: ApplicationHistoryTimelineProps) {
  const sorted = [...history].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Find most recent event that matches the current status — highlight it.
  const highlightId = sorted.find(
    (item) => item.status === currentStatus,
  )?.id;

  return (
    <Card>
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold text-text">Activity</h2>
        <p className="mt-1 text-sm text-text-muted">
          A chronological record of application updates.
        </p>
      </div>

      {sorted.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-muted">
          No activity yet.
        </p>
      ) : (
        <ol className="mt-6 space-y-6">
          {sorted.map((item, index) => {
            const isStatusEvent = item.action === 'status_changed';
            const isCreated = item.action === 'created';
            const showBadge = isStatusEvent || isCreated;
            const config = APPLICATION_STATUS_CONFIG[item.status];
            const isHighlighted = item.id === highlightId;
            const title = getActionTitle(item);

            return (
              <li
                key={item.id}
                aria-label={`${title} on ${formatDate(item.createdAt)}`}
                className={[
                  'relative pl-10 transition-colors',
                  isHighlighted
                    ? 'rounded-lg bg-primary-50 p-3 pl-10 ring-1 ring-primary-200'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {/* Connector line */}
                {index !== sorted.length - 1 && (
                  <span
                    className="absolute left-[9px] top-7 h-[calc(100%+1.5rem)] w-px bg-border"
                    aria-hidden="true"
                  />
                )}

                {/* Icon */}
                <span className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-surface">
                  <CheckCircle2
                    className={[
                      'h-5 w-5',
                      isHighlighted
                        ? 'text-primary-600'
                        : 'text-text-muted',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                </span>

                {/* Header row */}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    {showBadge && (
                      <Badge variant={config.variant}>
                        {config.label}
                      </Badge>
                    )}

                    <span className="text-sm font-medium text-text">
                      {title}
                    </span>

                    {item.previousStatus && (
                      <span className="text-sm text-text-muted">
                        from {item.previousStatus}
                      </span>
                    )}
                  </div>

                  <time
                    dateTime={item.createdAt}
                    className="shrink-0 text-xs text-text-muted"
                  >
                    {formatDate(item.createdAt)}
                  </time>
                </div>

                {/* Note text */}
                {item.note && (
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-text-muted">
                    {item.note}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </Card>
  );
}
