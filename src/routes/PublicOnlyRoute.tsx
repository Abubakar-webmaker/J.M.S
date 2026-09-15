import { Navigate, Outlet } from 'react-router';

import { AppLoadingScreen } from '@/components/common/AppLoadingScreen/AppLoadingScreen';
import { useAuth } from '@/features/auth/context/useAuth';

export function PublicOnlyRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <AppLoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}