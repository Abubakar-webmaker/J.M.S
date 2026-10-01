import { Link, useNavigate, useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';

import { Button, PasswordInput, useToast } from '@/components/ui';
import { AppApiError } from '@/types/api';
import { authService } from '../../services/auth.service';
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '../../schemas/reset-password.schema';

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  if (!token) {
    return (
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-100 text-danger-600">
            <AlertCircle className="h-6 w-6" strokeWidth={2} />
          </div>
        </div>

        <p className="text-lg font-semibold text-neutral-900">Link Expired</p>
        <p className="mt-2 text-sm text-neutral-600">
          The password reset link is invalid or has expired.
        </p>

        <Link
          to="/forgot-password"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await authService.resetPassword({ token, ...values });

      navigate('/login', {
        replace: true,
        state: { passwordReset: true },
      });
    } catch (error) {
      if (error instanceof AppApiError) {
        showToast({ variant: 'error', title: 'Error', message: error.message });
        return;
      }

      showToast({
        variant: 'error',
        title: 'Reset failed',
        message: 'Unable to reset password. Please try again.',
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-3"
      >
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          placeholder="Create a new password"
          error={errors.password?.message}
          required
          {...register('password')}
        />

        <PasswordInput
          label="Confirm new password"
          autoComplete="new-password"
          placeholder="Confirm your new password"
          error={errors.confirmPassword?.message}
          required
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          size="md"
        >
          Reset password
        </Button>
      </form>
    </>
  );
}
