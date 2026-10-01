import { AuthLayout, LoginForm } from '@/features/auth/components';
import loginImg from '@/assets/Login.webp';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to manage your job applications"
      illustration={loginImg}
    >
      <LoginForm />
    </AuthLayout>
  );
}