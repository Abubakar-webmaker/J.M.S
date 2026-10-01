import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft } from 'lucide-react';

import { Button, Input, useToast } from '@/components/ui';
import { AppApiError } from '@/types/api';
import { authService } from '../../services/auth.service';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../../schemas/forgot-password.schema';

export function ForgotPasswordForm() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await authService.forgotPassword(values);
      setSubmitted(true);
    } catch (error) {
      if (error instanceof AppApiError) {
        showToast({ variant: 'error', title: 'Error', message: error.message });
        return;
      }

      showToast({
        variant: 'error',
        title: 'Request failed',
        message: 'Unable to send reset email. Please try again.',
      });
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            <Mail className="h-6 w-6" strokeWidth={2} />
          </div>
        </div>

        <h2 className="text-xl font-bold text-neutral-900">Check your email</h2>

        <p className="mt-3 text-sm text-neutral-600">
          If an account exists for that email, we've sent a password reset link to your inbox.
        </p>

        <p className="mt-4 text-xs text-neutral-600">
          Didn't receive the email? Check your spam folder or try again.
        </p>

        <div className="mt-6 space-y-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
      >
        <div>
          <p className="mb-4 text-sm text-neutral-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          required
          {...register('email')}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          size="md"
        >
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        Remember your password?{' '}
        <Link
          to="/login"
          className="font-semibold text-primary-600 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded px-1 py-0.5"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
