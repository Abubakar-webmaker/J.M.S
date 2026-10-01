import {
  AuthLayout,
  VerifyOtpForm,
} from '@/features/auth/components';
import verifyImg from '@/assets/Register.webp';

export default function VerifyOtpPage() {
  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Enter the code we emailed you to activate your account"
      illustration={verifyImg}
    >
      <VerifyOtpForm />
    </AuthLayout>
  );
}
