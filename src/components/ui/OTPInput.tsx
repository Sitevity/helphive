'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  error,
  disabled,
  className,
}: OTPInputProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[activeIndex]) {
      inputRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  const handleChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return;

    const newValue = value.split('');
    newValue[index] = char;
    onChange(newValue.join(''));

    if (char && index < length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (value[index]) {
        const newValue = value.split('');
        newValue[index] = '';
        onChange(newValue.join(''));
      } else if (index > 0) {
        setActiveIndex(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);
    setActiveIndex(Math.min(pastedData.length, length - 1));
  };

  return (
    <div className={cn('flex gap-2 justify-center', className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => setActiveIndex(index)}
          onPaste={index === 0 ? handlePaste : undefined}
          disabled={disabled}
          className={cn(
            'h-14 w-12 rounded-[var(--radius-md)] border-2 text-center text-xl font-semibold transition-all duration-150',
            'focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20',
            error
              ? 'border-[var(--color-error)] bg-red-50'
              : 'border-gray-300 bg-white',
            disabled && 'cursor-not-allowed bg-gray-100 opacity-60',
            value[index] && !error && 'border-[var(--color-success)] bg-green-50',
            'animate-fade-in'
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        />
      ))}
    </div>
  );
}
