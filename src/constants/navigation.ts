import {
  BriefcaseBusiness,
  FileText,
  KeyRound,
  LayoutDashboard,
  User,
} from 'lucide-react';

export interface NavigationItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  /** When true, NavLink only activates on an exact path match */
  end?: boolean;
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/app/dashboard',
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: 'Applications',
    href: '/app/applications',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Resumes',
    href: '/app/resumes',
    icon: FileText,
  },
];

export const ACCOUNT_NAVIGATION: NavigationItem[] = [
  {
    label: 'Profile',
    href: '/app/profile',
    icon: User,
    end: true,
  },
  {
    label: 'Change Password',
    href: '/app/change-password',
    icon: KeyRound,
    end: true,
  },
];
