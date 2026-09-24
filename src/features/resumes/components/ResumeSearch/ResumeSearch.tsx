import { Search } from 'lucide-react';

import { Input } from '@/components/ui';

interface ResumeSearchProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ResumeSearch({
  value,
  onChange,
  disabled = false,
}: ResumeSearchProps) {
  return (
    <div className="w-full lg:max-w-md">
      <Input
        label="Search resumes"
        placeholder="Search by resume name or filename"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        leftIcon={
          <Search
            className="h-4 w-4"
            aria-hidden="true"
          />
        }
        disabled={disabled}
      />
    </div>
  );
}