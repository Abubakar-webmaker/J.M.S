import { useNavigate, useParams } from 'react-router';

import { PageContainer, PageHeader } from '@/components/layout';
import {
  ApplicationForm,
  ApplicationFormSkeleton,
} from '@/features/applications/components';
import {
  useApplication,
} from '@/features/applications/hooks';
import type { Application } from '@/features/applications/types';
import { Button, ErrorState } from '@/components/ui';

export default function EditApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    application,
    isLoading,
    error,
  } = useApplication(id);

  const handleSuccess = (updated: Application) => {
    navigate(`/app/applications/${updated.id}`, {
      replace: true,
    });
  };

  const handleCancel = () => {
    if (id) {
      navigate(`/app/applications/${id}`);
      return;
    }

    navigate('/app/applications');
  };

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader
          title="Edit application"
          description="Update your application details."
        />

        <div className="mx-auto max-w-4xl">
          <ApplicationFormSkeleton />
        </div>
      </PageContainer>
    );
  }

  if (error || !application) {
    return (
      <PageContainer>
        <ErrorState
          title="Application not found"
          description={
            error?.message ||
            'The application could not be loaded.'
          }
          action={
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate('/app/applications')
              }
            >
              Back to applications
            </Button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Edit application"
        description={`Update details for ${application.jobTitle} at ${application.companyName}.`}
      />

      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
        <ApplicationForm
          mode="edit"
          application={application}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </PageContainer>
  );
}