import { beforeEach, describe, expect, it, vi } from 'vitest';

import api from '@/lib/api';

import { applicationService } from './applicationService';

vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

const resumeId = '11111111-1111-4111-8111-111111111111';

const backendApplication = {
  id: 'app-1',
  company: 'Acme',
  jobTitle: 'Engineer',
  jobURL: 'https://example.com/jobs/1',
  location: 'Remote',
  jobType: 'FULL_TIME',
  applicationDate: '2026-11-05T00:00:00.000Z',
  status: 'APPLIED',
  minSalary: null,
  maxSalary: null,
  currency: 'USD',
  jobDescription: 'Build things',
  Notes: 'Follow up Friday',
  resumeId,
  resume: {
    id: resumeId,
    name: 'Backend Resume',
    fileName: 'backend.pdf',
    fileType: 'application/pdf',
    fileUrl: 'http://localhost:3000/uploads/resumes/backend.pdf',
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
    userId: 'user-1',
  },
  createdAt: '2026-11-05T00:00:00.000Z',
  updatedAt: '2026-11-05T00:00:00.000Z',
  statusHistory: [],
};

beforeEach(() => {
  vi.mocked(api.get).mockReset();
  vi.mocked(api.post).mockReset();
  vi.mocked(api.patch).mockReset();
});

describe('applicationService resume and notes mapping', () => {
  it('sends notes and resumeId on create without renaming notes', async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: { message: 'created', data: backendApplication },
    });

    await applicationService.createApplication({
      companyName: 'Acme',
      jobTitle: 'Engineer',
      jobType: 'Full-time',
      applicationDate: '2026-11-05',
      status: 'Applied',
      notes: 'Follow up Friday',
      resumeId,
    });

    const payload = vi.mocked(api.post).mock.calls[0]?.[1] as Record<string, unknown>;

    expect(payload.notes).toBe('Follow up Friday');
    expect(payload.resumeId).toBe(resumeId);
    expect(payload).not.toHaveProperty('Notes');
    expect(payload.company).toBe('Acme');
  });

  it('sends null notes and a replacement resumeId on update', async () => {
    vi.mocked(api.patch).mockResolvedValue({
      data: { message: 'updated', data: { ...backendApplication, Notes: null, resume: null } },
    });

    const nextResumeId = '22222222-2222-4222-8222-222222222222';

    await applicationService.updateApplication('app-1', {
      companyName: 'Acme',
      notes: null,
      resumeId: nextResumeId,
    });

    const payload = vi.mocked(api.patch).mock.calls[0]?.[1] as Record<string, unknown>;

    expect(payload.notes).toBeNull();
    expect(payload.resumeId).toBe(nextResumeId);
    expect(payload).not.toHaveProperty('Notes');
    expect(payload.company).toBe('Acme');
  });

  it('omits notes when an update does not include them', async () => {
    vi.mocked(api.patch).mockResolvedValue({
      data: { message: 'updated', data: backendApplication },
    });

    await applicationService.updateApplication('app-1', {
      jobTitle: 'Senior Engineer',
    });

    const payload = vi.mocked(api.patch).mock.calls[0]?.[1] as Record<string, unknown>;

    expect(payload).not.toHaveProperty('notes');
    expect(payload).not.toHaveProperty('Notes');
    expect(payload.jobTitle).toBe('Senior Engineer');
  });

  it('maps stored notes and the referenced resume when an application is reopened', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { message: 'ok', data: backendApplication },
    });

    const application = await applicationService.getApplication('app-1');

    expect(application.notes).toBe('Follow up Friday');
    expect(application.companyName).toBe('Acme');
    expect(application).not.toHaveProperty('Notes');
    expect(application).not.toHaveProperty('resume');
    expect(application.submittedResume).toEqual({
      id: resumeId,
      name: 'Backend Resume',
      fileName: 'backend.pdf',
      url: 'http://localhost:3000/uploads/resumes/backend.pdf',
      uploadedAt: '2026-01-02T00:00:00.000Z',
    });
  });

  it('maps a cleared resume and empty notes to null', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: {
        message: 'ok',
        data: { ...backendApplication, Notes: null, resume: null, resumeId: null },
      },
    });

    const application = await applicationService.getApplication('app-1');

    expect(application.notes).toBeNull();
    expect(application.submittedResume).toBeNull();
  });
});
