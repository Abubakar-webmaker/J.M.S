import { Upload } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';

import { PageContainer, PageHeader } from '@/components/layout';
import { Button, ErrorState, useToast } from '@/components/ui';

import {
  DeleteResumeDialog,
  RenameResumeDialog,
  ResumeGrid,
  ResumePagination,
  ResumeSearch,
  ResumesEmptyState,
  UploadResumeDialog,
} from '@/features/resumes/components';
import type { UpdateResumeFormData } from '@/features/resumes/schemas';
import { RESUME_LIST_DEFAULTS } from '@/features/resumes/constants';
import {
  useResumeMutations,
  useResumes,
} from '@/features/resumes/hooks';
import type { Resume } from '@/features/resumes/types';
import { useDebounce } from '@/hooks/useDebounce';

export default function ResumesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Local state ────────────────────────────────────────────────────────────
  const [search, setSearch] = useState(
    () => searchParams.get('search') ?? '',
  );
  const [page, setPage] = useState(() => {
    const p = Number(searchParams.get('page'));
    return p > 0 ? p : RESUME_LIST_DEFAULTS.page;
  });

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [resumeToRename, setResumeToRename] = useState<Resume | null>(null);
  const [resumeToDelete, setResumeToDelete] = useState<Resume | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  // ── Data ───────────────────────────────────────────────────────────────────
  const {
    resumes,
    pagination,
    isLoading,
    isRefreshing,
    error,
    fetchResumes,
    refresh,
    updateResumeInList,
    removeResumeFromList,
  } = useResumes();

  const {
    updateResume,
    deleteResume,
    isUpdating,
    isDeleting,
    updateError,
    deleteError,
    clearUpdateError,
    clearDeleteError,
  } = useResumeMutations();

  const { showToast } = useToast();

  // ── AbortController — cancel in-flight fetch on dep change ────────────────
  const abortRef = useRef<AbortController | null>(null);

  // ── Sync URL whenever effective params change ──────────────────────────────
  useEffect(() => {
    const next = new URLSearchParams(searchParams);

    if (debouncedSearch.trim()) {
      next.set('search', debouncedSearch.trim());
    } else {
      next.delete('search');
    }

    if (page > 1) {
      next.set('page', String(page));
    } else {
      next.delete('page');
    }

    setSearchParams(next, { replace: true });
    // Intentionally exclude searchParams to avoid loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, page, setSearchParams]);

  // ── Fetch on param change ─────────────────────────────────────────────────
  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    void fetchResumes(
      {
        search: debouncedSearch.trim() || undefined,
        page,
        limit: RESUME_LIST_DEFAULTS.limit,
      },
      controller.signal,
    );

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, page]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearch('');
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  // ── Upload ─────────────────────────────────────────────────────────────────
  const handleUploadSuccess = useCallback(async () => {
    setIsUploadOpen(false);
    showToast({ title: 'Resume uploaded', variant: 'success' });
    setPage(1);
    // Fetch page 1 fresh — setPage may not trigger the effect immediately
    // so we call fetchResumes directly as well.
    await fetchResumes({
      search: debouncedSearch.trim() || undefined,
      page: 1,
      limit: RESUME_LIST_DEFAULTS.limit,
    });
  }, [debouncedSearch, fetchResumes, showToast]);

  // ── Rename ─────────────────────────────────────────────────────────────────
  const handleRenameSubmit = useCallback(
    async (data: UpdateResumeFormData): Promise<boolean> => {
      if (!resumeToRename) return false;

      const result = await updateResume(resumeToRename.id, { name: data.name });

      if (result.error) return false;

      if (result.data) {
        updateResumeInList(result.data);
        showToast({ title: 'Resume renamed', variant: 'success' });
        setResumeToRename(null);
      }

      return true;
    },
    [resumeToRename, updateResume, updateResumeInList, showToast],
  );

  const handleCloseRename = useCallback(() => {
    if (isUpdating) return;
    clearUpdateError();
    setResumeToRename(null);
  }, [isUpdating, clearUpdateError]);

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDeleteConfirm = useCallback(async () => {
    if (!resumeToDelete) return;

    const result = await deleteResume(resumeToDelete.id);

    if (result.error) {
      // 409 = still referenced — dialog stays open, error shown inline.
      // deleteError state is already set inside the hook.
      return;
    }

    removeResumeFromList(resumeToDelete.id);
    showToast({ title: 'Resume deleted', variant: 'success' });
    setResumeToDelete(null);
    // Refresh to fix pagination counts.
    await refresh();
  }, [resumeToDelete, deleteResume, removeResumeFromList, showToast, refresh]);

  const handleCloseDelete = useCallback(() => {
    if (isDeleting) return;
    clearDeleteError();
    setResumeToDelete(null);
  }, [isDeleting, clearDeleteError]);

  const anyMutating = isUpdating || isDeleting;

  return (
    <PageContainer>
      <PageHeader
        title="Resumes"
        description="Manage the resumes you use throughout your job search."
        actions={
          <Button
            type="button"
            leftIcon={<Upload className="h-4 w-4" aria-hidden="true" />}
            onClick={() => setIsUploadOpen(true)}
            className="w-full sm:w-auto"
          >
            Upload resume
          </Button>
        }
      />

      <div className="space-y-6">
        <ResumeSearch
          value={search}
          onChange={handleSearchChange}
          disabled={isRefreshing}
        />

        {error ? (
          <ErrorState
            title="Unable to load resumes"
            description={error.message}
            action={
              <Button
                type="button"
                variant="outline"
                onClick={() => void refresh()}
              >
                Try again
              </Button>
            }
          />
        ) : isLoading ? (
          <ResumeGrid
            resumes={[]}
            onRename={setResumeToRename}
            onDelete={setResumeToDelete}
            isLoading
          />
        ) : resumes.length === 0 ? (
          <ResumesEmptyState
            hasSearch={Boolean(debouncedSearch.trim())}
            onClearSearch={handleClearSearch}
            onUpload={() => setIsUploadOpen(true)}
          />
        ) : (
          <>
            <ResumeGrid
              resumes={resumes}
              onRename={setResumeToRename}
              onDelete={setResumeToDelete}
              disabled={anyMutating || isRefreshing}
            />

            {pagination && pagination.totalPages > 1 && (
              <ResumePagination
                pagination={pagination}
                onPageChange={handlePageChange}
                disabled={isRefreshing}
              />
            )}
          </>
        )}
      </div>

      {/* ── Dialogs ──────────────────────────────────────────────────────── */}
      <UploadResumeDialog
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={handleUploadSuccess}
      />

      <RenameResumeDialog
        open={resumeToRename !== null}
        resume={resumeToRename}
        isSubmitting={isUpdating}
        error={updateError?.message}
        onClose={handleCloseRename}
        onSubmit={handleRenameSubmit}
      />

      <DeleteResumeDialog
        open={resumeToDelete !== null}
        resume={resumeToDelete}
        isDeleting={isDeleting}
        error={
          deleteError?.message ??
          (deleteError
            ? 'This resume is associated with one or more applications.'
            : undefined)
        }
        onClose={handleCloseDelete}
        onConfirm={handleDeleteConfirm}
      />
    </PageContainer>
  );
}
