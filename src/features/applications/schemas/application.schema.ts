import { z } from 'zod';

import { APPLICATION_STATUSES } from '@/constants/application';
import { JOB_TYPES } from '@/constants/job';

const optionalString = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or less.`)
    .optional()
    .or(z.literal(''));

const optionalUrl = z
  .string()
  .trim()
  .url('Please enter a valid URL.')
  .max(2048, 'URL is too long.')
  .optional()
  .or(z.literal(''));

const optionalNumber = z.preprocess(
  (value) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }

    if (typeof value === 'string') {
      const numberValue = Number(value);
      return Number.isNaN(numberValue) ? value : numberValue;
    }

    return value;
  },
  z
    .number()
    .finite('Please enter a valid number.')
    .nonnegative('Value cannot be negative.')
    .optional(),
);

export const applicationSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(1, 'Company name is required.')
      .max(200, 'Company name must be 200 characters or less.'),

    jobTitle: z
      .string()
      .trim()
      .min(1, 'Job title is required.')
      .max(200, 'Job title must be 200 characters or less.'),

    jobUrl: optionalUrl,

    location: optionalString(200),

    jobType: z.enum(JOB_TYPES, {
      error: 'Please select a valid job type.',
    }),

    applicationDate: z
      .string()
      .min(1, 'Application date is required.')
      .refine(
        (value) => !Number.isNaN(Date.parse(value)),
        'Please enter a valid application date.',
      ),

    status: z.enum(APPLICATION_STATUSES, {
      error: 'Please select a valid application status.',
    }),

    salaryMin: optionalNumber,

    salaryMax: optionalNumber,

    salaryCurrency: z
      .string()
      .trim()
      .max(10, 'Currency code is too long.')
      .optional()
      .or(z.literal('')),

    jobDescription: optionalString(20_000),

    notes: optionalString(10_000),

    resumeId: z
      .string()
      .trim()
      .optional()
      .or(z.literal('')),
  })
  .superRefine((data, context) => {
    if (
      data.salaryMin !== undefined &&
      data.salaryMax !== undefined &&
      data.salaryMin > data.salaryMax
    ) {
      context.addIssue({
        code: 'custom',
        path: ['salaryMax'],
        message: 'Maximum salary must be greater than or equal to minimum salary.',
      });
    }
  });

export type ApplicationFormData = z.infer<typeof applicationSchema>;