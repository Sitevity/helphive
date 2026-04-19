'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const selectVariants = cva(
  'flex w-full rounded-[var(--radius-md)] border border-gray-300 bg-white px-3 py-2 text-sm text-[var(--color-text)] transition-all duration-150 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 appearance-none cursor-pointer',
  {
    variants: {
      selectSize: {
        sm: 'h-8 text-xs pr-8',
        md: 'h-10 text-sm pr-10',
        lg: 'h-12 text-base pr-12',
      },
    },
    defaultVariants: {
      selectSize: 'md',
    },
  }
);

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, selectSize, label, error, hint, options, placeholder, disabled, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
            {label}
            {props.required && <span className="ml-1 text-[var(--color-error)]">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              selectVariants({ selectSize }),
              error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20',
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        {error && (
          <p className="mt-1 text-xs text-[var(--color-error)]">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select, selectVariants };
