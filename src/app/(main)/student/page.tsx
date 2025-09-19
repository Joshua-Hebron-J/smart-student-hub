'use client';

import React, { useState, useMemo } from 'react';
import StudentTimetablePage from './timetable/page';
import { useUser } from '@/hooks/use-app-context';
import type { Student } from '@/lib/types';
import Header, { type View } from '@/components/header';
import { useRouter } from 'next/navigation';
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
    const router = useRouter();
    const [currentView, setCurrentView] = useState<View>('dashboard');
    
    if (!user || user.role !== 'student') {
        // A loading or unauthorized state could be rendered here.
        // For now, returning null to prevent rendering anything until user is confirmed.
        return null;
    }

    const student = user as Student;

    const handleViewChange = (view: View) => {
        if (view === 'portfolio') {
            router.push(`/students/${student.id}`);
        } else {
            setCurrentView(view);
        }
    };
    
    const renderCurrentView = () => {
        switch (currentView) {
        case 'dashboard':
            return (
                <React.Suspense fallback={<DashboardSkeleton />}>
                    <StudentDashboardHome />
                </React.Suspense>
            );
        case 'timetable':
            return <StudentTimetablePage />;
        // Portfolio is a separate page, so it's not rendered here.
        case 'portfolio':
             // This case is handled by router push, but as a fallback, show dashboard
            return (
                <React.Suspense fallback={<DashboardSkeleton />}>
                    <StudentDashboardHome />
                </React.Suspense>
            );
        default:
             return (
                <React.Suspense fallback={<DashboardSkeleton />}>
                    <StudentDashboardHome />
                </React.Suspense>
            );
        }
    };


    return (
        <>
            <Header currentView={currentView} onViewChange={handleViewChange} />
            <div className="flex flex-col gap-8 mt-6">
                {renderCurrentView()}
            </div>
        </>
    );
}
