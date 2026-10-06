import { CheckCircle2, ExternalLink, Mail, MapPin, Phone, XCircle } from 'lucide-react';

import { Badge, Card } from '@/components/ui';

import type { UserProfile } from '../../types/profile.types';

interface AccountInfoCardProps {
  profile: UserProfile;
}

function formatJoinedDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
  }).format(date);
}

/**
 * Account Information Card
 *
 * Read-only summary of the profile: email with verification status,
 * contact details, links, and the account creation date.
 */
export function AccountInfoCard({ profile }: AccountInfoCardProps) {
  const location = [profile.city, profile.country]
    .filter(Boolean)
    .join(', ');

  return (
    <Card>
      <h2 className="border-b border-neutral-200 pb-4 text-lg font-bold text-neutral-900">
        Account information
      </h2>

      <div className="mt-6 space-y-6">
        {/* Email + verification status */}
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
            <Mail className="h-4 w-4 text-neutral-500" aria-hidden="true" />
            Email address
          </p>
          <p className="mt-2 break-all text-sm text-neutral-700">
            {profile.email}
          </p>
          <div className="mt-2">
            {profile.isEmailVerified ? (
              <Badge variant="success" className="gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Verified
              </Badge>
            ) : (
              <Badge variant="warning" className="gap-1">
                <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Not verified
              </Badge>
            )}
          </div>
        </div>

        {/* Contact details */}
        {(profile.phone || location || profile.address) && (
          <div className="space-y-3 border-t border-neutral-200 pt-6">
            {profile.phone && (
              <p className="flex items-start gap-2 text-sm text-neutral-700">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <span>{profile.phone}</span>
              </p>
            )}

            {(location || profile.address) && (
              <p className="flex items-start gap-2 text-sm text-neutral-700">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <span>
                  {profile.address && <span>{profile.address}</span>}
                  {profile.address && location && <br />}
                  {location && <span>{location}</span>}
                </span>
              </p>
            )}
          </div>
        )}

        {/* Profile links */}
        {(profile.linkedinUrl || profile.githubUrl) && (
          <div className="space-y-3 border-t border-neutral-200 pt-6">
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline"
              >
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                LinkedIn
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline"
              >
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                GitHub
              </a>
            )}
          </div>
        )}

        {/* Joined date */}
        <div className="border-t border-neutral-200 pt-6">
          <p className="text-sm font-semibold text-neutral-900">Member since</p>
          <time
            dateTime={profile.createdAt}
            className="mt-2 block text-sm text-neutral-700"
          >
            {formatJoinedDate(profile.createdAt)}
          </time>
        </div>
      </div>
    </Card>
  );
}
