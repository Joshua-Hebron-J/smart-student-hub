import { Suspense } from 'react';
import Image from 'next/image';
import { Mail, GraduationCap, Award, Briefcase, Printer, FileText, BarChart, Star, BookOpen, Layers, Target } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_ACTIVITIES } from '@/lib/data';
import type { Student, Activity } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { generateActivitySummary } from '@/ai/flows/generate-activity-summaries';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import PortfolioPrintButton from '@/components/portfolio-print-button';
import { notFound } from 'next/navigation';

async function ActivitySummary({ activity, student }: { activity: Activity, student: Student }) {
  let summary = activity.aiSummary;

  if (!summary) {
    try {
      const result = await generateActivitySummary({
        activityName: activity.name,
        activityDescription: activity.description,
        studentSkills: student.skills,
      });
      summary = result.summary;
      // In a real app, you'd save this back to the activity object
    } catch (error) {
      console.error("Failed to generate summary", error);
      summary = activity.description; // Fallback to description
    }
  }

  return <p className="text-sm text-muted-foreground">{summary}</p>;
}

async function AISummary({ student, activities }: { student: Student, activities: Activity[]}) {
    // This could be a call to another Genkit flow in the future.
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    const summary = `Based on a GPA of ${student.gpa} and participation in high-impact activities like ${activities[0]?.name || 'hackathons'}, ${student.name.split(' ')[0]} demonstrates strong academic performance and practical skills in areas such as ${student.skills.slice(0,2).join(' and ')}. A proactive learner with demonstrated leadership abilities.`;
    return <p className="text-sm text-muted-foreground italic">{summary}</p>;
}


export default async function StudentPortfolioPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const student = MOCK_STUDENTS.find(s => s.id === id);

  if (!student) {
    notFound();
  }

  const activities = MOCK_ACTIVITIES.filter(
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
              <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary"/> {student.email}</div>
                  <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary"/> {student.enrollmentYear + 4} Graduate</div>
                  <div className="flex items-center gap-2"><BarChart className="h-4 w-4 text-primary"/> GPA: {student.gpa.toFixed(2)}</div>
                  <div className="flex items-center gap-2"><Star className="h-4 w-4 text-primary"/> Total Points: {totalPoints}</div>
              </div>
            </div>
          </header>

          <main className="grid md:grid-cols-3 gap-12">
            
            {/* Left Sidebar */}
            <aside className="md:col-span-1 space-y-8">
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
