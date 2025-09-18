
'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_STUDENTS, MOCK_ACTIVITIES } from '@/lib/data';
import type { Activity } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-app-context';

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
    </div>
  );
}
