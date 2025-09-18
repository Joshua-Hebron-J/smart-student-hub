'use client';

import { useState, useMemo } from 'react';
import { MapPin, User, Clock as ClockIcon } from 'lucide-react';
import { format, getDay } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_STUDENT_TIMETABLE } from '@/lib/data';
import type { TimetableEntry } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const timeSlots = Array.from({ length: 11 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`); // 8 AM to 6 PM
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const eventColorClasses: Record<string, string> = {
  blue: 'from-blue-500 to-cyan-400 text-white',
  green: 'from-green-500 to-emerald-400 text-white',
  purple: 'from-purple-500 to-violet-400 text-white',
  orange: 'from-orange-500 to-amber-400 text-white',
  red: 'from-red-500 to-rose-400 text-white',
  pink: 'from-pink-500 to-fuchsia-400 text-white',
};

const ClassCard = ({ event }: { event: TimetableEntry }) => (
    <Dialog>
        <DialogTrigger asChild>
            <div
                className={cn(
                    'absolute p-3 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md',
                    'bg-gradient-to-br',
                    eventColorClasses[event.color]
                )}
                style={calculateGridPosition(event)}
            >
                <p className="font-bold text-sm truncate">{event.title}</p>
                <p className="text-xs opacity-80">{event.startTime} - {event.endTime}</p>
                <p className="text-xs opacity-80 truncate flex items-center gap-1"><MapPin size={12}/>{event.location}</p>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{event.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="flex items-center gap-3">
                    <ClockIcon className="h-5 w-5 text-muted-foreground"/>
                    <p>{event.startTime} - {event.endTime}</p>
                </div>
                 <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground"/>
                    <p>{event.location}</p>
                </div>
                {event.description && (
                    <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground"/>
                        <p>{event.description}</p>
                    </div>
                )}
            </div>
        </DialogContent>
    </Dialog>
);

const calculateGridPosition = (event: TimetableEntry) => {
    const startHour = parseInt(event.startTime.split(':')[0]);
    const startMinute = parseInt(event.startTime.split(':')[1]);
    const endHour = parseInt(event.endTime.split(':')[0]);
    const endMinute = parseInt(event.endTime.split(':')[1]);

    const top = (startHour - 8 + startMinute / 60) * 64; // 64px per hour
    const height = (endHour - startHour + (endMinute - startMinute) / 60) * 64;

    return {
      top: `${top}px`,
      height: `${height}px`,
      left: '0.5rem',
      right: '0.5rem',
    };
};

export default function StudentTimetablePage() {
  const events = MOCK_STUDENT_TIMETABLE;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>My Weekly Timetable</CardTitle>
        <CardDescription>Your class schedule for the current semester.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr] min-w-[800px] overflow-x-auto">
            {/* Empty corner */}
            <div className="row-start-1 col-start-1"></div>
            
            {/* Day Headers */}
            {days.map((day, index) => (
                <div key={day} className="col-start-2 row-start-1 text-center py-2 font-semibold" style={{gridColumn: index + 2}}>
                    {day}
                </div>
            ))}
            
            {/* Time Slots and Grid */}
            {timeSlots.map((time, timeIndex) => (
                <div key={time} className="row-start-2 col-start-1 grid" style={{ gridRow: timeIndex + 2, height: '64px'}}>
                    <div className="text-right text-xs text-muted-foreground pr-2 -mt-2">{format(new Date(`1970-01-01T${time}`), 'h a')}</div>
                </div>
            ))}
            
            {/* Day Columns */}
            {days.map((day, dayIndex) => (
                <div key={day} className="relative row-start-2 border-l" style={{gridColumn: dayIndex + 2, gridRow: '2 / span 11'}}>
                    {/* Grid lines for each hour */}
                    {timeSlots.slice(1).map((_, i) => (
                        <div key={i} className="h-[64px] border-t"></div>
                    ))}

                    {/* Events */}
                    {events.filter(e => e.day === day).map(event => (
                        <ClassCard key={event.id} event={event} />
                    ))}
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
