import { Card } from '@/components/ui';

import type { UserProfile } from '../../types/profile.types';

interface AccountInfoCardProps {
  profile: UserProfile;
}

export function AccountInfoCard({ profile }: AccountInfoCardProps) {
  return (
    <Card>
      <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-4">Account information</h2>

      <div className="mt-6 space-y-6">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Email address</p>
          <p className="mt-2 break-all text-sm text-neutral-700">
            {profile.email}
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            Email changes are not available in v1.
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <p className="text-sm font-semibold text-neutral-900">Member since</p>
          <time
            dateTime={profile.createdAt}
            className="mt-2 block text-sm text-neutral-700"
          >
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: 'long',
            }).format(new Date(profile.createdAt))}
          </time>
        </div>
      </div>
    </Card>
  );
}
