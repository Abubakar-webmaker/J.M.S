import { AuthLayout, LoginForm } from '@/features/auth/components';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to manage your job applications"
      illustration="/assets/Login.png"
    >
      <LoginForm />
    </AuthLayout>
  );
}