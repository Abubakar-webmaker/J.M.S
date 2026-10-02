import { NavLink } from 'react-router';

interface SettingsTab {
  label: string;
  value: string;
}

interface SettingsTabsProps {
  tabs: SettingsTab[];
  activeTab: string;
}

/**
 * Settings Tabs
 *
 * Horizontal tab navigation. Renders links so the active tab is
 * deep-linkable via the `?tab=` search param.
 */
export function SettingsTabs({ tabs, activeTab }: SettingsTabsProps) {
  return (
    <div className="border-b border-neutral-200">
      <nav
        aria-label="Settings sections"
        className="-mb-px flex gap-1 overflow-x-auto"
      >
        {tabs.map((tab) => (
          <NavLink
            key={tab.value}
            to={`?tab=${tab.value}`}
            replace
            className={[
              'whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700',
            ].join(' ')}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
