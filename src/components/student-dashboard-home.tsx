'use client';

import { Award, BarChart, Calendar, Activity as ActivityIcon, Percent, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { startOfToday, isFuture, parseISO } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/hooks/use-app-context';
import { MOCK_ACTIVITIES, ACADEMIC_EVENTS_BY_SEMESTER, MOCK_STUDENT_TIMETABLE } from '@/lib/data';
import type { Activity, Student } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const MetricCard = ({ icon: Icon, title, value, trend, footer, color }: { icon: React.ElementType, title: string, value: string | number, trend?: string, footer: string, color: string }) => (
    <Card className={cn("overflow-hidden text-white", color)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-5 w-5 text-current/80" />
        </CardHeader>
        <CardContent>
            <div className="text-4xl font-bold">{value}</div>
            <p className="text-xs opacity-80">{footer}</p>
        </CardContent>
        {trend && (
            <div className="text-xs font-medium bg-black/20 px-6 py-1 flex items-center gap-1">
                <TrendingUp className="h-4 w-4"/>
                {trend}
            </div>
        )}
    </Card>
);

export default function StudentDashboardHome() {
  const { user } = useUser();
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');
  
  const student = user as Student;

  const activities = useMemo(() => {
    const studentActivities = MOCK_ACTIVITIES.filter(act => act.studentId === student.id);
    if (filter === 'all') return studentActivities;
    return studentActivities.filter(a => a.status === filter);
  }, [student.id, filter]);
  
  const totalCredits = MOCK_ACTIVITIES
    .filter(a => a.studentId === student.id && a.status === 'approved')
    .reduce((sum, act) => sum + act.credits, 0);

  const upcomingDeadlinesCount = useMemo(() => {
    const today = startOfToday();
    return Object.values(ACADEMIC_EVENTS_BY_SEMESTER).flat()
      .filter(event => event.category === 'Deadline' && isFuture(parseISO(event.startDate)))
      .length;
  }, []);
  
  const todaySchedule = useMemo(() => {
    const todayName = new Date().toLocaleDateString('en-us', { weekday: 'long' });
    return MOCK_STUDENT_TIMETABLE
        .filter(entry => entry.day === todayName)
        .sort((a,b) => a.startTime.localeCompare(b.startTime));
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Welcome back, {student.name.split(' ')[0]}!</h1>
        <p className="opacity-80">Here's your academic snapshot for today. Keep up the great work!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
            icon={BarChart} 
            title="Current GPA" 
            value={student.gpa.toFixed(2)} 
            footer="Cumulative Grade Point Average"
            trend="+0.2 from last semester"
            color="bg-gradient-to-br from-indigo-500 to-blue-500"
        />
        <MetricCard 
            icon={Percent} 
            title="Attendance" 
            value={`${student.attendance}%`} 
            footer="Overall Attendance"
            color="bg-gradient-to-br from-teal-500 to-green-500"
        />
        <MetricCard 
            icon={Award} 
            title="Total Credits" 
            value={totalCredits} 
            footer="From approved activities"
            color="bg-gradient-to-br from-purple-500 to-violet-500"
        />
        <MetricCard 
            icon={Calendar} 
            title="Upcoming Deadlines" 
            value={upcomingDeadlinesCount} 
            footer="In this semester"
            color="bg-gradient-to-br from-orange-500 to-amber-500"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>My Activities</CardTitle>
                            <CardDescription>Your submitted co-curricular and extra-curricular activities.</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>All</Button>
                            <Button variant={filter === 'approved' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('approved')}>Approved</Button>
                            <Button variant={filter === 'pending' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('pending')}>Pending</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                     {activities.length > 0 ? activities.map(activity => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-background hover:bg-muted transition-colors">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <ActivityIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{activity.name}</p>
                                <p className="text-sm text-muted-foreground">{activity.category} • {new Date(activity.date).toLocaleDateString()}</p>
                            </div>
                            <Badge variant={activity.status === 'approved' ? 'default' : activity.status === 'pending' ? 'secondary' : 'destructive'} className='capitalize'>
                                {activity.status}
                            </Badge>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>No activities found for this filter.</p>
                            <Button variant="link" asChild><Link href="/student/add-activity">Add one now!</Link></Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {todaySchedule.length > 0 ? todaySchedule.map((item, index) => (
                        <div key={item.id}>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="h-4 w-4 rounded-full bg-primary" />
                                    <div className="flex-1 w-px bg-border" />
                                </div>
                                <div className="flex-1 -mt-1">
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.startTime} - {item.endTime}</p>
                                    <p className="text-sm text-muted-foreground">{item.location}</p>
                                </div>
                            </div>
                            {index < todaySchedule.length - 1 && <Separator className="my-4" />}
                        </div>
                    )) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>No classes scheduled for today. Enjoy your day!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
