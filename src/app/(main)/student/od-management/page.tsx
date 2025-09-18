'use client';

import { useState } from 'react';
import { PlusCircle, Check, X, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-app-context';
import { MOCK_OD_APPLICATIONS } from '@/lib/data';

const odSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  reason: z.string().min(10, 'Please provide a detailed reason.'),
});

type ODFormValues = z.infer<typeof odSchema>;

export default function ODManagementPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [applications, setApplications] = useState(MOCK_OD_APPLICATIONS.filter(od => od.studentId === user?.id));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ODFormValues>({
    resolver: zodResolver(odSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      reason: '',
    },
  });

  const onSubmit = (data: ODFormValues) => {
    // In a real app, you would send this to a backend
    console.log(data);
    const newApp = {
      id: `od-${Date.now()}`,
      studentId: user!.id,
      status: 'pending' as const,
      ...data,
    };
    setApplications(prev => [newApp, ...prev]);
    toast({
      title: 'OD Request Submitted',
      description: 'Your request is now pending faculty approval.',
    });
    setIsDialogOpen(false);
    form.reset();
  };
  
  const getStatusIcon = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'approved': return <Check className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected': return <X className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>OD Management</CardTitle>
          <CardDescription>Request and track your on-duty leave applications.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New OD Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit New OD Request</DialogTitle>
              <DialogDescription>Fill out the details for your on-duty leave request.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of OD</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl><Textarea placeholder="e.g., Attending National AI Conference" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Submit Request</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map(app => (
              <TableRow key={app.id}>
                <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{app.reason}</TableCell>
                <TableCell>
                  <Badge variant={app.status === 'approved' ? 'default' : app.status === 'pending' ? 'secondary' : 'destructive'} className="capitalize flex items-center gap-1.5">
                    {getStatusIcon(app.status)}
                    {app.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
