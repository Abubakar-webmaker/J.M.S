import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App';
import { AppErrorBoundary } from '@/components/common/AppErrorBoundary/AppErrorBoundary';
import { ToastProvider } from '@/components/ui';
import { AuthProvider } from '@/features/auth/context/AuthProvider';
import { ThemeProvider } from '@/features/theme';
import './index.css';

ReactDOM.createRoot(
  document.getElementById('root')!,
).render(
  <React.StrictMode>
    {/* AppErrorBoundary is outside BrowserRouter intentionally — it catches
        render-time crashes before the router even mounts. It shows a static
        "Reload page" screen so it does not need router access. */}
    <AppErrorBoundary>
      {/* ThemeProvider is outermost so theme applies to every screen,
          including error / loading states. */}
      <ThemeProvider>
        <BrowserRouter>
          {/* AuthProvider is inside BrowserRouter so useNavigate works for
              session-expiry redirects */}
          <AuthProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AppErrorBoundary>
  </React.StrictMode>,
);
