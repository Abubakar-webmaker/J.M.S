import { createContext } from 'react';

import type { User } from '@/types';
import type { LoginInput, RegisterInput } from '@/features/auth/types/auth.types';

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<User>;
  register: (data: RegisterInput) => Promise<User>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
