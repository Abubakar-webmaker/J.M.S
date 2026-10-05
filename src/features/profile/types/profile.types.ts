export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  bio: string | null;
  avatarUrl?: string | null;
}

/**
 * All profile fields are optional so callers can send partial updates
 * (PATCH semantics) — only changed fields need to be submitted.
 */
export interface UpdateProfileInput {
  name?: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  bio?: string | null;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}
