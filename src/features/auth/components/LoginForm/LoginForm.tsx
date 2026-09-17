import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
        | { from?: { pathname?: string }; passwordReset?: boolean }
        | null
    )?.from?.pathname ?? '/app/dashboard';

  const passwordReset =
    (location.state as { passwordReset?: boolean } | null)
      ?.passwordReset === true;

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
      {passwordReset && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          Your password has been reset successfully. You can now log
          in.
        </div>
      )}

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

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-text"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              Forgot password?
            </Link>
          </div>

          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
        >
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          Create one
        </Link>
      </p>
    </>
  );
}