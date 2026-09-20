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
  return (
    <section>
      <h3 className="text-sm font-semibold text-text">
        {title}
      </h3>

      <div className="mt-2 whitespace-pre-wrap text-sm leading-6 text-text-muted">
        {content?.trim() || (
          <span className="italic">
            No information added.
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
    <Card>
      <div className="space-y-6">
        <ContentSection
          title="Job description"
          content={application.jobDescription}
        />

        <div className="border-t border-border" />

        <ContentSection
          title="Notes"
          content={application.notes}
        />
      </div>
    </Card>
  );
}