
'use client';

import { Users, Building, ClipboardList, Search, Calendar, FileBarChart, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MOCK_STUDENTS, MOCK_FACULTY, MOCK_ACTIVITIES, ACADEMIC_EVENTS_BY_SEMESTER, ACTIVITY_CATEGORIES, EVENT_CATEGORIES } from '@/lib/data';
import type { Student, AcademicEventV2, Activity } from '@/lib/types';
import { useState, useMemo, useRef } from 'react';
import { naturalLanguageStudentSearch } from '@/ai/flows/ai-natural-language-student-search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { isFuture, isToday, parseISO, startOfToday, compareAsc, format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

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

function ComplianceReportModal() {
  const reportRef = useRef<HTMLDivElement>(null);
  const approvedActivities = MOCK_ACTIVITIES.filter(a => a.status === 'approved');

  const reportData = useMemo(() => {
    // Overall Metrics
    const totalStudents = MOCK_STUDENTS.length;
    const totalApprovedActivities = approvedActivities.length;
    const avgGpa = MOCK_STUDENTS.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;
    const avgAttendance = MOCK_STUDENTS.reduce((sum, s) => sum + s.attendance, 0) / totalStudents;
    const totalInternshipCredits = approvedActivities
      .filter(a => a.category === 'Internship')
      .reduce((sum, a) => sum + a.credits, 0);

    // Department-wise
    const departments = [...new Set(MOCK_STUDENTS.map(s => s.department))];
    const departmentMetrics = departments.map(dept => {
      const studentsInDept = MOCK_STUDENTS.filter(s => s.department === dept);
      const studentIdsInDept = studentsInDept.map(s => s.id);
      const activitiesInDept = approvedActivities.filter(a => studentIdsInDept.includes(a.studentId));
      return {
        name: dept,
        studentCount: studentsInDept.length,
        activityCount: activitiesInDept.length,
      };
    });

    // Activity Categories
    const activityCategoryCounts = ACTIVITY_CATEGORIES.map(category => ({
      name: category,
      count: approvedActivities.filter(a => a.category === category).length,
    }));

    return {
      overall: {
        totalStudents,
        totalApprovedActivities,
        avgGpa: avgGpa.toFixed(2),
        avgAttendance: avgAttendance.toFixed(1),
        totalInternshipCredits,
      },
      departments: departmentMetrics,
      activityCategories: activityCategoryCounts,
    };
  }, [approvedActivities]);

  const MetricCard = ({ title, value, description }: { title: string, value: string | number, description?: string }) => (
    <Card className="flex-1 print:border-none print:shadow-none">
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      {description && <CardContent><p className="text-xs text-muted-foreground">{description}</p></CardContent>}
    </Card>
  );

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && reportRef.current) {
        const reportHtml = reportRef.current.innerHTML;
        printWindow.document.write(`
            <html>
            <head>
                <title>NAAC/NIRF Compliance Report</title>
                <link rel="stylesheet" href="/globals.css">
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    body { font-family: Inter, sans-serif; }
                    @media print {
                        body { -webkit-print-color-adjust: exact; }
                        .print-container {
                            padding: 2rem;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="print-container">
                    ${reportHtml}
                </div>
                <script>
                    setTimeout(() => {
                        window.print();
                        window.close();
                    }, 250);
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FileBarChart className="mr-2"/>
          Generate NAAC/NIRF Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>NAAC/NIRF Compliance Report (Simulated)</DialogTitle>
          <DialogDescription>
            Generated on: {format(new Date(), 'PPP')}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 pr-6" ref={reportRef}>
            <div className="space-y-6">
                <section>
                    <h3 className="text-lg font-semibold mb-3">Overall Institutional Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <MetricCard title="Total Students" value={reportData.overall.totalStudents} />
                    <MetricCard title="Avg. GPA" value={reportData.overall.avgGpa} />
                    <MetricCard title="Avg. Attendance" value={`${reportData.overall.avgAttendance}%`} />
                    <MetricCard title="Verified Activities" value={reportData.overall.totalApprovedActivities} />
                    <MetricCard title="Internship Credits" value={reportData.overall.totalInternshipCredits} description="From approved internships" />
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-3">Department-wise Breakdown</h3>
                    <Card className="print:border-none print:shadow-none">
                    <CardContent className="pt-6">
                        <ul className="divide-y">
                        {reportData.departments.map(dept => (
                            <li key={dept.name} className="py-3 flex justify-between items-center">
                            <span className="font-medium">{dept.name}</span>
                            <div className="flex gap-6 text-right">
                                <span className="text-sm">
                                {dept.studentCount} <span className="text-muted-foreground">Students</span>
                                </span>
                                <span className="text-sm">
                                {dept.activityCount} <span className="text-muted-foreground">Activities</span>
                                </span>
                            </div>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                    </Card>
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-3">Verified Activities by Category</h3>
                    <Card className="print:border-none print:shadow-none">
                    <CardContent className="pt-6">
                        <ul className="divide-y">
                        {reportData.activityCategories.map(cat => (
                            <li key={cat.name} className="py-3 flex justify-between items-center">
                            <span className="font-medium">{cat.name}</span>
                            <span className="text-sm font-bold">{cat.count}</span>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                    </Card>
                </section>
            </div>
        </div>
         <DialogFooter>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-semibold">Admin Dashboard</h1>
          <p className="text-muted-foreground italic text-sm mt-1">"The best way to predict the future is to create it."</p>
        </div>
        <ComplianceReportModal />
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
