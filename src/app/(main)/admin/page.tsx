'use client';

import { Users, Building, ClipboardList, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MOCK_STUDENTS, MOCK_FACULTY, MOCK_ACTIVITIES } from '@/lib/data';
import type { Student } from '@/lib/types';
import { useState } from 'react';
import { naturalLanguageStudentSearch } from '@/ai/flows/ai-natural-language-student-search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

function AdminStudentSearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Student[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Admin search has no department filter
      const response = await naturalLanguageStudentSearch({ query });
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
        <CardTitle>Global Student Search</CardTitle>
        <CardDescription>Find any student across all departments using natural language.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
          <Input 
            placeholder="e.g., 'Show me all mechanical engineering students from 2020'"
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
                  <p className="text-sm text-muted-foreground">{student.major}, {student.department}</p>
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

export default function AdminDashboard() {
  const totalStudents = MOCK_STUDENTS.length;
  const totalFaculty = MOCK_FACULTY.length;
  const totalActivities = MOCK_ACTIVITIES.length;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-headline font-semibold">Administrator Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFaculty}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActivities}</div>
            <p className="text-xs text-muted-foreground">Submitted by all students</p>
          </CardContent>
        </Card>
      </div>

      <AdminStudentSearch />
    </div>
  );
}
