'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  pulse?: boolean;
}

const variantStyles = {
  default: 'bg-[#F5F5F7] text-[#4A4A6A]',
  primary: 'bg-gradient-to-r from-[#FF5722]/10 to-[#FF8A65]/10 text-[#FF5722] border border-[#FF5722]/20',
  secondary: 'bg-gradient-to-r from-[#1A1A2E]/10 to-[#16213E]/10 text-[#1A1A2E] border border-[#1A1A2E]/20',
  success: 'bg-gradient-to-r from-[#00C853]/10 to-[#69F0AE]/10 text-[#00C853] border border-[#00C853]/20',
  warning: 'bg-gradient-to-r from-[#FF9100]/10 to-[#FFB74D]/10 text-[#FF9100] border border-[#FF9100]/20',
  error: 'bg-gradient-to-r from-[#FF1744]/10 to-[#FF5252]/10 text-[#FF1744] border border-[#FF1744]/20',
  info: 'bg-gradient-to-r from-[#00BCD4]/10 to-[#80DEEA]/10 text-[#00BCD4] border border-[#00BCD4]/20',
  accent: 'bg-gradient-to-r from-[#C6FF00]/20 to-[#EEFF66]/20 text-[#1A1A2E] border border-[#C6FF00]/30',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

function Badge({ className, variant = 'default', size = 'md', icon, pulse, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-all',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5722]"></span>
        </span>
      )}
    </div>
  );
}

// Airbnb-style Listing Card
interface ListingCardProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  location?: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  onSave?: () => void;
  isSaved?: boolean;
}

const ListingCard = forwardRef<HTMLDivElement, ListingCardProps>(
  ({ className, image, title, location, price, rating, reviewCount, badge, onSave, isSaved, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('group cursor-pointer', className)}
        {...props}
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F5F7] mb-3">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {badge && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#FF5722] font-semibold text-xs shadow-lg">
                {badge}
              </span>
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSave?.();
            }}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/70 hover:bg-white transition shadow-lg"
          >
            <svg
              className={cn(
                'w-5 h-5 transition-colors',
                isSaved ? 'fill-[#FF1744] text-[#FF1744]' : 'text-[#1A1A2E]'
              )}
              fill={isSaved ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <div className="px-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-[#1A1A2E] line-clamp-1">{title}</h3>
            {rating && (
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                <svg className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-semibold text-[#1A1A2E]">{rating.toFixed(1)}</span>
                {reviewCount && (
                  <span className="text-sm text-[#8888A8]">({reviewCount})</span>
                )}
              </div>
            )}
          </div>
          {location && (
            <p className="text-sm text-[#4A4A6A] mb-1">{location}</p>
          )}
          <p className="text-sm">
            <span className="font-bold text-[#FF5722]">₹{price.toLocaleString()}</span>
            <span className="text-[#8888A8]"> / day</span>
          </p>
        </div>
      </div>
    );
  }
);
ListingCard.displayName = 'ListingCard';

export { Badge };
