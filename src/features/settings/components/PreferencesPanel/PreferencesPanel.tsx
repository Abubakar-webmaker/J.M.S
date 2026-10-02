import { useState } from 'react';

import { Card, Checkbox, Select, useToast } from '@/components/ui';
import { ThemeSelector } from '@/features/theme';

/**
 * Preferences Panel
 *
 * Local-only preferences. Persisted in component state for now;
 * can be wired to a backend endpoint later.
 */
export function PreferencesPanel() {
  const { showToast } = useToast();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');

  const handleChange = () => {
    showToast({
      variant: 'success',
      title: 'Preferences saved.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-neutral-200 pb-5">
          <h2 className="text-base font-semibold text-neutral-900">
            Appearance
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Customize how JobManager looks on your device.
          </p>
        </div>

        <div className="pt-6">
          <ThemeSelector />
        </div>
      </Card>

      <Card>
        <div className="border-b border-neutral-200 pb-5">
          <h2 className="text-base font-semibold text-neutral-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Choose how you want to be notified about your applications.
          </p>
        </div>

        <div className="space-y-4 pt-6">
          <Checkbox
            label="Email notifications"
            helperText="Receive updates about application status changes."
            checked={emailNotifications}
            onChange={(event) => {
              setEmailNotifications(event.target.checked);
              handleChange();
            }}
          />

          <Checkbox
            label="Weekly digest"
            helperText="Get a weekly summary of your job search activity."
            checked={weeklyDigest}
            onChange={(event) => {
              setWeeklyDigest(event.target.checked);
              handleChange();
            }}
          />
        </div>
      </Card>

      <Card>
        <div className="border-b border-neutral-200 pb-5">
          <h2 className="text-base font-semibold text-neutral-900">
            Display
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Customize how dates are displayed across the app.
          </p>
        </div>

        <div className="pt-6">
          <Select
            id="date-format"
            label="Date format"
            value={dateFormat}
            onChange={(event) => {
              setDateFormat(event.target.value);
              handleChange();
            }}
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </Select>
        </div>
      </Card>
    </div>
  );
}
