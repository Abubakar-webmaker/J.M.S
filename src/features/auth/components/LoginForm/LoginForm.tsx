import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle } from 'lucide-react';

import {
  Button,
  Input,
  PasswordInput,
  useToast,
} from '@/components/ui';

import { AppApiError } from '@/types/api';
import { useAuth } from '@/features/auth/context/useAuth';
import {
  loginSchema,
  type LoginFormValues,
} from '@/features/auth/schemas/login.schema';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const from =
    (
      location.state as
        | { from?: { pathname?: string }; passwordReset?: boolean; sessionExpired?: boolean }
        | null
    )?.from?.pathname ?? '/app/dashboard';

  const passwordReset =
    (location.state as { passwordReset?: boolean } | null)
      ?.passwordReset === true;

  const sessionExpired =
    (location.state as { sessionExpired?: boolean } | null)
      ?.sessionExpired === true;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);

      showToast({
        variant: 'success',
        title: 'Welcome back!',
      });

      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof AppApiError) {
        showToast({ variant: 'error', title: 'Error', message: error.message });
        return;
      }

      showToast({
        variant: 'error',
        title: 'Sign in failed',
        message: 'Unable to sign in. Please try again.',
      });
    }
  };

  return (
    <>
      {/* Session expired alert */}
      {sessionExpired && (
        <div
          role="alert"
          className="mb-6 flex gap-3 rounded-lg border border-warning-200 bg-warning-50 p-4 text-warning-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning-600" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-semibold">Session Expired</p>
            <p className="text-xs text-warning-700 sm:text-sm">Please sign in again to continue.</p>
          </div>
        </div>
      )}

      {/* Password reset success alert */}
      {passwordReset && (
        <div
          role="status"
          className="mb-6 flex gap-3 rounded-lg border border-success-200 bg-success-50 p-4 text-success-800"
        >
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success-600" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-semibold">Password Reset</p>
            <p className="text-xs text-success-700 sm:text-sm">Your password has been reset successfully.</p>
          </div>
        </div>
      )}

      {/* Login form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 sm:space-y-6"
      >
        {/* Email field */}
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          required
          {...register('email')}
        />

        {/* Password field with forgot link */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="login-password"
              className="text-sm font-semibold text-neutral-900"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded px-1 py-0.5"
            >
              Forgot password?
            </Link>
          </div>

          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            required
            {...register('password')}
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          size="md"
        >
          Sign in
        </Button>
      </form>

      {/* Register link */}
      <p className="mt-6 text-center text-sm text-neutral-600">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-primary-600 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded px-1 py-0.5"
        >
          Create account
        </Link>
      </p>
    </>
  );
}