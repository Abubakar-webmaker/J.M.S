import api from '@/lib/api';
import { applicationService } from '@/features/applications/services/applicationService';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    getUri: vi.fn(({ url }: { url?: string }) => `http://api.test/api${url}`),
  },
  getApiUrl: (path: string) => `http://api.test/api${path}`,
}));

const backendApplication = {
  id: 'application-id',
  company: 'Example Inc.',
  jobTitle: 'Software Engineer',
  jobURL: null,
  jobType: 'FULL_TIME',
  applicationDate: '2026-11-08T00:00:00.000Z',
  status: 'APPLIED',
  resume: {
    id: 'resume-id',
    name: 'Current resume',
    fileName: 'resume.pdf',
    fileUrl: '/uploads/resume.pdf',
    createdAt: '2026-11-07T10:00:00.000Z',
  },
};

describe('applicationService resume mapping', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('maps the backend resume relation for application details', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { message: 'Application retrieved', data: backendApplication },
    } as never);

    const result = await applicationService.getApplication('application-id');

    expect(result.submittedResume).toEqual({
      id: 'resume-id',
      name: 'Current resume',
      fileName: 'resume.pdf',
      url: 'http://api.test/api/resumes/resume-id/file',
      uploadedAt: '2026-11-07T10:00:00.000Z',
    });
    expect(result).not.toHaveProperty('resume');
  });

  it('maps the backend resume relation in application lists', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: {
        message: 'Applications retrieved',
        data: {
          applications: [backendApplication],
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            totalPages: 1,
          },
        },
      },
    } as never);

    const result = await applicationService.getApplications();

    expect(result.data[0].submittedResume?.id).toBe('resume-id');
    expect(result.data[0].submittedResume?.url).toBe(
      'http://api.test/api/resumes/resume-id/file',
    );
  });

  it('sends create notes using the backend validation field name', async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: { message: 'Application created', data: backendApplication },
    } as never);

    await applicationService.createApplication({
      companyName: 'Example Inc.',
      jobTitle: 'Software Engineer',
      jobType: 'Full-time',
      applicationDate: '2026-11-08',
      status: 'Applied',
      notes: 'Follow up next week',
    });

    expect(vi.mocked(api.post).mock.calls[0][1]).toHaveProperty(
      'notes',
      'Follow up next week',
    );
    expect(vi.mocked(api.post).mock.calls[0][1]).not.toHaveProperty('Notes');
  });

  it('sends edit notes using the backend validation field name', async () => {
    vi.mocked(api.patch).mockResolvedValue({
      data: { message: 'Application updated', data: backendApplication },
    } as never);

    await applicationService.updateApplication('application-id', {
      notes: 'Updated note',
    });

    expect(vi.mocked(api.patch).mock.calls[0][1]).toHaveProperty(
      'notes',
      'Updated note',
    );
    expect(vi.mocked(api.patch).mock.calls[0][1]).not.toHaveProperty('Notes');
  });
});
