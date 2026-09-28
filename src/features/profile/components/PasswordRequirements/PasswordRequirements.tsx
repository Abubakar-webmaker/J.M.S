import { Check } from 'lucide-react';

import { getPasswordRequirements } from '../../utils/password.utils';

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = getPasswordRequirements(password);

  return (
    <div
      aria-live="polite"
      className="rounded-lg bg-slate-50 p-4"
    >
      <p className="text-sm font-medium text-slate-700">
        Password requirements
      </p>
      <div className="mt-3 space-y-2">
        {requirements.map((req) => (
          <div key={req.key} className="flex items-center gap-2">
            <Check
              className={`h-4 w-4 shrink-0 ${
                req.met ? 'text-green-600' : 'text-slate-300'
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-sm ${
                req.met ? 'text-slate-700' : 'text-slate-500'
              }`}
            >
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
