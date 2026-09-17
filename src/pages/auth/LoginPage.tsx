import { AuthLayout, LoginForm } from '@/features/auth/components';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your job applications."
    >
      <LoginForm />
    </AuthLayout>
  );
}