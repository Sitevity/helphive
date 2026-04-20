'use client';

import Link from 'next/link';
import { Calendar, MapPin, Star, Clock, MoreVertical, MessageCircle, X, Check } from 'lucide-react';
import { Booking } from '@/types';
import { formatCurrency, cn } from '@/lib/utils';
import { Card, Badge, Button } from '@/components/ui';

interface BookingCardProps {
  booking: Booking;
  showActions?: boolean;
  onCancel?: (bookingId: string) => void;
  onMessage?: (bookingId: string) => void;
  onComplete?: (bookingId: string) => void;
  className?: string;
}

export function BookingCard({
  booking,
  showActions = true,
  onCancel,
  onMessage,
  onComplete,
  className,
}: BookingCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'error';
      case 'in_progress':
        return 'primary';
      default:
        return 'default';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant(booking.status)} size="sm">
              {booking.status.replace('_', ' ')}
            </Badge>
            <span className="text-xs text-[var(--color-text-muted)]">
              #{booking.id.slice(0, 8)}
            </span>
          </div>

          <h3 className="font-medium text-[var(--color-text)] mt-2 truncate">
            {booking.vehicleId ? 'Vehicle Rental' : 'Experience Booking'}
          </h3>

          <div className="mt-2 space-y-1 text-sm text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(booking.startDate)}</span>
              {booking.endDate && (
                <>
                  <span> - </span>
                  <span>{formatDate(booking.endDate)}</span>
                </>
              )}
            </div>

            {booking.pickupLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{booking.pickupLocation}</span>
              </div>
            )}

            {booking.participants && (
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>{booking.participants} participant(s)</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-right ml-4">
          <p className="text-lg font-bold text-[var(--color-primary)]">
            {formatCurrency(booking.totalAmount)}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {booking.paymentStatus === 'paid' ? 'Paid' : booking.paymentStatus}
          </p>
        </div>
      </div>

      {showActions && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
          {booking.status === 'pending' && onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCancel(booking.id)}
              className="text-[var(--color-error)]"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          )}

          {booking.status === 'confirmed' && onMessage && (
            <Button variant="secondary" size="sm" onClick={() => onMessage(booking.id)}>
              <MessageCircle className="h-4 w-4 mr-1" />
              Message
            </Button>
          )}

          {booking.status === 'in_progress' && onComplete && (
            <Button size="sm" onClick={() => onComplete(booking.id)}>
              <Check className="h-4 w-4 mr-1" />
              Complete
            </Button>
          )}

          <Link href={`/bookings/${booking.id}`} className="ml-auto">
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
}

interface BookingListProps {
  bookings: Booking[];
  isLoading?: boolean;
  emptyType?: 'no-bookings' | 'no-bookings-found';
  onCancel?: (bookingId: string) => void;
  onMessage?: (bookingId: string) => void;
  onComplete?: (bookingId: string) => void;
}

export function BookingList({
  bookings,
  isLoading,
  emptyType = 'no-bookings',
  onCancel,
  onMessage,
  onComplete,
}: BookingListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="h-6 bg-gray-200 rounded animate-shimmer w-1/3" />
            <div className="h-4 bg-gray-200 rounded animate-shimmer w-1/2 mt-3" />
            <div className="h-4 bg-gray-200 rounded animate-shimmer w-1/4 mt-2" />
          </Card>
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-text-muted)]">
          {emptyType === 'no-bookings'
            ? 'No bookings yet'
            : 'No bookings match your search'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={onCancel}
          onMessage={onMessage}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}
