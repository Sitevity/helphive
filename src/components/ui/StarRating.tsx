'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  className,
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const halfFilled = !filled && i < rating;

          return (
            <Star
              key={i}
              className={cn(
                sizeClasses[size],
                filled
                  ? 'fill-[var(--color-warning)] text-[var(--color-warning)]'
                  : halfFilled
                  ? 'fill-[var(--color-warning)]/50 text-[var(--color-warning)]'
                  : 'fill-gray-200 text-gray-300'
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-medium text-[var(--color-text)]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

interface InteractiveStarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  allowHalf?: boolean;
  className?: string;
}

export function InteractiveStarRating({
  value,
  onChange,
  maxRating = 5,
  size = 'lg',
  allowHalf = false,
  className,
}: InteractiveStarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (index: number, isHalf: boolean) => {
    const newValue = isHalf && allowHalf ? index + 0.5 : index + 1;
    onChange(newValue);
  };

  const handleMouseMove = (index: number, event: React.MouseEvent) => {
    if (!allowHalf) return;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    setHoverValue(isHalf ? index + 0.5 : index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const displayValue = hoverValue ?? value;

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxRating }).map((_, i) => {
        const filled = i < Math.floor(displayValue);
        const halfFilled = !filled && i < displayValue;

        return (
          <div
            key={i}
            className="cursor-pointer transition-transform hover:scale-110"
            onClick={(e) => {
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              const x = e.clientX - rect.left;
              const isHalf = allowHalf && x < rect.width / 2;
              handleClick(i, isHalf);
            }}
            onMouseMove={(e) => handleMouseMove(i, e)}
          >
            <Star
              className={cn(
                sizeClasses[size],
                filled
                  ? 'fill-[var(--color-warning)] text-[var(--color-warning)]'
                  : halfFilled
                  ? 'fill-[var(--color-warning)]/50 text-[var(--color-warning)]'
                  : 'fill-gray-200 text-gray-300'
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

interface RatingSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
  className?: string;
}

export function RatingSummary({
  averageRating,
  totalReviews,
  ratingDistribution,
  className,
}: RatingSummaryProps) {
  const maxCount = Math.max(...Object.values(ratingDistribution), 1);

  return (
    <div className={cn('flex gap-6', className)}>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold text-[var(--color-text)]">
          {averageRating.toFixed(1)}
        </span>
        <StarRating rating={averageRating} size="md" className="mt-1" />
        <span className="mt-1 text-sm text-[var(--color-text-muted)]">
          {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
        </span>
      </div>
      <div className="flex-1 space-y-1">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-2">
            <span className="w-3 text-sm text-[var(--color-text-muted)]">{stars}</span>
            <Star className="h-3 w-3 fill-[var(--color-warning)] text-[var(--color-warning)]" />
            <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--color-warning)]"
                style={{ width: `${(ratingDistribution[stars] / maxCount) * 100}%` }}
              />
            </div>
            <span className="w-8 text-right text-sm text-[var(--color-text-muted)]">
              {ratingDistribution[stars]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
