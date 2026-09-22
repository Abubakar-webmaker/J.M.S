import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { PageContainer } from '@/components/layout';
import { useToast } from '@/components/ui';
import {
  AddNoteDialog,
  ApplicationAccessDenied,
  ApplicationActions,
  ApplicationContentCard,
  ApplicationDetailsHeader,
  ApplicationDetailsSkeleton,
  ApplicationHistoryTimeline,
  ApplicationInfoCard,
  ApplicationLoadError,
  ApplicationNotFound,
  ChangeStatusDialog,
  DeleteApplicationDialog,
  SubmittedResumeCard,
} from '@/features/applications/components';
import {
  useApplicationDetails,
  useApplicationMutations,
} from '@/features/applications/hooks';
import type {
  AddApplicationNoteFormData,
  ChangeApplicationStatusFormData,
} from '@/features/applications/schemas';

export default function ApplicationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    application,
    isLoading,
    isRefreshing,
    error,
    refresh,
    setApplication,
  } = useApplicationDetails(id);

  const {
    deleteApplication,
    changeStatus,
    addNote,
    isDeleting,
    isChangingStatus,
    isAddingNote,
    statusError,
    noteError,
    clearDeleteError,
    clearStatusError,
    clearNoteError,
  } = useApplicationMutations();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  // Block all action buttons while any mutation is in flight.
  const isActionBusy = isChangingStatus || isAddingNote || isDeleting;

  // ── Loading ───────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <PageContainer>
        <ApplicationDetailsSkeleton />
      </PageContainer>
    );
  }

  // ── Error states ──────────────────────────────────────────────────────
  if (error) {
    if (error.status === 404) {
      return (
        <PageContainer>
          <ApplicationNotFound />
        </PageContainer>
      );
    }

    if (error.status === 403) {
      return (
        <PageContainer>
          <ApplicationAccessDenied />
        </PageContainer>
      );
    }

    return (
      <PageContainer>
        <ApplicationLoadError
          message={error.message}
          onRetry={() => void refresh()}
        />
      </PageContainer>
    );
  }

  if (!application) {
    return (
      <PageContainer>
        <ApplicationNotFound />
      </PageContainer>
    );
  }

  // ── Mutation handlers ─────────────────────────────────────────────────

  const handleChangeStatus = async (
    data: ChangeApplicationStatusFormData,
  ) => {
    // Skip if the status is the same.
    if (data.status === application.status) {
      setIsStatusDialogOpen(false);
      return;
    }

    const result = await changeStatus(application.id, {
      status: data.status,
      note: data.note?.trim() || undefined,
    });

    if (result.error) {
      // Keep dialog open — error shown inline inside dialog.
      return;
    }

    setApplication(result.data!);
    setIsStatusDialogOpen(false);
    showToast({ title: 'Status updated', variant: 'success' });
  };

  const handleAddNote = async (data: AddApplicationNoteFormData) => {
    const result = await addNote(application.id, { note: data.note.trim() });

    if (result.error) {
      // Keep dialog open — error shown inline inside dialog.
      return;
    }

    setApplication(result.data!);
    setIsNoteDialogOpen(false);
    showToast({ title: 'Note added', variant: 'success' });
  };

  const handleDelete = async () => {
    const result = await deleteApplication(application.id);

    if (result.error) {
      // Keep dialog open — deleteError shown inline inside dialog.
      return;
    }

    showToast({
      title: 'Application deleted',
      message: `${application.companyName} — ${application.jobTitle} has been deleted.`,
      variant: 'success',
    });

    navigate('/app/applications', { replace: true });
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Refreshing indicator — keeps existing content visible */}
        {isRefreshing && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 text-sm text-text-muted"
          >
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Updating…
          </div>
        )}

        {/* Header: title, company, location, status badge */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <ApplicationDetailsHeader application={application} />

          <ApplicationActions
            applicationId={application.id}
            onChangeStatus={() => {
              clearStatusError();
              setIsStatusDialogOpen(true);
            }}
            onAddNote={() => {
              clearNoteError();
              setIsNoteDialogOpen(true);
            }}
            onDelete={() => {
              clearDeleteError();
              setIsDeleteDialogOpen(true);
            }}
            isDeleting={isDeleting}
            disabled={isActionBusy}
          />
        </div>

        {/* Two-column grid: main content left, resume right */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_320px]">
          {/* Left column */}
          <div className="space-y-6">
            <ApplicationInfoCard application={application} />
            <ApplicationContentCard application={application} />
            <ApplicationHistoryTimeline
              history={application.statusHistory}
              currentStatus={application.status}
            />
          </div>

          {/* Right column */}
          <div className="xl:sticky xl:top-6 xl:self-start">
            <SubmittedResumeCard resume={application.submittedResume} />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ChangeStatusDialog
        open={isStatusDialogOpen}
        currentStatus={application.status}
        isSubmitting={isChangingStatus}
        error={statusError?.message}
        onClose={() => setIsStatusDialogOpen(false)}
        onSubmit={handleChangeStatus}
      />

      <AddNoteDialog
        open={isNoteDialogOpen}
        isSubmitting={isAddingNote}
        error={noteError?.message}
        onClose={() => setIsNoteDialogOpen(false)}
        onSubmit={handleAddNote}
      />

      <DeleteApplicationDialog
        open={isDeleteDialogOpen}
        applicationName={`${application.jobTitle} at ${application.companyName}`}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => void handleDelete()}
      />
    </PageContainer>
  );
}
