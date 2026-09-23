import { useParams } from 'react-router';

import {
  PageContainer,
  PageHeader,
} from '@/components/layout';

import {
  ErrorState,
  Card,
} from '@/components/ui';

import {
  useResume,
} from '@/features/resumes/hooks';

export default function ResumeDetailsPage() {
  const { id } = useParams();

  const {
    resume,
    isLoading,
    error,
  } = useResume(id);

  if (isLoading) {
    return (
      <PageContainer>
        <p className="text-sm text-text-muted">
          Loading resume...
        </p>
      </PageContainer>
    );
  }

  if (error || !resume) {
    return (
      <PageContainer>
        <ErrorState
          title="Resume not found"
          description={
            error?.message ||
            'This resume could not be loaded.'
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title={resume.name}
        description={resume.fileName}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-text">
            Resume details
          </h2>

          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-xs font-medium uppercase text-text-muted">
                File name
              </dt>

              <dd className="mt-1 text-sm text-text break-all">
                {resume.fileName}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase text-text-muted">
                Applications
              </dt>

              <dd className="mt-1 text-sm text-text">
                {resume.applicationCount ?? 0}
              </dd>
            </div>
          </dl>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-text">
            Used by applications
          </h2>

          {resume.applicationReferences?.length ? (
            <div className="mt-5 space-y-3">
              {resume.applicationReferences.map(
                (application) => (
                  <div
                    key={application.applicationId}
                    className="rounded-lg border border-border p-4"
                  >
                    <p className="font-medium text-text">
                      {application.jobTitle}
                    </p>

                    <p className="mt-1 text-sm text-text-muted">
                      {application.companyName}
                    </p>
                  </div>
                ),
              )}
            </div>
          ) : (
            <p className="mt-5 text-sm text-text-muted">
              This resume is not currently attached to any
              applications.
            </p>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}