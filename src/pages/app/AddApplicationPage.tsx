import { Link } from 'react-router';

import { PageContainer, PageHeader } from '@/components/layout';
import { AddApplicationForm } from '@/features/applications/components/AddApplicationForm/AddApplicationForm';

export default function AddApplicationPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Add application"
        description="Record a new job application and keep all the details in one place."
        actions={
          <Link
            to="/app/applications"
            className="text-sm font-medium text-text-muted hover:text-text"
          >
            Back to applications
          </Link>
        }
      />

      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
        <AddApplicationForm />
      </div>
    </PageContainer>
  );
}