import {
  AuthLayout,
  ResetPasswordForm,
} from '@/features/auth/components';
import resetImg from '@/assets/Reset.webp';

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your new password"
      illustration={resetImg}
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}