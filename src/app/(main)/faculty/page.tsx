// src/app/(main)/faculty/page.tsx
'use client';

import { useState } from 'react';
import { Check, X, Search, User } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Defs, LinearGradient, Stop } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MOCK_ACTIVITIES, MOCK_STUDENTS } from '@/lib/data';
import type { Activity, Student } from '@/lib/types';
import { naturalLanguageStudentSearch } from '@/ai/flows/ai-natural-language-student-search';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-app-context';
import Link from 'next/link';

function StudentSearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Student[]>([]);
  const { user } = useUser();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await naturalLanguageStudentSearch({ 
        query,
        // The AI can now use the areaOfInterest from the query itself
      });
      const foundStudents = MOCK_STUDENTS.filter(student => 
        response.studentNames.includes(student.name) && 
        student.department === (user as any).department
      );
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
        <CardDescription>Use natural language to find students by skills, interests, or activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
          <Input 
            placeholder="e.g., 'Find students interested in Machine Learning'"
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
                  <p className="text-sm text-muted-foreground">{student.areaOfInterest}</p>
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
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Student
            </span>
            <span className="font-bold text-muted-foreground">{label}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {payload[0].name}
            </span>
            <span className="font-bold">
              {payload[0].value}
              {payload[0].name === 'attendance' && '%'}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};


function GpaChart({ students }: { students: Student[] }) {
  const chartData = students.map(s => ({ name: s.name.split(' ')[0], gpa: s.gpa }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student CGPA Overview</CardTitle>
        <CardDescription>A look at the current CGPA of students in your department.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <Defs>
              <LinearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <Stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
              </LinearGradient>
            </Defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]}/>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}/>
            <Bar dataKey="gpa" fill="url(#gpaGradient)" radius={[4, 4, 0, 0]} background={{ fill: 'hsl(var(--primary) / 0.05)', radius: 4 }} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function AttendanceChart({ students }: { students: Student[] }) {
  const chartData = students.map(s => ({ name: s.name.split(' ')[0], attendance: s.attendance }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Attendance</CardTitle>
        <CardDescription>Current attendance percentage for students in your department.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
             <Defs>
              <LinearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                <Stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.2}/>
              </LinearGradient>
            </Defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[50, 100]} unit="%"/>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}/>
            <Bar dataKey="attendance" fill="url(#attendanceGradient)" radius={[4, 4, 0, 0]} background={{ fill: 'hsl(var(--accent) / 0.05)', radius: 4 }} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function FacultyDashboard() {
  const { toast } = useToast();
  const { user } = useUser();

  // Filter students and activities based on the faculty's department
  const departmentStudents = MOCK_STUDENTS.filter(s => s.department === (user as any).department);
  const departmentStudentIds = departmentStudents.map(s => s.id);
  
  const [pendingActivities, setPendingActivities] = useState<Activity[]>(
    MOCK_ACTIVITIES.filter(a => a.status === 'pending' && departmentStudentIds.includes(a.studentId))
  );

  const getStudentName = (studentId: string) => {
    return MOCK_STUDENTS.find(s => s.id === studentId)?.name || 'Unknown';
  };

  const handleApproval = (activityId: string, status: 'approved' | 'rejected') => {
    setPendingActivities(prev => prev.filter(a => a.id !== activityId));
    toast({
        title: `Activity ${status}`,
        description: `The activity has been successfully ${status}.`
    });
  };

  return (
    <div className="flex flex-col gap-6">
       <div>
        <h1 className="text-2xl font-headline font-semibold">Faculty Dashboard</h1>
        <p className="text-muted-foreground italic text-sm mt-1">"A good teacher can inspire hope, ignite the imagination, and instill a love of learning."</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
         <GpaChart students={departmentStudents} />
         <AttendanceChart students={departmentStudents} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pending Activity Approvals</CardTitle>
            <CardDescription>Review and approve or reject student-submitted activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingActivities.map(activity => (
                  <TableRow key={activity.id}>
                    <TableCell>{getStudentName(activity.studentId)}</TableCell>
                    <TableCell className="font-medium">{activity.name}</TableCell>
                    <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:text-green-600" onClick={() => handleApproval(activity.id, 'approved')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-600" onClick={() => handleApproval(activity.id, 'rejected')}>
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                 {pendingActivities.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">No pending activities.</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <StudentSearch />
        </div>
      </div>
    </div>
  );
}
