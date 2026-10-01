import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';

export function ResetPasswordForm() {
  // Password reset is now handled entirely inside the forgot-password
  // flow (email → OTP → new password). This route only remains as a
  // fallback for old bookmarked reset links.
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-100 text-danger-600">
          <AlertCircle className="h-6 w-6" strokeWidth={2} />
        </div>
      </div>

      <p className="text-lg font-semibold text-neutral-900">Link no longer supported</p>
      <p className="mt-2 text-sm text-neutral-600">
        Password reset links are no longer used. Request a reset code to
        set a new password.
      </p>

      <Link
        to="/forgot-password"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
      >
        Request a reset code
      </Link>
    </div>
  );
}
