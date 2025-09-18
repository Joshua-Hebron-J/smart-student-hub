
'use client';

import { useState } from 'react';
import { User, Search } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

import { MOCK_STUDENTS } from '@/lib/data';
import type { Student } from '@/lib/types';
import { useUser } from '@/hooks/use-app-context';
import { naturalLanguageStudentSearch } from '@/ai/flows/ai-natural-language-student-search';

export default function ManageStudentsPage() {
  const { user } = useUser();
  
  const departmentStudents = MOCK_STUDENTS.filter(s => s.department === (user as any).department);

  const [students, setStudents] = useState<Student[]>(departmentStudents);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
        setStudents(departmentStudents); // Reset to full list if query is empty
        return;
    }

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
        students: studentDataForAI,
      });
      const foundStudents = departmentStudents.filter(student => response.studentNames.includes(student.name));
      setStudents(foundStudents);
    } catch (error) {
        console.error('AI Search Error:', error);
        setStudents([]); // Clear results on error
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Students</CardTitle>
        <CardDescription>Search, view, and manage students in your department.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
            <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-lg">
                <Input 
                    placeholder="e.g., 'Find students interested in AI'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Searching...' : <Search className="h-4 w-4" />}
                </Button>
            </form>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="hidden md:table-cell">Register No.</TableHead>
              <TableHead className="hidden lg:table-cell">Area of Interest</TableHead>
              <TableHead className="hidden md:table-cell">GPA</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatarUrl} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">
                      <p>{student.name}</p>
                      <p className="text-sm text-muted-foreground md:hidden">{student.registerNumber}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{student.registerNumber}</TableCell>
                <TableCell className="hidden lg:table-cell">{student.areaOfInterest}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={student.gpa > 8.5 ? 'default' : student.gpa > 7.5 ? 'secondary' : 'destructive'}>
                    {student.gpa.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/students/${student.id}`}><User className="mr-2"/> View Portfolio</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
             {students.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No students found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
