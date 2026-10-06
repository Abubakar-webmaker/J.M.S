import { AppApiError } from '@/types/api';

export function getProfileErrorMessage(error: AppApiError): string {
  if (error.status === 401) {
    return 'Your session has expired. Please sign in again.';
  }
  if (error.status === 403) {
    return "You don't have permission to update this profile.";
  }
  if (error.status === 404) {
    return 'Unable to load account information. Please try again.';
  }
  if (error.status === 409) {
    return 'This request conflicts with existing data.';
  }
  if (error.status === 422 || error.status === 400) {
    return error.message || 'Please check the information you entered.';
  }
  if (error.status === 429) {
    return 'Too many requests. Please wait and try again.';
  }
  if (error.status === 500) {
    return 'Something went wrong on the server.';
  }
  if (error.status === 503) {
    return 'The profile service is temporarily unavailable.';
  }
  // Network / timeout — status is null
  if (!error.status) {
    if (
      error.message.toLowerCase().includes('connect') ||
      error.message.toLowerCase().includes('network')
    ) {
      return 'Please check your internet connection and try again.';
    }
    if (error.message.toLowerCase().includes('too long')) {
      return 'The request took too long. Please try again.';
    }
  }
  return error.message || 'Something went wrong. Please try again.';
}

export function getDeleteAccountErrorMessage(error: AppApiError): string {
  if (error.status === 401) {
    return 'Your session has expired. Please sign in again.';
  }
  if (error.status === 404) {
    return 'This account no longer exists.';
  }
  if (error.status === 429) {
    return 'Too many requests. Please wait and try again.';
  }
  if (error.status === 500 || error.status === 503) {
    return 'Unable to delete your account right now. Please try again.';
  }
  if (!error.status) {
    return 'Please check your internet connection and try again.';
  }
  return error.message || 'Something went wrong. Please try again.';
}

/** True when the API reported the user is no longer authenticated. */
export function isUnauthorized(error: AppApiError): boolean {
  return error.status === 401;
}

/** True when the API reported the user record could not be found. */
export function isNotFound(error: AppApiError): boolean {
  return error.status === 404;
}

export function getPasswordErrorMessage(error: AppApiError): string {
  if (error.status === 401) {
    return 'Current password is incorrect.';
  }
  if (error.status === 429) {
    return 'Too many attempts. Please wait and try again.';
  }
  if (error.status === 400 || error.status === 422) {
    return error.message || 'Please check the information you entered.';
  }
  if (error.status === 500) {
    return 'Unable to change password. Please try again.';
  }
  return error.message || 'Something went wrong. Please try again.';
}
