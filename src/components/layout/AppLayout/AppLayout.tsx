import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <Sidebar />

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-overlay lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="relative z-modal h-full">
              <Sidebar
                mobile
                onClose={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            onMenuClick={() => setMobileMenuOpen(true)}
          />

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}