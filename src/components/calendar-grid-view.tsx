
'use client';

import { useMemo } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { EVENT_CATEGORIES } from '@/lib/data';
import type { AcademicEventV2 } from '@/lib/types';

interface CalendarGridViewProps {
  currentMonth: Date;
  events: AcademicEventV2[];
  onEventClick: (event: AcademicEventV2) => void;
}

export default function CalendarGridView({ currentMonth, events, onEventClick }: CalendarGridViewProps) {
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(lastDayOfMonth),
  });

  const getEventsForDay = (day: Date) => {
    return events
      .filter(event => isSameDay(parseISO(event.startDate), day))
      .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());
  };
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 border-t border-l">
      {dayNames.map(day => (
        <div key={day} className="p-2 border-b border-r text-center text-sm font-semibold text-muted-foreground bg-muted/20">
          {day}
        </div>
      ))}

      {daysInMonth.map(day => {
        const eventsForDay = getEventsForDay(day);
        return (
          <div
            key={day.toString()}
            className={cn(
              'p-2 min-h-[120px] border-b border-r flex flex-col',
              !isSameMonth(day, currentMonth) && 'bg-muted/50 text-muted-foreground'
            )}
          >
            <div className={cn('font-semibold', isToday(day) && 'bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center')}>
              {format(day, 'd')}
            </div>
            <div className="mt-1 space-y-1 overflow-y-auto">
              {eventsForDay.map(event => (
                <Badge
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="w-full justify-start truncate cursor-pointer text-white"
                  style={{ backgroundColor: EVENT_CATEGORIES[event.category].color }}
                >
                  {event.title}
                </Badge>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
