import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { authService } from '@/features/auth/services/auth.service';
import type {
  LoginInput,
  RegisterInput,
} from '@/features/auth/types/auth.types';
import type { User } from '@/types';

import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const response = await authService.getSession();
      const currentUser = response.user ?? null;
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        await refreshSession();
      } finally {
        setIsLoading(false);
      }
    };

    void initializeAuth();
  }, [refreshSession]);

  const login = useCallback(
    async (data: LoginInput) => {
      const response = await authService.login(data);
      setUser(response.user);
      return response.user;
    },
    [],
  );

  const register = useCallback(
    async (data: RegisterInput) => {
      const response = await authService.register(data);
      setUser(response.user);
      return response.user;
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
      refreshSession,
    }),
    [user, isLoading, login, register, logout, refreshSession],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
