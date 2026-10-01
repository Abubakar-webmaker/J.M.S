interface ProfileHeaderProps {
  title?: string;
  description?: string;
}

/**
 * Profile Page Header
 */
export function ProfileHeader({
  title = 'Profile',
  description = 'Manage your personal account information.',
}: ProfileHeaderProps) {
  return (
    <header>
      <h1 className="text-3xl font-bold text-neutral-900">{title}</h1>
      <p className="mt-2 text-base text-neutral-600">{description}</p>
    </header>
  );
}
