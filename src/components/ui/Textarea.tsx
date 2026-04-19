'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
            {label}
            {props.required && <span className="ml-1 text-[var(--color-error)]">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[100px] w-full rounded-[var(--radius-md)] border border-gray-300 bg-white px-3 py-2 text-sm text-[var(--color-text)] transition-all duration-150 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60 resize-none',
            error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20',
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[var(--color-error)]">{error}</p>}
        {hint && !error && (
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
