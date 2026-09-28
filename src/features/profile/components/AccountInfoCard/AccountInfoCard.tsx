import { Card } from '@/components/ui';

import type { UserProfile } from '../../types/profile.types';

interface AccountInfoCardProps {
  profile: UserProfile;
}

export function AccountInfoCard({ profile }: AccountInfoCardProps) {
  return (
    <Card>
      <h2 className="text-base font-semibold text-slate-900">Account</h2>

      <div className="mt-6 space-y-6">
        <div>
          <p className="text-sm font-medium text-slate-700">Email</p>
          <p className="mt-1 break-all text-sm text-slate-500">
            {profile.email}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Email changes are not available in V1.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700">Member since</p>
          <time
            dateTime={profile.createdAt}
            className="mt-1 block text-sm text-slate-500"
          >
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: 'medium',
            }).format(new Date(profile.createdAt))}
          </time>
        </div>
      </div>
    </Card>
  );
}
