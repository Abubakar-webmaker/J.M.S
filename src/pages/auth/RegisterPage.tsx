import {
  AuthLayout,
  RegisterForm,
} from '@/features/auth/components';
import registerImg from '@/assets/Register.png';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Start tracking your job search in one place"
      illustration={registerImg}
    >
      <RegisterForm />
    </AuthLayout>
  );
}