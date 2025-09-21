
'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { addMonths, subMonths, format, parseISO } from 'date-fns';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { ACADEMIC_EVENTS_BY_SEMESTER, EVENT_CATEGORIES } from '@/lib/data';
import type { AcademicEventV2, EventCategoryKey, SemesterKey } from '@/lib/types';

import CalendarGridView from '@/components/calendar-grid-view';
import EventDetailsModal from '@/components/event-details-modal';

const semesterNames = Object.keys(ACADEMIC_EVENTS_BY_SEMESTER) as SemesterKey[];

export default function AcademicCalendarPage() {
  const [selectedSemester, setSelectedSemester] = useState<SemesterKey>(semesterNames[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<AcademicEventV2 | null>(null);
  const [activeFilters, setActiveFilters] = useState<EventCategoryKey[]>(
    Object.keys(EVENT_CATEGORIES) as EventCategoryKey[]
  );
  
  useEffect(() => {
    // When semester changes, set the month to the first event of that semester
    const firstEvent = ACADEMIC_EVENTS_BY_SEMESTER[selectedSemester]?.[0];
    if (firstEvent) {
      setCurrentMonth(parseISO(firstEvent.startDate));
    }
  }, [selectedSemester]);

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
    const semesterEvents = ACADEMIC_EVENTS_BY_SEMESTER[selectedSemester] || [];
    return semesterEvents.filter(event => activeFilters.includes(event.category));
  }, [activeFilters, selectedSemester]);

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <div>
                <CardTitle>{format(currentMonth, 'MMMM yyyy')}</CardTitle>
                <CardDescription>Your comprehensive academic schedule.</CardDescription>
               </div>
               <div className="flex items-center gap-2">
                 <Select value={selectedSemester} onValueChange={(value) => setSelectedSemester(value as SemesterKey)}>
                    <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                        {semesterNames.map(name => (
                            <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                    </SelectContent>
                 </Select>
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
