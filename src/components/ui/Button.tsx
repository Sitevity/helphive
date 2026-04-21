'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'text-white bg-gradient-to-r from-[#FF5722] to-[#FF8A65] hover:shadow-[0_0_30px_rgba(255,87,34,0.4)] hover:-translate-y-0.5',
        secondary: 'text-white bg-gradient-to-r from-[#1A1A2E] to-[#16213E] hover:shadow-lg hover:-translate-y-0.5',
        accent: 'text-[#1A1A2E] bg-gradient-to-r from-[#C6FF00] to-[#EEFF66] hover:shadow-[0_0_20px_rgba(198,255,0,0.4)] hover:-translate-y-0.5',
        outline: 'border-2 border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white',
        ghost: 'text-[#1A1A2E] hover:bg-[#F5F5F7]',
        danger: 'text-white bg-gradient-to-r from-[#FF1744] to-[#FF5252]',
        success: 'text-white bg-gradient-to-r from-[#00C853] to-[#69F0AE]',
        glass: 'text-white bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-[20px]',
        md: 'h-11 px-5 text-sm rounded-[20px]',
        lg: 'h-12 px-6 text-base rounded-[20px]',
        xl: 'h-14 px-8 text-lg rounded-[20px]',
        icon: 'h-11 w-11 rounded-[20px]',
        'icon-sm': 'h-9 w-9 rounded-[16px]',
        'icon-lg': 'h-12 w-12 rounded-[24px]',
        full: 'w-full h-12 text-base rounded-[20px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
