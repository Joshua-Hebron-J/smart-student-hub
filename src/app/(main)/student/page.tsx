
'use client';

import React from 'react';
import { useUser } from '@/hooks/use-app-context';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load the dashboard component
const StudentDashboardHome = React.lazy(() => import('@/components/student-dashboard-home'));

const DashboardSkeleton = () => (
  <div className="flex flex-col gap-6">
    <Skeleton className="h-28 w-full rounded-xl" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
     <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full rounded-lg" />
        </div>
        <div className="lg:col-span-1">
            <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
  </div>
);


export default function StudentPage() {
    const { user } = useUser();
    
    if (!user || user.role !== 'student') {
        // A loading or unauthorized state could be rendered here.
        // For now, returning null to prevent rendering anything until user is confirmed.
        return null;
    }

    return (
        <div className="flex flex-col gap-6">
            <React.Suspense fallback={<DashboardSkeleton />}>
            <StudentDashboardHome />
            </React.Suspense>
        </div>
    );
}
