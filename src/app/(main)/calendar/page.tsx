
'use client';

import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_ACADEMIC_EVENTS } from '@/lib/data';
import type { AcademicEvent } from '@/lib/types';

const colorClasses = {
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  yellow: 'bg-yellow-500',
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const eventsByDate = useMemo(() => {
    return MOCK_ACADEMIC_EVENTS.reduce((acc, event) => {
      const eventDate = new Date(event.date);
      // Adjust for timezone differences by using UTC dates
      const dateKey = new Date(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate()).toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {} as Record<string, AcademicEvent[]>);
  }, []);

  const selectedDayEvents = date ? eventsByDate[date.toDateString()] || [] : [];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Academic Calendar</CardTitle>
          <CardDescription>Key dates and events for the academic year.</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border p-0"
            components={{
              DayContent: ({ date, ...props }) => {
                const dayEvents = eventsByDate[date.toDateString()];
                
                return (
                  <div className="relative h-full w-full flex items-center justify-center">
                    {/* Default day number from react-day-picker */}
                    {props.children}
                    
                    {dayEvents && (
                      <div className="absolute bottom-1 flex gap-0.5">
                        {dayEvents.slice(0, 3).map((event, i) => (
                           <div key={i} className={`h-1.5 w-1.5 rounded-full ${colorClasses[event.color]}`} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Events for {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : 'Today'}</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDayEvents.length > 0 ? (
            <ul className="space-y-3">
              {selectedDayEvents.map((event, index) => (
                <li key={index} className="flex items-start gap-3">
                   <div className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-full ${colorClasses[event.color]}`} />
                   <span>{event.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No events scheduled for this day.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
