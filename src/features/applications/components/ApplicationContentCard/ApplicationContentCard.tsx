import { Card } from '@/components/ui';
import type { Application } from '@/features/applications/types';

interface ApplicationContentCardProps {
  application: Application;
}

function ContentSection({
  title,
  content,
}: {
  title: string;
  content?: string | null;
}) {
  const hasContent = Boolean(content?.trim());

  return (
    <section>
      <h3 className="text-sm font-semibold text-neutral-900">
        {title}
      </h3>

      <div
        className={[
          'mt-3 rounded-lg p-4 text-sm leading-6',
          hasContent
            ? 'whitespace-pre-wrap border border-neutral-200 bg-neutral-50 text-neutral-700'
            : 'border border-dashed border-neutral-300 text-neutral-500',
        ].join(' ')}
      >
        {hasContent ? (
          content
        ) : (
          <span className="italic">
            No information added yet.
          </span>
        )}
      </div>
    </section>
  );
}

export function ApplicationContentCard({
  application,
}: ApplicationContentCardProps) {
  return (
    <Card padding="none">
      <div className="border-b border-neutral-200 px-6 py-4">
        <h2 className="text-base font-semibold text-neutral-900">
          Description &amp; notes
        </h2>
      </div>

      <div className="space-y-6 p-6">
        <ContentSection
          title="Job description"
          content={application.jobDescription}
        />

        <ContentSection
          title="Notes"
          content={application.notes}
        />
      </div>
    </Card>
  );
}