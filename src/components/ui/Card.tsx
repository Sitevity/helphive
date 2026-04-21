'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'interactive' | 'glass';
  glow?: boolean;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = 'none', variant = 'default', glow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl bg-white overflow-hidden',
        paddingStyles[padding],
        variant === 'default' && 'shadow-[0_4px_20px_rgba(26,26,46,0.06)]',
        variant === 'interactive' && 'shadow-[0_4px_20px_rgba(26,26,46,0.06)] hover:shadow-[0_12px_40px_rgba(26,26,46,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer',
        variant === 'glass' && 'bg-white/70 backdrop-blur-xl border border-white/30',
        glow && 'shadow-[0_0_40px_rgba(255,87,34,0.2)]',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

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

export { Card, ListingCard };
