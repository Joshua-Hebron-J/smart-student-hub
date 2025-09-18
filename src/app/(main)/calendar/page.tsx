'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { addMonths, subMonths, format } from 'date-fns';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { ACADEMIC_EVENTS, EVENT_CATEGORIES } from '@/lib/calendar-data';
import type { AcademicEventV2, EventCategoryKey } from '@/lib/types';

import CalendarGridView from '@/components/calendar-grid-view';
import EventDetailsModal from '@/components/event-details-modal';

export default function AcademicCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<AcademicEventV2 | null>(null);
  const [activeFilters, setActiveFilters] = useState<EventCategoryKey[]>(
    Object.keys(EVENT_CATEGORIES) as EventCategoryKey[]
  );

  const handleFilterChange = (category: EventCategoryKey) => {
    setActiveFilters(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
  };

  const filteredEvents = useMemo(() => {
    return ACADEMIC_EVENTS.filter(event => activeFilters.includes(event.category));
  }, [activeFilters]);

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{format(currentMonth, 'MMMM yyyy')}</CardTitle>
              <CardDescription>Your comprehensive academic schedule.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CalendarGridView
              currentMonth={currentMonth}
              events={filteredEvents}
              onEventClick={setSelectedEvent}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Event Filters</CardTitle>
            <CardDescription>Select categories to display.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(EVENT_CATEGORIES).map(([key, { label, color }]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={activeFilters.includes(key as EventCategoryKey)}
                  onCheckedChange={() => handleFilterChange(key as EventCategoryKey)}
                  style={{ borderColor: color, backgroundColor: activeFilters.includes(key as EventCategoryKey) ? color : 'transparent' }}
                />
                <Label htmlFor={key} className="flex-1">{label}</Label>
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
              </div>
            ))}
             <Button variant="ghost" size="sm" className="w-full justify-start text-red-500 hover:text-red-600" onClick={clearFilters} disabled={activeFilters.length === 0}>
              <X className="mr-2 h-4 w-4"/> Clear All Filters
            </Button>
          </CardContent>
        </Card>
      </div>

      <EventDetailsModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
