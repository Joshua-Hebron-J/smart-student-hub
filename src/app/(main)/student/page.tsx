
'use client';

import { PlusCircle, CheckCircle, Clock, Award, BarChart, Percent, FileBadge, Calendar, Activity as ActivityIcon, Dna, Phone, User, Briefcase } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import { useUser } from '@/hooks/use-app-context';
import { MOCK_ACTIVITIES } from '@/lib/data';
import type { Activity, Student } from '@/lib/types';
import { useEffect, useState } from 'react';

const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
    <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
        <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-sm font-semibold">{value}</p>
        </div>
    </div>
);

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

export default function StudentDashboard() {
  const { user } = useUser();
  const [student, setStudent] = useState<Student | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (user && user.role === 'student') {
      setStudent(user as Student);
      const studentActivities = MOCK_ACTIVITIES.filter(act => act.studentId === user.id);
      setActivities(studentActivities);
    }
  }, [user]);

  if (!student) {
    return <div>Loading student data...</div>;
  }
  
  const approvedCount = activities.filter(a => a.status === 'approved').length;
  const pendingCount = activities.filter(a => a.status === 'pending').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-semibold">Welcome, {student.name}!</h1>
           <p className="text-muted-foreground italic text-sm mt-1">"Believe you can and you're halfway there."</p>
        </div>
        <div className="flex items-center gap-2">
            <Button asChild variant="outline">
                <Link href={`/students/${student.id}`}>
                    <Briefcase className="mr-2 h-4 w-4"/>
                    View My Portfolio
                </Link>
            </Button>
            <Button asChild>
                <Link href="/student/add-activity">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Activity
                </Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.gpa.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Cumulative Grade Point Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.attendance}%</div>
            <p className="text-xs text-muted-foreground">Overall attendance percentage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Activities</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Recognized in your portfolio</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting faculty review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
              <CardHeader><CardTitle>My Bio</CardTitle></CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground">{student.bio}</p>
              </CardContent>
          </Card>
          <Card className="md:col-span-1">
              <CardHeader><CardTitle>Biographical Info</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                  <InfoItem icon={FileBadge} label="Register Number" value={student.registerNumber} />
                  <InfoItem icon={Calendar} label="Date of Birth" value={new Date(student.dob).toLocaleDateString()} />
                  <InfoItem icon={ActivityIcon} label="Age" value={`${getAge(student.dob)} years`} />
                  <InfoItem icon={User} label="Passing Out Year" value={student.enrollmentYear + 4} />
              </CardContent>
          </Card>
          <Card className="md:col-span-1">
              <CardHeader><CardTitle>Medical Info</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {student.medicalDetails ? (
                    <>
                        <InfoItem icon={Dna} label="Blood Group" value={student.medicalDetails.bloodGroup} />
                        <InfoItem icon={ActivityIcon} label="Allergies" value={student.medicalDetails.allergies.join(', ')} />
                        <InfoItem icon={Phone} label="Emergency Contact" value={`${student.medicalDetails.emergencyContact.name} (${student.medicalDetails.emergencyContact.phone})`} />
                    </>
                ) : (
                    <p className="text-sm text-muted-foreground">No medical information provided.</p>
                )}
              </CardContent>
          </Card>
      </div>


      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>A summary of your submitted activities and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Skills</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.slice(0, 5).map(activity => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.name}</TableCell>
                  <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={activity.status === 'approved' ? 'default' : activity.status === 'pending' ? 'secondary' : 'destructive'} className='capitalize'>
                      {activity.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {activity.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
