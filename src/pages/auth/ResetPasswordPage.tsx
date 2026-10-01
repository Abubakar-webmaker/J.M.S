import {
  AuthLayout,
  ResetPasswordForm,
} from '@/features/auth/components';
import resetImg from '@/assets/Reset.webp';

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Reset codes are now handled from the forgot-password page"
      illustration={resetImg}
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}