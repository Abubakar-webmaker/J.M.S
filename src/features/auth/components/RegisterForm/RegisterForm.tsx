import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Input,
  PasswordInput,
  useToast,
} from '@/components/ui';

import { AppApiError } from '@/types/api';
import { useAuth } from '../../context/useAuth';
import {
  registerSchema,
  type RegisterFormValues,
} from '../../schemas/register.schema';

export function RegisterForm() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values);

      showToast({
        variant: 'success',
        title: 'Account created',
        message: 'Your account has been created successfully.',
      });

      navigate('/app/dashboard', {
        replace: true,
      });
    } catch (error) {
      if (error instanceof AppApiError) {
        showToast({ variant: 'error', title: 'Error', message: error.message });
        return;
      }

      showToast({
        variant: 'error',
        title: 'Registration failed',
        message: 'Unable to create your account. Please try again.',
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
        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <PasswordInput
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register('password')}
        />

        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{' '}
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