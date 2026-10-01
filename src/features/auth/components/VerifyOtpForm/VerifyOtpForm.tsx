import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailCheck } from 'lucide-react';

import { Button, OtpInput, useToast } from '@/components/ui';

import { AppApiError } from '@/types/api';
import { useAuth } from '../../context/useAuth';
import {
  OTP_LENGTH,
  verifyOtpSchema,
  type VerifyOtpFormValues,
} from '../../schemas/verify-otp.schema';

const RESEND_COOLDOWN_SECONDS = 30;

export function VerifyOtpForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyOtp, resendOtp } = useAuth();
  const { showToast } = useToast();

  const email = searchParams.get('email') ?? '';

  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    mode: 'onTouched',
    defaultValues: { otp: '' },
  });

  // Redirect back to register if there is no email to verify
  useEffect(() => {
    if (!email) {
      navigate('/register', { replace: true });
    }
  }, [email, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, [cooldown]);

  const onSubmit = async (values: VerifyOtpFormValues) => {
    try {
      await verifyOtp({ email, otp: values.otp });

      showToast({
        variant: 'success',
        title: 'Email verified',
        message: 'Your account is now active.',
      });

      navigate('/app/dashboard', { replace: true });
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

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;

    setIsResending(true);
    try {
      const result = await resendOtp({ email });
      setCooldown(RESEND_COOLDOWN_SECONDS);
      showToast({
        variant: 'success',
        title: 'Code sent',
        message: `A new code was sent to ${result.email}.`,
      });
    } catch (error) {
      if (error instanceof AppApiError) {
        showToast({ variant: 'error', title: 'Error', message: error.message });
        return;
      }

      showToast({
        variant: 'error',
        title: 'Could not resend',
        message: 'Unable to resend the code. Please try again.',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <div className="mb-5 flex gap-2.5 rounded-lg border border-primary-200 bg-primary-50 p-3.5 text-primary-800 sm:gap-3 sm:p-4">
        <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-semibold">Check your email</p>
          <p className="text-xs text-primary-700 sm:text-sm">
            We sent a {OTP_LENGTH}-digit verification code to{' '}
            <span className="font-semibold">{email}</span>.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-2.5"
      >
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput
              label="Verification code"
              length={OTP_LENGTH}
              error={errors.otp?.message}
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
          loading={isSubmitting}
          size="md"
        >
          Verify account
        </Button>
      </form>

      <div className="mt-4 flex items-center justify-between gap-2 text-sm">
        <span className="text-neutral-600">Didn't get the code?</span>

        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || isResending}
          className="font-semibold text-primary-600 hover:text-primary-700 transition-colors disabled:cursor-not-allowed disabled:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded px-1 py-0.5"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-neutral-600 sm:mt-6">
        Wrong email?{' '}
        <Link
          to="/register"
          className="font-semibold text-primary-600 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded px-1 py-0.5"
        >
          Start over
        </Link>
      </p>
    </>
  );
}
