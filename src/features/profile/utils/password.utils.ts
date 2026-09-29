import { PASSWORD_RULES } from '../constants/profile.constants';

export interface PasswordRequirement {
  key: string;
  label: string;
  met: boolean;
}

export function getPasswordRequirements(
  password: string,
): PasswordRequirement[] {
  return [
    {
      key: 'length',
      label: `At least ${PASSWORD_RULES.minLength} characters`,
      met: password.length >= PASSWORD_RULES.minLength,
    },
  ];
}
