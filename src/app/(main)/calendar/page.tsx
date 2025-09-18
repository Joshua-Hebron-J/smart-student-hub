
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const academicEvents = [
  // Fall Semester 2024
  { date: '2024-08-19', title: 'Fall Semester Begins', color: 'bg-green-500' },
  { date: '2024-08-26', title: 'Last Day for Course Registration', color: 'bg-orange-500' },
  { date: '2024-09-02', title: 'Labor Day - No Classes', color: 'bg-red-500' },
  { date: '2024-09-16', title: 'Internal Assessment I Begins', color: 'bg-blue-500' },
  { date: '2024-09-20', title: 'Internal Assessment I Ends', color: 'bg-blue-500' },
  { date: '2024-10-11', title: 'Professional Development Day - No Classes', color: 'bg-orange-500' },
  { date: '2024-10-14', title: 'Mid-term Exams Start', color: 'bg-purple-500' },
  { date: '2024-10-18', title: 'Mid-term Exams End', color: 'bg-purple-500' },
  { date: '2024-11-04', title: 'Internal Assessment II Begins', color: 'bg-blue-500' },
  { date: '2024-11-08', title: 'Internal Assessment II Ends', color: 'bg-blue-500' },
  { date: '2024-11-11', title: 'Diwali - Holiday', color: 'bg-red-500' },
  { date: '2024-11-27', title: 'Thanksgiving Break Begins', color: 'bg-orange-500' },
  { date: '2024-12-02', title: 'Classes Resume', color: 'bg-green-500' },
  { date: '2024-12-09', title: 'Final Exams Start', color: 'bg-purple-500' },
  { date: '2024-12-20', title: 'Fall Semester Ends', color: 'bg-red-500' },
  { date: '2024-12-23', title: 'Winter Break Begins', color: 'bg-orange-500' },
  
  // Spring Semester 2025
  { date: '2025-01-06', title: 'Winter Break Ends', color: 'bg-green-500' },
  { date: '2025-01-13', title: 'Spring Semester Begins', color: 'bg-green-500' },
  { date: '2025-01-20', title: 'Martin Luther King Jr. Day - No Classes', color: 'bg-red-500' },
  { date: '2025-01-26', title: 'Republic Day', color: 'bg-red-500' },
  { date: '2025-02-17', title: 'Internal Assessment III Begins', color: 'bg-blue-500' },
  { date: '2025-02-21', title: 'Internal Assessment III Ends', color: 'bg-blue-500' },
  { date: '2025-03-03', title: 'Mid-term Exams Start', color: 'bg-purple-500' },
  { date: '2025-03-07', title: 'Mid-term Exams End', color: 'bg-purple-500' },
  { date: '2025-03-10', title: 'Spring Break Begins', color: 'bg-orange-500' },
  { date: '2025-03-17', title: 'Classes Resume', color: 'bg-green-500' },
  { date: '2025-04-07', title: 'Internal Assessment IV Begins', color: 'bg-blue-500' },
  { date: '2025-04-11', title: 'Internal Assessment IV Ends', color: 'bg-blue-500' },
  { date: '2025-04-18', title: 'University Fest "SYNERGY 2025"', color: 'bg-pink-500' },
  { date: '2025-04-28', title: 'Final Exams Start', color: 'bg-purple-500' },
  { date: '2025-05-09', title: 'Spring Semester Ends', color: 'bg-red-500' },
  { date: '2025-05-10', title: 'Commencement Ceremony', color: 'bg-yellow-500' },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const eventsByDate = academicEvents.reduce((acc, event) => {
    const eventDate = new Date(event.date);
    // Adjust for timezone differences by using UTC dates
    const dateKey = new Date(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate()).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, typeof academicEvents>);

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
              DayContent: ({ date }) => {
                const events = eventsByDate[date.toDateString()];
                return (
                  <div className="relative h-full w-full">
                    <span className="relative z-10">{date.getDate()}</span>
                    {events && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {events.slice(0, 3).map((event, i) => (
                           <div key={i} className={`h-1.5 w-1.5 rounded-full ${event.color}`} />
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
                   <div className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-full ${event.color}`} />
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
