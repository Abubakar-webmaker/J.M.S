import { Link, useNavigate, useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
      <div className="text-center text-sm text-text-muted">
        Invalid or missing reset token.{' '}
        <Link
          to="/forgot-password"
          className="font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
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
        className="space-y-5"
      >
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          placeholder="Create a new password"
          error={errors.password?.message}
          {...register('password')}
        />

        <PasswordInput
          label="Confirm new password"
          autoComplete="new-password"
          placeholder="Confirm your new password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button type="submit" fullWidth loading={isSubmitting}>
          Reset password
        </Button>
      </form>
    </>
  );
}
