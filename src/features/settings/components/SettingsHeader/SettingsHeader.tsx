interface SettingsHeaderProps {
  title?: string;
  description?: string;
}

/**
 * Settings Header
 *
 * Page-level heading for the Settings section.
 */
export function SettingsHeader({
  title = 'Settings',
  description = 'Manage your account preferences, security, and personal information.',
}: SettingsHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-neutral-500">{description}</p>
    </div>
  );
}
