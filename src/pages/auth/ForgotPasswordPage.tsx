import {
  AuthLayout,
  ForgotPasswordForm,
} from '@/features/auth/components';
import forgotImg from '@/assets/Forgot.webp';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Your Password?"
      subtitle="Enter your email and we'll send you a reset code"
      illustration={forgotImg}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}