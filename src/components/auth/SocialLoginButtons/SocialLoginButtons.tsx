/**
 * Social Login Buttons Component
 * 
 * Features:
 * - Google OAuth button
 * - LinkedIn OAuth button
 * - Loading states
 * - Error handling
 */

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => Promise<void>;
  onLinkedInLogin?: () => Promise<void>;
  loading?: boolean;
  disabled?: boolean;
}

export function SocialLoginButtons({
  onGoogleLogin,
  onLinkedInLogin,
  loading = false,
  disabled = false,
}: SocialLoginButtonsProps) {
  const handleGoogleClick = async () => {
    try {
      await onGoogleLogin?.();
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleLinkedInClick = async () => {
    try {
      await onLinkedInLogin?.();
    } catch (error) {
      console.error('LinkedIn login failed:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleClick}
        disabled={loading || disabled}
        className="flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-surface px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-neutral-900 transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        aria-label="Sign in with Google"
      >
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span className="hidden sm:inline">Google</span>
      </button>

      {/* LinkedIn Button */}
      <button
        type="button"
        onClick={handleLinkedInClick}
        disabled={loading || disabled}
        className="flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-surface px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-neutral-900 transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        aria-label="Sign in with LinkedIn"
      >
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.05-8.811 0-9.728h3.554v1.375c.428-.659 1.194-1.595 2.905-1.595 2.121 0 3.71 1.386 3.71 4.365v5.583zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.705 0-.948.77-1.704 1.915-1.704 1.144 0 1.915.756 1.915 1.704 0 .947-.771 1.705-1.915 1.705zm1.589 11.597H3.748V9.579h3.178v10.873zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
            fill="#0A66C2"
          />
        </svg>
        <span className="hidden sm:inline">LinkedIn</span>
      </button>
    </div>
  );
}
