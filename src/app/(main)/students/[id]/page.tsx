'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Mail, Phone, GraduationCap, Award, Heart, Dna, Briefcase, Printer } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_ACTIVITIES } from '@/lib/data';
import type { Student, Activity } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { generateActivitySummary } from '@/ai/flows/generate-activity-summaries';
import { Skeleton } from '@/components/ui/skeleton';

function ActivitySummary({ activity, student }: { activity: Activity, student: Student }) {
  const [summary, setSummary] = useState(activity.aiSummary);
  const [isLoading, setIsLoading] = useState(!activity.aiSummary);

  useEffect(() => {
    if (!summary) {
      const fetchSummary = async () => {
        try {
          const result = await generateActivitySummary({
            activityName: activity.name,
            activityDescription: activity.description,
            studentSkills: student.skills,
          });
          setSummary(result.summary);
          // In a real app, you'd save this back to the activity object
        } catch (error) {
          console.error("Failed to generate summary", error);
          setSummary(activity.description); // Fallback to description
        } finally {
          setIsLoading(false);
        }
      };
      fetchSummary();
    }
  }, [activity, student, summary]);
  
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  return <p className="text-muted-foreground">{summary}</p>;
}

export default function StudentPortfolioPage({ params }: { params: { id: string } }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const foundStudent = MOCK_STUDENTS.find(s => s.id === params.id);
    if (foundStudent) {
      setStudent(foundStudent);
      const studentActivities = MOCK_ACTIVITIES.filter(
        act => act.studentId === foundStudent.id && act.status === 'approved'
      );
      setActivities(studentActivities);
    }
  }, [params.id]);

  if (!student) {
    return notFound();
  }

  const handlePrint = () => window.print();

  return (
    <div className="bg-background rounded-xl p-4 sm:p-6 lg:p-8 print:p-0">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 print:mb-4">
          <div className="flex items-center gap-6">
            <Image
              src={student.avatarUrl}
              alt={student.name}
              width={100}
              height={100}
              className="rounded-full border-4 border-primary/20"
              data-ai-hint="student portrait"
            />
            <div>
              <h1 className="text-3xl font-headline font-bold">{student.name}</h1>
              <p className="text-lg text-muted-foreground">{student.major}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {student.email}</span>
              </div>
            </div>
          </div>
          <Button onClick={handlePrint} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" />
            Print Portfolio
          </Button>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <aside className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary"/> About</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">{student.bio}</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary"/> Skills</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {student.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary"/> Interests</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {student.interests.map(interest => <Badge key={interest} variant="outline">{interest}</Badge>)}
              </CardContent>
            </Card>
             {student.medicalDetails && (
              <Card className="print:hidden">
                <CardHeader><CardTitle className="flex items-center gap-2"><Dna className="h-5 w-5 text-destructive"/> Medical Info</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p><strong>Condition:</strong> {student.medicalDetails.condition}</p>
                  <p><strong>Notes:</strong> {student.medicalDetails.notes}</p>
                  <p><strong>Emergency:</strong> {student.medicalDetails.emergencyContact.name} ({student.medicalDetails.emergencyContact.phone})</p>
                </CardContent>
              </Card>
            )}
          </aside>

          <main className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary"/> Approved Activities</CardTitle>
                <CardDescription>A showcase of recognized accomplishments and experiences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {activities.map((activity, index) => (
                  <div key={activity.id}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
                      <h3 className="font-semibold">{activity.name}</h3>
                      <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                    </div>
                    <ActivitySummary activity={activity} student={student} />
                    <div className="flex flex-wrap gap-2 mt-2">
                       {activity.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                    </div>
                    {index < activities.length - 1 && <Separator className="mt-6"/>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
