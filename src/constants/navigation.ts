import {
  FileText,
  LayoutDashboard,
  User,
} from 'lucide-react';

export interface NavigationItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/app/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Applications',
    href: '/app/applications',
    icon: FileText,
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
  },
];