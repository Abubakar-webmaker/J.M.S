export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  bio?: string | null;
  isEmailVerified?: boolean;
  avatarUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
