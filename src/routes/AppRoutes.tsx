import { Navigate, Route, Routes } from 'react-router';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={<PlaceholderPage title="Login" />}
      />

      <Route
        path="/register"
        element={<PlaceholderPage title="Register" />}
      />

      <Route
        path="/forgot-password"
        element={<PlaceholderPage title="Forgot Password" />}
      />

      <Route
        path="/reset-password"
        element={<PlaceholderPage title="Reset Password" />}
      />

      {/* Application routes */}
      <Route
        path="/app/dashboard"
        element={<PlaceholderPage title="Dashboard" />}
      />

      <Route
        path="/app/applications"
        element={<PlaceholderPage title="Applications" />}
      />

      <Route
        path="/app/applications/new"
        element={<PlaceholderPage title="Add Application" />}
      />

      <Route
        path="/app/applications/:id"
        element={<PlaceholderPage title="Application Details" />}
      />

      <Route
        path="/app/resumes"
        element={<PlaceholderPage title="Resumes" />}
      />

      <Route
        path="/app/profile"
        element={<PlaceholderPage title="Profile" />}
      />

      <Route
        path="/app/change-password"
        element={<PlaceholderPage title="Change Password" />}
      />

      {/* Default */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={<PlaceholderPage title="Page Not Found" />}
      />
    </Routes>
  );
}