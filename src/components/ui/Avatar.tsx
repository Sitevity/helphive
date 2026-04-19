'use client';

import { forwardRef, HTMLAttributes, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';

const avatarVariants = cva(
  'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 font-medium text-gray-600',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-[10px]',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
        '2xl': 'h-20 w-20 text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
  fallback?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const [imageError, setImageError] = useState(false);

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
            {fallback ? getInitials(fallback) : '?'}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

const AvatarGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { max?: number }>(
  ({ className, children, max, ...props }, ref) => {
    const childArray = Array.isArray(children) ? children : [children];
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const remainingCount = max ? childArray.length - max : 0;

    return (
      <div ref={ref} className={cn('flex items-center', className)} {...props}>
        {visibleChildren.map((child, index) => (
          <div
            key={index}
            className={cn('ring-2 ring-white', index > 0 && '-ml-2')}
          >
            {child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={cn(
              avatarVariants({ size: 'md' }),
              '-ml-2 ring-2 ring-white bg-gray-300 text-gray-700 font-semibold'
            )}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup };
