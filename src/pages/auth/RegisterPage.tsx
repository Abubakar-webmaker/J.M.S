import {
  AuthLayout,
  RegisterForm,
} from '@/features/auth/components';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tracking your job search in one place."
    >
      <RegisterForm />
    </AuthLayout>
  );
}