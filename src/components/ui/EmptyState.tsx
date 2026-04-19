'use client';

import { cn } from '@/lib/utils';
import { Button } from './Button';
import {
  Search,
  Package,
  Calendar,
  MessageCircle,
  Star,
  Inbox,
  AlertCircle,
  Compass,
  MapPin,
  Users,
} from 'lucide-react';

type EmptyStateType =
  | 'no-results'
  | 'no-bookings'
  | 'no-vehicles'
  | 'no-experiences'
  | 'no-messages'
  | 'no-reviews'
  | 'error'
  | 'no-data'
  | 'explore'
  | 'location'
  | 'users';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const emptyStateConfig: Record<
  EmptyStateType,
  { icon: React.ElementType; defaultTitle: string; defaultDescription: string }
> = {
  'no-results': {
    icon: Search,
    defaultTitle: 'No results found',
    defaultDescription: 'Try adjusting your search or filters to find what you\'re looking for.',
  },
  'no-bookings': {
    icon: Calendar,
    defaultTitle: 'No bookings yet',
    defaultDescription: 'Start exploring vehicles or experiences to make your first booking.',
  },
  'no-vehicles': {
    icon: Package,
    defaultTitle: 'No vehicles listed',
    defaultDescription: 'Add your first vehicle to start earning.',
  },
  'no-experiences': {
    icon: Compass,
    defaultTitle: 'No experiences available',
    defaultDescription: 'Check back later for exciting local experiences.',
  },
  'no-messages': {
    icon: MessageCircle,
    defaultTitle: 'No messages yet',
    defaultDescription: 'Start a conversation with a host or guide.',
  },
  'no-reviews': {
    icon: Star,
    defaultTitle: 'No reviews yet',
    defaultDescription: 'Be the first to share your experience.',
  },
  error: {
    icon: AlertCircle,
    defaultTitle: 'Something went wrong',
    defaultDescription: 'We encountered an error. Please try again later.',
  },
  'no-data': {
    icon: Inbox,
    defaultTitle: 'No data available',
    defaultDescription: 'There\'s nothing to show here yet.',
  },
  explore: {
    icon: MapPin,
    defaultTitle: 'Explore nearby',
    defaultDescription: 'Discover amazing vehicles and experiences in your area.',
  },
  location: {
    icon: MapPin,
    defaultTitle: 'Location not set',
    defaultDescription: 'Enable location access to see nearby options.',
  },
  users: {
    icon: Users,
    defaultTitle: 'No users found',
    defaultDescription: 'Try adjusting your search criteria.',
  },
};

export function EmptyState({
  type = 'no-data',
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <Icon className="h-8 w-8 text-[var(--color-text-muted)]" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[var(--color-text)]">
        {title || config.defaultTitle}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-[var(--color-text-muted)]">
        {description || config.defaultDescription}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
