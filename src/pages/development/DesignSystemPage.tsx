import { useState } from 'react';
import {
  AlertTriangle,
  Check,
  MoreVertical,
  Plus,
  Trash2,
} from 'lucide-react';

import {
  Avatar,
  Badge,
  Button,
  Card,
  Dropdown,
  EmptyState,
  ErrorState,
  Input,
  Modal,
  PasswordInput,
  SearchInput,
  Select,
  Skeleton,
  Spinner,
  Textarea,
  Tooltip,
  useToast,
} from '@/components/ui';

export function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { showToast } = useToast();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-green-600">
            Internal Development
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Design System
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Reusable UI components and interaction states used
            throughout the Job Management System.
          </p>
        </div>

        {/* Buttons */}

        <section className="mb-8">
          <SectionTitle
            title="Buttons"
            description="Available button variants and states."
          />

          <Card>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>

              <Button variant="secondary">
                Secondary
              </Button>

              <Button variant="outline">
                Outline
              </Button>

              <Button variant="ghost">
                Ghost
              </Button>

              <Button variant="danger">
                Delete
              </Button>

              <Button variant="link">
                Link
              </Button>

              <Button loading>
                Saving
              </Button>

              <Button disabled>
                Disabled
              </Button>

              <Button size="sm">
                Small
              </Button>

              <Button size="lg">
                Large
              </Button>

              <Button>
                <Plus className="h-4 w-4" />
                Add Application
              </Button>
            </div>
          </Card>
        </section>

        {/* Forms */}

        <section className="mb-8">
          <SectionTitle
            title="Form Controls"
            description="Inputs, validation, search and selection."
          />

          <Card>
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Company"
                placeholder="Enter company name"
              />

              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
              />

              <Input
                label="Invalid Input"
                value="invalid value"
                readOnly
                error="Please enter a valid value."
              />

              <PasswordInput
                label="Password"
                placeholder="Enter password"
              />

              <Select label="Job Type" defaultValue="">
                <option value="" disabled>
                  Select job type
                </option>

                <option value="full-time">
                  Full-time
                </option>

                <option value="part-time">
                  Part-time
                </option>

                <option value="contract">
                  Contract
                </option>
              </Select>

              <SearchInput
                placeholder="Search applications..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onClear={() => setSearch('')}
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Notes"
                  placeholder="Write notes..."
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Badges */}

        <section className="mb-8">
          <SectionTitle
            title="Badges"
            description="Application status presentation."
          />

          <Card>
            <div className="flex flex-wrap gap-3">
              <Badge variant="info">Applied</Badge>

              <Badge variant="warning">
                Screening
              </Badge>

              <Badge variant="info">
                Interview
              </Badge>

              <Badge variant="success">
                Offer
              </Badge>

              <Badge variant="danger">
                Rejected
              </Badge>

              <Badge variant="neutral">
                Ghosted
              </Badge>

              <Badge variant="neutral">
                Withdrawn
              </Badge>
            </div>
          </Card>
        </section>

        {/* Avatar */}

        <section className="mb-8">
          <SectionTitle
            title="Avatar"
            description="User profile representations."
          />

          <Card>
            <div className="flex items-center gap-4">
              <Avatar
                name="John Doe"
                size="sm"
              />

              <Avatar
                name="John Doe"
                size="md"
              />

              <Avatar
                name="John Doe"
                size="lg"
              />

              <Avatar
                name="John Doe"
                size="xl"
              />
            </div>
          </Card>
        </section>

        {/* Dropdown */}

        <section className="mb-8">
          <SectionTitle
            title="Dropdown"
            description="Application action menu."
          />

          <Card>
            <Dropdown
              trigger={
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              }
              items={[
                {
                  label: 'Edit',
                  onClick: () => {
                    showToast({
                      title: 'Edit selected',
                      variant: 'info',
                    });
                  },
                },
                {
                  label: 'Delete',
                  danger: true,
                  icon: <Trash2 className="h-4 w-4" />,
                  onClick: () => {
                    showToast({
                      title: 'Delete selected',
                      variant: 'error',
                    });
                  },
                },
              ]}
            />
          </Card>
        </section>

        {/* Modal */}

        <section className="mb-8">
          <SectionTitle
            title="Modal"
            description="Confirmation and form dialogs."
          />

          <Card>
            <Button onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
          </Card>
        </section>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Delete application?"
          description="This action cannot be undone."
          footer={
            <>
              <Button
                variant="outline"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  setModalOpen(false);

                  showToast({
                    title: 'Application deleted',
                    variant: 'success',
                  });
                }}
              >
                Delete
              </Button>
            </>
          }
        >
          <div className="rounded-lg bg-red-50 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />

              <p className="text-sm text-red-700">
                All application data, notes and status
                history will be permanently removed.
              </p>
            </div>
          </div>
        </Modal>

        {/* Loading */}

        <section className="mb-8">
          <SectionTitle
            title="Loading States"
            description="Loading indicators and skeleton UI."
          />

          <Card>
            <div className="flex flex-wrap items-center gap-8">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />

              <div className="w-48">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-3 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-3/4" />
              </div>
            </div>
          </Card>
        </section>

        {/* Empty */}

        <section className="mb-8">
          <SectionTitle
            title="Empty State"
            description="No data available state."
          />

          <Card padding="none">
            <EmptyState
              title="No applications yet"
              description="Start tracking your job applications by adding your first application."
              action={
                <Button>
                  <Plus className="h-4 w-4" />
                  Add Application
                </Button>
              }
            />
          </Card>
        </section>

        {/* Error */}

        <section className="mb-8">
          <SectionTitle
            title="Error State"
            description="Failed request or unexpected error."
          />

          <Card padding="none">
            <ErrorState
              title="Unable to load applications"
              description="Something went wrong while loading your applications."
              action={
                <Button
                  variant="outline"
                  onClick={() =>
                    showToast({
                      title: 'Retrying...',
                      variant: 'info',
                    })
                  }
                >
                  Try Again
                </Button>
              }
            />
          </Card>
        </section>

        {/* Tooltip */}

        <section className="mb-8">
          <SectionTitle
            title="Tooltip"
            description="Contextual information for icon actions."
          />

          <Card>
            <Tooltip content="Mark application as complete">
              <button
                type="button"
                aria-label="Mark complete"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
              >
                <Check className="h-5 w-5" />
              </button>
            </Tooltip>
          </Card>
        </section>
      </div>
    </main>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}