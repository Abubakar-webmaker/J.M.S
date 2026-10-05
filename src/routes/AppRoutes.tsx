import { Navigate, Route, Routes } from 'react-router';

import { AppLayout } from '@/components/layout';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import VerifyOtpPage from '@/pages/auth/VerifyOtpPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import ApplicationsPage from '@/pages/app/ApplicationsPage';
import AddApplicationPage from '@/pages/app/AddApplicationPage';
import EditApplicationPage from '@/pages/app/EditApplicationPage';
import ApplicationDetailsPage from '@/pages/app/ApplicationDetailsPage';
import ResumesPage from '@/pages/app/ResumesPage';
import ResumeDetailsPage from '@/pages/app/ResumeDetailsPage';
import { DashboardPage } from '@/pages/app/dashboard/DashboardPage';
import { ProfilePage } from '@/pages/app/profile/ProfilePage';
import { ChangePasswordPage } from '@/pages/app/change-password/ChangePasswordPage';
import { SettingsPage } from '@/pages/app/settings/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { DesignSystemPage } from '@/pages/development/DesignSystemPage';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Root — ProtectedRoute sends unauthenticated users to /login,
          authenticated users get redirected on to /app/dashboard. */}
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />

      {/* Public-only routes — redirect to dashboard if already logged in */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected routes — redirect to login if not authenticated */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />

          {/* Applications — specific paths must come before :id */}
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="applications/new" element={<AddApplicationPage />} />
          <Route path="applications/:id/edit" element={<EditApplicationPage />} />
          <Route path="applications/:id" element={<ApplicationDetailsPage />} />

          {/* Resumes */}
          <Route path="resumes" element={<ResumesPage />} />
          <Route path="resumes/:id" element={<ResumeDetailsPage />} />

          {/* Profile & Account */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />

          {/* Settings */}
          <Route path="settings" element={<SettingsPage />} />

          {/* Any unknown /app/* route → 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>

      {/* Dev-only */}
      <Route path="/design-system" element={<DesignSystemPage />} />

      {/* Global 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
