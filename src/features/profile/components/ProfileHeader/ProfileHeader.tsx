interface ProfileHeaderProps {
  title?: string;
  description?: string;
}

export function ProfileHeader({
  title = 'Profile',
  description = 'Manage your personal account information.',
}: ProfileHeaderProps) {
  return (
    <header>
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </header>
  );
}
