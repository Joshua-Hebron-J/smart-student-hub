
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Percent, TrendingDown, TrendingUp, Calculator } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUser } from '@/hooks/use-app-context';
import type { Student } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const attendanceSchema = z.object({
  totalDays: z.coerce.number().min(1, 'Total days must be at least 1.'),
  daysAttended: z.coerce.number().min(0, 'Days attended cannot be negative.'),
  requiredPercentage: z.coerce.number().min(1, 'Required % must be at least 1').max(100, 'Cannot exceed 100%'),
});

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

interface CalculationResult {
  message: string;
  type: 'safe' | 'warning' | 'danger';
}

export default function AttendanceBuddyPage() {
  const { user } = useUser();
  const student = user as Student;

  const [result, setResult] = useState<CalculationResult | null>(null);

  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      totalDays: 200,
      daysAttended: Math.round(200 * (student.attendance / 100)), // pre-fill based on current attendance
      requiredPercentage: 75,
    },
  });
  
  const currentPercentage = ((form.watch('daysAttended') / form.watch('totalDays')) * 100) || 0;

  const onSubmit = (data: AttendanceFormValues) => {
    const { totalDays, daysAttended, requiredPercentage } = data;

    if (daysAttended > totalDays) {
        setResult({
            message: 'Days attended cannot be greater than total working days.',
            type: 'danger'
        });
        return;
    }

    const requiredDaysAttended = Math.ceil((requiredPercentage / 100) * totalDays);
    const leavesTaken = totalDays - daysAttended;
    const maxLeavesAllowed = totalDays - requiredDaysAttended;
    
    if (leavesTaken > maxLeavesAllowed) {
        const daysShort = requiredDaysAttended - daysAttended;
        setResult({
            message: `You are short on attendance. You need to attend ${daysShort} more class(es) to reach the ${requiredPercentage}% requirement.`,
            type: 'danger'
        });
    } else {
        const leavesYouCanStillTake = maxLeavesAllowed - leavesTaken;
        setResult({
            message: `You are safe! You can take ${leavesYouCanStillTake} more day(s) of leave and still maintain ${requiredPercentage}% attendance.`,
            type: 'safe'
        });
    }
  };

  const getResultIcon = () => {
    if (!result) return null;
    switch (result.type) {
      case 'safe': return <TrendingUp className="h-4 w-4" />;
      case 'warning': return <TrendingDown className="h-4 w-4" />;
      case 'danger': return <TrendingDown className="h-4 w-4" />;
    }
  };
  
   const getResultVariant = () => {
    if (!result) return 'default';
    return result.type === 'danger' ? 'destructive' : 'default';
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
        <CardHeader>
            <CardTitle>Attendance Buddy</CardTitle>
            <CardDescription>Calculate how many classes you can miss while maintaining your desired attendance percentage.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="totalDays"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Total Working Days/Classes</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="daysAttended"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Classes Attended So Far</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="requiredPercentage"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Required Attendance %</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <Button type="submit">
                <Calculator className="mr-2 h-4 w-4"/>
                Calculate
                </Button>
            </form>
            </Form>
        </CardContent>
         {result && (
            <CardFooter>
                 <Alert variant={getResultVariant()}>
                    {getResultIcon()}
                    <AlertTitle>{result.type.charAt(0).toUpperCase() + result.type.slice(1)}</AlertTitle>
                    <AlertDescription>
                        {result.message}
                    </AlertDescription>
                </Alert>
            </CardFooter>
        )}
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                 <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path
                        className="text-muted/50"
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        />
                        <path
                        className="text-primary"
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeDasharray={`${currentPercentage}, 100`}
                        strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">{currentPercentage.toFixed(1)}%</span>
                        <span className="text-sm text-muted-foreground">Attendance</span>
                    </div>
                 </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                 <div className="flex gap-2 items-center text-muted-foreground">
                    <div className="h-3 w-3 rounded-full bg-primary"/>
                    Attended
                 </div>
                  <div className="flex gap-2 items-center text-muted-foreground">
                    <div className="h-3 w-3 rounded-full bg-muted"/>
                    Missed / Remaining
                 </div>
            </CardFooter>
        </Card>
    </div>
  );
}
