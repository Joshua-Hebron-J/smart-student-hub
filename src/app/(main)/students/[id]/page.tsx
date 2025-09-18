
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Mail, Phone, GraduationCap, Award, Dna, Briefcase, Printer, FileBadge, Calendar, Activity as ActivityIcon, BarChart, Percent } from 'lucide-react';
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

const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
    <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-muted-foreground mt-1" />
        <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-sm font-semibold">{value}</p>
        </div>
    </div>
);


export default function StudentPortfolioPage() {
  const params = useParams();
  const id = params.id as string;
  const [student, setStudent] = useState<Student | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const foundStudent = MOCK_STUDENTS.find(s => s.id === id);
    if (foundStudent) {
      setStudent(foundStudent);
      const studentActivities = MOCK_ACTIVITIES.filter(
        act => act.studentId === foundStudent.id && act.status === 'approved'
      );
      setActivities(studentActivities);
    }
  }, [id]);

  if (!student) {
    // You can return a loading skeleton here while waiting for the useEffect
    return (
        <div className="flex items-center justify-center h-full">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
        </div>
    )
  }

  const handlePrint = () => window.print();
  const getAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  return (
    <div className="bg-background rounded-xl p-4 sm:p-6 lg:p-8 print:p-0">
      <div className="max-w-5xl mx-auto">
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
              <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><GraduationCap className="h-5 w-5 text-primary"/> About</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                    <InfoItem icon={BarChart} label="GPA" value={student.gpa.toFixed(2)} />
                    <InfoItem icon={Percent} label="Attendance" value={`${student.attendance}%`} />
                    <p className="text-sm text-muted-foreground pt-2">{student.bio}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><FileBadge className="h-5 w-5 text-primary"/> Biographical</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <InfoItem icon={FileBadge} label="Register Number" value={student.registerNumber} />
                    <InfoItem icon={Calendar} label="Date of Birth" value={new Date(student.dob).toLocaleDateString()} />
                    <InfoItem icon={ActivityIcon} label="Age" value={`${getAge(student.dob)} years`} />
                    <InfoItem icon={GraduationCap} label="Passing Out Year" value={student.enrollmentYear + 4} />
                </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Award className="h-5 w-5 text-primary"/> Skills & Interests</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                 <div>
                    <h4 className="font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                        {student.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                        {student.interests.map(interest => <Badge key={interest} variant="outline">{interest}</Badge>)}
                    </div>
                </div>
              </CardContent>
            </Card>
             {student.medicalDetails && (
              <Card className="print:hidden">
                <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Dna className="h-5 w-5 text-destructive"/> Medical Info</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <InfoItem icon={Dna} label="Blood Group" value={student.medicalDetails.bloodGroup} />
                  <InfoItem icon={ActivityIcon} label="Allergies" value={student.medicalDetails.allergies.join(', ')} />
                  <InfoItem icon={Phone} label="Emergency Contact" value={`${student.medicalDetails.emergencyContact.name} (${student.medicalDetails.emergencyContact.phone})`} />
                  {student.medicalDetails.notes && <p className="text-sm text-muted-foreground pt-2"><strong>Notes:</strong> {student.medicalDetails.notes}</p>}
                </CardContent>
              </Card>
            )}
          </aside>

          <main className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><Briefcase className="h-5 w-5 text-primary"/> Approved Activities</CardTitle>
                <CardDescription>A showcase of recognized accomplishments and experiences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {activities.length > 0 ? activities.map((activity, index) => (
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
                )) : (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">No approved activities to display yet.</p>
                    </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
