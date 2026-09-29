export const PROFILE_NAME_RULES = {
  minLength: 2,
  maxLength: 100,
} as const;

export const PASSWORD_RULES = {
  minLength: 8,
  maxLength: 128,
} as const;

export const PASSWORD_REQUIREMENTS = [
  {
    key: 'length',
    label: 'At least 8 characters',
  },
] as const;
