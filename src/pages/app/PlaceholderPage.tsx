import { PageContainer, PageHeader } from '@/components/layout';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <PageContainer>
      <PageHeader
        title={title}
        description={description}
      />

      <div className="rounded-xl border border-border bg-surface p-8 text-center shadow-sm">
        <p className="text-sm text-text-muted">
          This page will be implemented in the upcoming phase.
        </p>
      </div>
    </PageContainer>
  );
}