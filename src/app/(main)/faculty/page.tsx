
'use client';

import { useState } from 'react';
import { Check, X, Search, User } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MOCK_STUDENTS } from '@/lib/data';
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
  const departmentStudents = MOCK_STUDENTS.filter(s => s.department === (user as any).department);


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const studentDataForAI = departmentStudents.map(student => ({
        name: student.name,
        skills: student.skills,
        interests: student.interests,
        areaOfInterest: student.areaOfInterest,
      }));

      const response = await naturalLanguageStudentSearch({
        query,
        students: studentDataForAI
      });

      const foundStudents = departmentStudents.filter(student =>
        response.studentNames.includes(student.name)
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

function GpaChart({ students }: { students: Student[] }) {
  const topStudents = students.sort((a, b) => b.gpa - a.gpa).slice(0, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Student CGPA</CardTitle>
        <CardDescription>CGPA of the top 2 students in your department.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-around items-center h-[280px]">
        {topStudents.map(student => (
          <div key={student.id} className="flex flex-col items-center gap-2">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  className="text-muted/50"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-primary"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${(student.gpa / 10) * 100}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{student.gpa.toFixed(2)}</span>
              </div>
            </div>
            <p className="font-semibold text-center">{student.name}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function AttendanceChart({ students }: { students: Student[] }) {
  const topStudents = students.sort((a, b) => b.attendance - a.attendance).slice(0, 2);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Student Attendance</CardTitle>
        <CardDescription>Attendance of the top 2 students in your department.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-around items-center h-[280px]">
        {topStudents.map(student => (
          <div key={student.id} className="flex flex-col items-center gap-2">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  className="text-muted/50"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-accent"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${student.attendance}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{student.attendance}%</span>
              </div>
            </div>
            <p className="font-semibold text-center">{student.name}</p>
          </div>
        ))}
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
