
'use client'

import { Suspense } from 'react';
import Image from 'next/image';
import { Mail, GraduationCap, Award, Briefcase, Printer, FileText, BarChart, Star, BookOpen, Layers, Target, User, HeartPulse, Cake } from 'lucide-react';
import { format } from 'date-fns';

import type { Student, Activity } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import PortfolioPrintButton from '@/components/portfolio-print-button';
import { useUser } from '@/hooks/use-app-context';
import ActivitySummary from './activity-summary';
import AISummary from './ai-summary';


export default function PortfolioView({ student }: { student: Student }) {
  const { activities: allActivities } = useUser();

  const activities = allActivities.filter(
    act => act.studentId === student.id && act.status === 'approved'
  );
  
  const totalPoints = activities.reduce((sum, act) => sum + act.credits, 0);

  const renderActivitySection = (category: Activity['category']) => {
    const categoryActivities = activities.filter(a => a.category === category);
    if(categoryActivities.length === 0) return null;
    
    return (
       <section key={category} className="space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Layers className="h-5 w-5 text-primary"/>{category}</h3>
           {categoryActivities.map((activity) => (
             <div key={activity.id}>
               <div className="flex justify-between items-center mb-1">
                 <h4 className="font-semibold">{activity.name}</h4>
                 <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
               </div>
               <Suspense fallback={
                  <div className="space-y-2 pt-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                }>
                 <ActivitySummary activity={activity} student={student} />
               </Suspense>
               <div className="flex flex-wrap gap-2 mt-3">
                  {activity.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
               </div>
             </div>
           ))}
       </section>
    );
  }

  return (
    <>
      <div className="flex justify-end pb-4 print:hidden">
        <PortfolioPrintButton studentName={student.name} />
      </div>
      <div id="portfolio-content" className="bg-background rounded-xl p-4 sm:p-6 lg:p-8 print:p-0">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header Section */}
          <header className="flex flex-col sm:flex-row items-start gap-8">
            <Image
                src={student.avatarUrl}
                alt={student.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-primary/20 object-cover"
                data-ai-hint="student portrait"
              />
            <div className="flex-1">
              <h1 className="text-4xl font-headline font-bold">{student.name}</h1>
              <p className="text-xl text-muted-foreground font-medium">{student.major}</p>
              <Separator className="my-4"/>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary"/> {student.email}</div>
                  <div className="flex items-center gap-2"><Cake className="h-4 w-4 text-primary"/> {format(new Date(student.dob), 'PPP')}</div>
                  <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary"/> Passing in {student.enrollmentYear + 4}</div>
                  <div className="flex items-center gap-2"><BarChart className="h-4 w-4 text-primary"/> GPA: {student.gpa.toFixed(2)}</div>
                  <div className="flex items-center gap-2"><Star className="h-4 w-4 text-primary"/> Total Points: {totalPoints}</div>
              </div>
            </div>
          </header>

          <main className="grid md:grid-cols-3 gap-12">
            
            {/* Left Sidebar */}
            <aside className="md:col-span-1 space-y-8">
                <Card className="section-card">
                  <CardHeader className="section-header"><CardTitle className="text-xl flex items-center gap-2"><User /> Bio</CardTitle></CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">{student.bio}</p>
                  </CardContent>
                </Card>

                <Card className="section-card">
                  <CardHeader className="section-header"><CardTitle className="text-xl">Professional Summary</CardTitle></CardHeader>
                  <CardContent className="pt-6">
                    <Suspense fallback={
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-2/3" />
                        </div>
                    }>
                        <AISummary student={student} activities={activities} />
                    </Suspense>
                  </CardContent>
                </Card>

                <Card className="section-card">
                  <CardHeader className="section-header"><CardTitle className="text-xl flex items-center gap-2"><Target/> Skills Showcase</CardTitle></CardHeader>
                  <CardContent className="pt-6 space-y-4">
                     <div>
                        <h4 className="font-semibold mb-2">Technical Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {student.skills.map(skill => <Badge key={skill} variant="default" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">{skill}</Badge>)}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Soft Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Team Leadership', 'Public Speaking', 'Problem Solving'].map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                    </div>
                  </CardContent>
                </Card>

                 <Card className="section-card">
                  <CardHeader className="section-header"><CardTitle className="text-xl flex items-center gap-2"><BookOpen/> Interests</CardTitle></CardHeader>
                  <CardContent className="pt-6">
                      <div className="flex flex-wrap gap-2">
                        {student.interests.map(interest => <Badge key={interest} variant="outline">{interest}</Badge>)}
                      </div>
                  </CardContent>
                </Card>

                {student.medicalDetails && (
                  <Card className="section-card">
                    <CardHeader className="section-header"><CardTitle className="text-xl flex items-center gap-2"><HeartPulse /> Medical Information</CardTitle></CardHeader>
                    <CardContent className="pt-6 text-sm space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Blood Group:</span>
                            <span className="font-semibold">{student.medicalDetails.bloodGroup}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Condition:</span>
                            <span className="font-semibold">{student.medicalDetails.condition}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Allergies:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {student.medicalDetails.allergies.map(allergy => <Badge key={allergy} variant="destructive">{allergy}</Badge>)}
                            </div>
                        </div>
                        <Separator className="my-4"/>
                         <div>
                            <p className="font-semibold">Emergency Contact</p>
                            <p className="text-muted-foreground">{student.medicalDetails.emergencyContact.name} - {student.medicalDetails.emergencyContact.phone}</p>
                         </div>
                    </CardContent>
                  </Card>
                )}
            </aside>
            
            {/* Main Content */}
            <main className="md:col-span-2">
               <Card className="section-card">
                <CardHeader className="section-header">
                  <CardTitle className="text-xl flex items-center gap-2"><Briefcase/> Achievements & Activities</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  {renderActivitySection('Competition')}
                  {renderActivitySection('Internship')}
                  {renderActivitySection('Research')}
                  {renderActivitySection('Workshop')}
                  {renderActivitySection('Social Service')}
                  
                  {activities.length === 0 && (
                      <div className="text-center py-10">
                          <p className="text-muted-foreground">No approved activities to display yet.</p>
                      </div>
                  )}
                </CardContent>
              </Card>
            </main>

          </main>
        </div>
      </div>
    </>
  );
}
