import { useNavigate } from 'react-router';

import { useToast } from '@/components/ui';
import { ApplicationForm } from '@/features/applications/components/ApplicationForm/ApplicationForm';
import type { Application } from '@/features/applications/types';

export function AddApplicationForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSuccess = (application: Application) => {
    showToast({
      title: 'Application added',
      message: `${application.companyName} — ${application.jobTitle} has been added successfully.`,
      variant: 'success',
    });

    navigate(`/app/applications/${application.id}`, { replace: true });
  };

  const handleCancel = () => {
    navigate('/app/applications');
  };

  return (
    <ApplicationForm
      mode="create"
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
