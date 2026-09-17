import { Navigate, Outlet, useLocation } from 'react-router';

import { AppLoadingScreen } from '@/components/common/AppLoadingScreen/AppLoadingScreen';
import { useAuth } from '@/features/auth/context/useAuth';

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AppLoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}