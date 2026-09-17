import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
        <p className="text-lg font-semibold text-text">Check your email</p>

        <p className="mt-3 text-sm text-text-muted">
          If an account exists for that email, we've sent a password
          reset link.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          Back to sign in
        </Link>
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
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Button type="submit" fullWidth loading={isSubmitting}>
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Remember your password?{' '}
        <Link
          to="/login"
          className="font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
