
'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, getDay, isSameDay, isToday } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_FACULTY_TIMETABLE } from '@/lib/data';
import type { TimetableEntry } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const timeSlots = Array.from({ length: 15 }, (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`); // 7 AM to 9 PM

const eventColorClasses = {
  blue: 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/50 dark:border-blue-700 dark:text-blue-300',
  green: 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300',
  purple: 'bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900/50 dark:border-purple-700 dark:text-purple-300',
  orange: 'bg-orange-100 border-orange-500 text-orange-800 dark:bg-orange-900/50 dark:border-orange-700 dark:text-orange-300',
  red: 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/50 dark:border-red-700 dark:text-red-300',
  pink: 'bg-pink-100 border-pink-500 text-pink-800 dark:bg-pink-900/50 dark:border-pink-700 dark:text-pink-300',
};

const dayMapping = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export default function FacultyTimetablePage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const week = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return {
      days: eachDayOfInterval({ start, end }),
      display: `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`
    };
  }, [currentDate]);

  const events = MOCK_FACULTY_TIMETABLE;

  const getEventsForDay = (day: Date) => {
    const dayName = dayMapping[getDay(day)];
    return events.filter(event => event.day === dayName);
  };

  const calculateGridPosition = (event: TimetableEntry) => {
    const startHour = parseInt(event.startTime.split(':')[0]);
    const startMinute = parseInt(event.startTime.split(':')[1]);
    const endHour = parseInt(event.endTime.split(':')[0]);
    const endMinute = parseInt(event.endTime.split(':')[1]);

    const startRow = (startHour - 7) * 4 + (startMinute / 15) + 2;
    const endRow = (endHour - 7) * 4 + (endMinute / 15) + 2;

    return {
      gridRow: `${startRow} / ${endRow}`
    };
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>My Weekly Timetable</CardTitle>
            <CardDescription>Your teaching and office hours schedule.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setCurrentDate(subDays(currentDate, 7))}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Today</Button>
            <Button variant="outline" onClick={() => setCurrentDate(addDays(currentDate, 7))}><ChevronRight className="h-4 w-4" /></Button>
            <div className="hidden sm:block border rounded-md px-3 py-2 text-sm font-medium min-w-[200px] text-center">
              {week.display}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="grid min-w-[1200px]" style={{ gridTemplateColumns: 'auto repeat(7, 1fr)', gridTemplateRows: 'auto repeat(60, 15px)' }}>
            {/* Time Column */}
            <div className="col-start-1 row-start-1 sticky left-0 bg-background z-10 pr-2"></div>
            {timeSlots.map((time, index) => (
              <div key={time} className="row-start-2 col-start-1 text-right text-xs text-muted-foreground pr-2" style={{ gridRow: index * 4 + 2 }}>
                {format(new Date(`1970-01-01T${time}`), 'h a')}
              </div>
            ))}

            {/* Day Headers */}
            {week.days.map((day, index) => (
              <div key={day.toString()} className="col-start-2 row-start-1 text-center py-2 border-b" style={{ gridColumn: index + 2 }}>
                <p className="text-sm font-medium">{format(day, 'E')}</p>
                <p className={cn("text-lg font-bold", isToday(day) && "text-primary")}>{format(day, 'd')}</p>
              </div>
            ))}

            {/* Grid Lines */}
            {Array.from({length: 15 * 7}).map((_, i) => (
                 <div key={i} className="border-r border-t" style={{gridColumn: `${(i % 7) + 2}`, gridRow: `${Math.floor(i / 7) * 4 + 2} / span 4` }}></div>
            ))}

            {/* Events */}
            {week.days.map((day, dayIndex) => {
              const dayEvents = getEventsForDay(day);
              return dayEvents.map(event => (
                <Popover key={event.id}>
                  <PopoverTrigger asChild>
                    <div
                      className={cn(
                        'p-2 text-xs rounded-lg border-l-4 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity',
                        eventColorClasses[event.color]
                      )}
                      style={{
                        ...calculateGridPosition(event),
                        gridColumn: dayIndex + 2
                      }}
                    >
                      <p className="font-bold truncate">{event.title}</p>
                      <p className="truncate">{event.location}</p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                            {format(new Date(`1970-01-01T${event.startTime}`), 'h:mm a')} - {format(new Date(`1970-01-01T${event.endTime}`), 'h:mm a')}
                        </p>
                        <p className="text-sm flex items-center gap-2">
                           <MapPin className="h-4 w-4" /> {event.location}
                        </p>
                        {event.description && <p className="text-sm">{event.description}</p>}
                    </div>
                  </PopoverContent>
                </Popover>
              ))
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
