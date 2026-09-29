/**
 * Endpoints that legitimately return 401 as part of their normal flow
 * (e.g. wrong credentials on login).  A 401 on these should NOT trigger
 * a global session-expiry redirect — the feature itself handles the error.
 */
const AUTH_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/me',
];

export function isAuthEndpoint(url?: string): boolean {
  if (!url) return false;
  return AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}
