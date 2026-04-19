'use client';

import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  isBefore,
  isAfter,
  addDays,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface CalendarProps {
  mode?: 'single' | 'range';
  selected?: Date | Date[] | null;
  onSelect?: (date: Date | Date[] | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  unavailableDates?: Date[];
  className?: string;
}

export function Calendar({
  mode = 'single',
  selected,
  onSelect,
  minDate,
  maxDate,
  disabledDates = [],
  unavailableDates = [],
  className,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const isDateDisabled = (date: Date) => {
    if (disabledDates.some((d) => isSameDay(d, date))) return true;
    if (minDate && isBefore(date, minDate)) return true;
    if (maxDate && isAfter(date, maxDate)) return true;
    if (unavailableDates.some((d) => isSameDay(d, date))) return true;
    return false;
  };

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some((d) => isSameDay(d, date));
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (mode === 'single') {
      onSelect?.(date);
    } else {
      const selectedDates = (selected as Date[]) || [];
      if (selectedDates.length === 0 || selectedDates.length === 2) {
        onSelect?.([date]);
      } else {
        const [start] = selectedDates;
        if (isBefore(date, start)) {
          onSelect?.([date, start]);
        } else {
          onSelect?.([start, date]);
        }
      }
    }
  };

  const isInRange = (date: Date) => {
    if (mode !== 'range' || !selected || !Array.isArray(selected)) return false;
    const [start, end] = selected;
    if (!start || !end) return false;
    if (hoverDate && isBefore(start, hoverDate) && isAfter(date, start) && isBefore(date, hoverDate)) {
      return true;
    }
    return isWithinInterval(date, { start, end });
  };

  const isRangeStart = (date: Date) => {
    if (mode !== 'range' || !selected || !Array.isArray(selected)) return false;
    const [start] = selected;
    return start && isSameDay(date, start);
  };

  const isRangeEnd = (date: Date) => {
    if (mode !== 'range' || !selected || !Array.isArray(selected)) return false;
    const [, end] = selected;
    return end && isSameDay(date, end);
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="text-lg font-semibold text-[var(--color-text)]">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="py-2 text-xs font-medium text-[var(--color-text-muted)]"
          >
            {day}
          </div>
        ))}

        {days.map((day) => {
          const disabled = isDateDisabled(day);
          const unavailable = isDateUnavailable(day);
          const inCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected =
            mode === 'single'
              ? isSameDay(day, selected as Date)
              : selected && Array.isArray(selected) && selected.some((d) => d && isSameDay(day, d));
          const rangeStart = isRangeStart(day);
          const rangeEnd = isRangeEnd(day);
          const inRange = isInRange(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => setHoverDate(day)}
              onMouseLeave={() => setHoverDate(null)}
              disabled={disabled}
              className={cn(
                'relative h-10 w-full rounded-[var(--radius-md)] text-sm font-medium transition-all',
                !inCurrentMonth && 'text-gray-300',
                inCurrentMonth && !disabled && 'text-[var(--color-text)]',
                disabled && 'cursor-not-allowed text-gray-300',
                unavailable && !disabled && 'bg-red-100 text-red-600',
                isSelected && !rangeStart && !rangeEnd && 'bg-[var(--color-primary)] text-white',
                rangeStart && 'bg-[var(--color-primary)] text-white rounded-l-[var(--radius-md)]',
                rangeEnd && 'bg-[var(--color-primary)] text-white rounded-r-[var(--radius-md)]',
                inRange && !isSelected && 'bg-[var(--color-primary)]/20',
                !disabled && !isSelected && !rangeStart && !rangeEnd && !inRange && 'hover:bg-gray-100',
                'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50'
              )}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface DateRangePickerProps extends CalendarProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onRangeSelect?: (start: Date | null, end: Date | null) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onRangeSelect,
  unavailableDates,
  ...props
}: DateRangePickerProps) {
  const handleSelect = (dates: Date[] | Date | null) => {
    if (!dates || !Array.isArray(dates)) {
      onRangeSelect?.(null, null);
      return;
    }
    onRangeSelect?.(dates[0] || null, dates[1] || null);
  };

  return (
    <Calendar
      mode="range"
      selected={startDate && endDate ? [startDate, endDate] : startDate ? [startDate] : null}
      onSelect={handleSelect}
      unavailableDates={unavailableDates}
      {...props}
    />
  );
}
