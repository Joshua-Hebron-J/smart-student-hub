'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { MOCK_OD_APPLICATIONS, MOCK_STUDENTS } from '@/lib/data';
import type { ODApplication } from '@/lib/types';
import { useUser } from '@/hooks/use-app-context';

export default function ODApprovalPage() {
  const { user } = useUser();
  const { toast } = useToast();
  
  // In a real app, filter students by faculty's department
  const departmentStudentIds = MOCK_STUDENTS
    .filter(s => s.department === (user as any).department)
    .map(s => s.id);

  const [pendingApplications, setPendingApplications] = useState<ODApplication[]>(
    MOCK_OD_APPLICATIONS.filter(a => a.status === 'pending' && departmentStudentIds.includes(a.studentId))
  );

  const getStudentName = (studentId: string) => {
    return MOCK_STUDENTS.find(s => s.id === studentId)?.name || 'Unknown Student';
  };

  const handleApproval = (applicationId: string, status: 'approved' | 'rejected') => {
    setPendingApplications(prev => prev.filter(a => a.id !== applicationId));
    toast({
        title: `OD Request ${status}`,
        description: 'The student has been notified of the decision.'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>OD Application Approvals</CardTitle>
        <CardDescription>Review and manage on-duty leave requests from your students.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingApplications.length > 0 ? pendingApplications.map(app => (
              <TableRow key={app.id}>
                <TableCell>{getStudentName(app.studentId)}</TableCell>
                <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{app.reason}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" className="text-green-600 hover:text-green-600 hover:bg-green-50 border-green-200 hover:border-green-300" onClick={() => handleApproval(app.id, 'approved')}>
                    <Check className="mr-2 h-4 w-4" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300" onClick={() => handleApproval(app.id, 'rejected')}>
                    <X className="mr-2 h-4 w-4" /> Reject
                  </Button>
                </TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">No pending requests.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
