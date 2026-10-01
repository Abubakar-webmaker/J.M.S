import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ShieldCheck, ArrowLeft } from 'lucide-react';

import {
  Button,
  Input,
  OtpInput,
  PasswordInput,
  useToast,
} from '@/components/ui';
import { AppApiError } from '@/types/api';
import { authService } from '../../services/auth.service';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../../schemas/forgot-password.schema';
import { OTP_LENGTH } from '../../schemas/verify-otp.schema';
import {
  resetPasswordOtpSchema,
  type ResetPasswordOtpFormValues,
} from '../../schemas/reset-password-otp.schema';
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '../../schemas/reset-password.schema';

type Step = 'email' | 'otp' | 'password';

export function ForgotPasswordForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');

  // ── Step 1: request OTP by email ─────────────────────────────────────
  const emailForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onRequestOtp = async (values: ForgotPasswordFormValues) => {
    try {
      const result = await authService.forgotPassword(values);
      setEmail(result.email);
      setStep('otp');
      showToast({
        variant: 'success',
        title: 'Code sent',
        message: `We sent a ${OTP_LENGTH}-digit code to ${result.email}.`,
      });
    } catch (error) {
      if (error instanceof AppApiError) {
        showToast({ variant: 'error', title: 'Error', message: error.message });
        return;
      }

      showToast({
        variant: 'error',
        title: 'Request failed',
        message: 'Unable to send reset code. Please try again.',
      });
    }
  };

  // ── Step 2: verify the OTP ───────────────────────────────────────────
  const otpForm = useForm<ResetPasswordOtpFormValues>({
    resolver: zodResolver(resetPasswordOtpSchema),
    mode: 'onTouched',
    defaultValues: { otp: '' },
  });

  const onVerifyOtp = async (values: ResetPasswordOtpFormValues) => {
    try {
      const result = await authService.verifyResetOtp({
        email,
        otp: values.otp,
      });
      setResetToken(result.resetToken);
      setStep('password');
    } catch (error) {
      if (error instanceof AppApiError) {
        showToast({ variant: 'error', title: 'Error', message: error.message });
        return;
      }

      showToast({
        variant: 'error',
        title: 'Verification failed',
        message: 'Unable to verify the code. Please try again.',
      });
    }
  };

  // ── Step 3: set the new password ─────────────────────────────────────
  const passwordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onResetPassword = async (values: ResetPasswordFormValues) => {
    try {
      await authService.resetPassword({ resetToken, ...values });

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

  // ── Step 1 UI ────────────────────────────────────────────────────────
  if (step === 'email') {
    return (
      <>
        <form
          onSubmit={emailForm.handleSubmit(onRequestOtp)}
          noValidate
          className="space-y-3"
        >
          <div>
            <p className="mb-3 text-sm leading-relaxed text-neutral-600">
              Enter your email address and we'll send you a {OTP_LENGTH}-digit
              code to reset your password.
            </p>
          </div>

          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={emailForm.formState.errors.email?.message}
            required
            {...emailForm.register('email')}
          />

          <Button
            type="submit"
            fullWidth
            loading={emailForm.formState.isSubmitting}
            size="md"
          >
            Send reset code
          </Button>
        </form>

        <p className="mt-3 text-center text-sm text-neutral-600">
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

  // ── Step 2 UI ────────────────────────────────────────────────────────
  if (step === 'otp') {
    return (
      <>
        <div className="mb-5 flex gap-2.5 rounded-lg border border-primary-200 bg-primary-50 p-3.5 text-primary-800 sm:gap-3 sm:p-4">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-semibold">Check your email</p>
            <p className="text-xs text-primary-700 sm:text-sm">
              We sent a {OTP_LENGTH}-digit reset code to{' '}
              <span className="font-semibold">{email}</span>.
            </p>
          </div>
        </div>

        <form
          onSubmit={otpForm.handleSubmit(onVerifyOtp)}
          noValidate
          className="space-y-3"
        >
          <Controller
            name="otp"
            control={otpForm.control}
            render={({ field }) => (
              <OtpInput
                label="Reset code"
                length={OTP_LENGTH}
                error={otpForm.formState.errors.otp?.message}
                required
                name="otp"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            loading={otpForm.formState.isSubmitting}
            size="md"
          >
            Verify code
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-between gap-2 text-sm">
          <button
            type="button"
            onClick={() => setStep('email')}
            className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded px-1 py-0.5"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Change email
          </button>

          <Link
            to="/login"
            className="font-semibold text-primary-600 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded px-1 py-0.5"
          >
            Back to sign in
          </Link>
        </div>
      </>
    );
  }

  // ── Step 3 UI ────────────────────────────────────────────────────────
  return (
    <>
      <div className="mb-5 flex gap-2.5 rounded-lg border border-success-200 bg-success-50 p-3.5 text-success-800 sm:gap-3 sm:p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success-600" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-semibold">Code verified</p>
          <p className="text-xs text-success-700 sm:text-sm">
            Choose a new password for your account.
          </p>
        </div>
      </div>

      <form
        onSubmit={passwordForm.handleSubmit(onResetPassword)}
        noValidate
        className="space-y-3"
      >
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          placeholder="Create a new password"
          error={passwordForm.formState.errors.password?.message}
          required
          {...passwordForm.register('password')}
        />

        <PasswordInput
          label="Confirm new password"
          autoComplete="new-password"
          placeholder="Confirm your new password"
          error={passwordForm.formState.errors.confirmPassword?.message}
          required
          {...passwordForm.register('confirmPassword')}
        />

        <Button
          type="submit"
          fullWidth
          loading={passwordForm.formState.isSubmitting}
          size="md"
        >
          Reset password
        </Button>
      </form>
    </>
  );
}
