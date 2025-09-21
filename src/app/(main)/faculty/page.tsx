'use client';

import { useState } from 'react';
import { Check, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_STUDENTS, MOCK_ACTIVITIES } from '@/lib/data';
import type { Activity, Faculty } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-app-context';

export default function FacultyDashboard() {
  const { toast } = useToast();
  const { user, addNotification } = useUser();
  const facultyUser = user as Faculty;

  const departmentStudents = MOCK_STUDENTS.filter(s => s.department === facultyUser.department);
  const departmentStudentIds = departmentStudents.map(s => s.id);

  const [pendingActivities, setPendingActivities] = useState<Activity[]>(
    MOCK_ACTIVITIES.filter(a => a.status === 'pending' && departmentStudentIds.includes(a.studentId))
  );

  const getStudentName = (studentId: string) => {
    return MOCK_STUDENTS.find(s => s.id === studentId)?.name || 'Unknown';
  };

  const handleApproval = (activityId: string, status: 'approved' | 'rejected') => {
    const activity = pendingActivities.find(a => a.id === activityId);
    if (!activity) return;

    setPendingActivities(prev => prev.filter(a => a.id !== activityId));
    
    // In a real app, you would also notify the specific student.
    // For this prototype, we add a general notification to the current user (faculty).
    addNotification({
        type: 'approval',
        title: `Activity ${status}`,
        description: `You have ${status} "${activity.name}" for ${getStudentName(activity.studentId)}.`
    });

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
        <Card>
          <CardHeader>
            <CardTitle>Pending Activity Approvals</CardTitle>
            <CardDescription>Review student-submitted activities for your approval.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingActivities.length > 0 ? pendingActivities.map(activity => (
                  <TableRow key={activity.id}>
                    <TableCell>{getStudentName(activity.studentId)}</TableCell>
                    <TableCell className="font-medium">{activity.name}</TableCell>
                    <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:text-green-600" onClick={() => handleApproval(activity.id, 'approved')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-600" onClick={() => handleApproval(activity.id, 'rejected')}>
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">No pending activities.</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen/> My Publications</CardTitle>
                <CardDescription>A list of your published research and articles.</CardDescription>
            </CardHeader>
            <CardContent>
                {facultyUser.publications && facultyUser.publications.length > 0 ? (
                    <ul className="space-y-4">
                        {facultyUser.publications.map((pub, index) => (
                            <li key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                                <p className="font-semibold">{pub.title}</p>
                                <p className="text-sm text-muted-foreground">{pub.journal}, {pub.year}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex items-center justify-center h-24">
                        <p className="text-muted-foreground">No publications listed.</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
