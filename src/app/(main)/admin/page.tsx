'use client';

import { Users, Building, ClipboardList, Search, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MOCK_STUDENTS, MOCK_FACULTY, MOCK_ACTIVITIES, ACADEMIC_EVENTS_BY_SEMESTER } from '@/lib/data';
import { EVENT_CATEGORIES } from '@/lib/calendar-data';
import type { Student, AcademicEventV2 } from '@/lib/types';
import { useState } from 'react';
import { naturalLanguageStudentSearch } from '@/ai/flows/ai-natural-language-student-search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { isFuture, isToday, parseISO, startOfToday, compareAsc } from 'date-fns';

function AdminStudentSearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Student[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const studentDataForAI = MOCK_STUDENTS.map(student => ({
        name: student.name,
        skills: student.skills,
        interests: student.interests,
        areaOfInterest: student.areaOfInterest,
      }));

      const response = await naturalLanguageStudentSearch({
        query,
        students: studentDataForAI,
      });
      const foundStudents = MOCK_STUDENTS.filter(student => response.studentNames.includes(student.name));
      setResults(foundStudents);
    } catch (error) {
        console.error('AI Search Error:', error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
     <Card>
      <CardHeader>
        <CardTitle>Student Search</CardTitle>
        <CardDescription>Use natural language to find any student in the university.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
          <Input 
            placeholder="e.g., 'Find students good at Python'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : <Search className="h-4 w-4" />}
          </Button>
        </form>
        <div className="mt-4 space-y-4">
          {results.map(student => (
            <div key={student.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={student.avatarUrl} alt={student.name} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.department}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/students/${student.id}`}>
                  View Portfolio
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function UpcomingEventsWidget() {
  const today = startOfToday();
  const allEvents = Object.values(ACADEMIC_EVENTS_BY_SEMESTER).flat();

  const upcomingEvents = allEvents
    .map(event => ({ ...event, date: parseISO(event.startDate) }))
    .filter(event => isToday(event.date) || isFuture(event.date))
    .sort((a, b) => compareAsc(a.date, b.date))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Upcoming Events</CardTitle>
        <CardDescription>The next 5 events on the academic calendar.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map(event => (
            <div key={event.id} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                 <div 
                  className="h-3 w-3 mt-1.5 rounded-full" 
                  style={{ backgroundColor: EVENT_CATEGORIES[event.category].color }}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


export default function AdminDashboard() {
  const studentsCount = MOCK_STUDENTS.length;
  const facultyCount = MOCK_FACULTY.length;
  const activitiesCount = MOCK_ACTIVITIES.length;
  
  const departmentData = MOCK_STUDENTS.reduce((acc, student) => {
    acc[student.department] = (acc[student.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(departmentData).map(([name, value]) => ({ name, students: value }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-headline font-semibold">Admin Dashboard</h1>
        <p className="text-muted-foreground italic text-sm mt-1">"The best way to predict the future is to create it."</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facultyCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activitiesCount}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
             <AdminStudentSearch />
        </div>
        <div className="lg:col-span-2">
            <UpcomingEventsWidget />
        </div>
      </div>
       <Card>
            <CardHeader>
                <CardTitle>Student Distribution by Department</CardTitle>
                <CardDescription>A breakdown of students across different departments.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false}/>
                        <Tooltip cursor={{fill: 'hsl(var(--primary) / 0.1)'}}/>
                        <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    </div>
  );
}
