'use client';

import { useState } from 'react';
import StudentDashboardHome from '@/components/student-dashboard-home';
import StudentTimetablePage from './timetable/page';
import StudentPortfolioPage from '../students/[id]/page';
import { useUser } from '@/hooks/use-app-context';
import type { Student } from '@/lib/types';
import Header, { type View } from '@/components/header';
import { useRouter } from 'next/navigation';

export default function StudentPage() {
    const { user } = useUser();
    const router = useRouter();
    
    if (!user || user.role !== 'student') {
        return <div>Loading or not authorized...</div>;
    }

    const student = user as Student;

    const handleViewChange = (view: View) => {
        if (view === 'portfolio') {
            router.push(`/students/${student.id}`);
        } else {
            // For dashboard and timetable, we'll need a different approach
            // if we want to keep them as separate pages but feel like SPA.
            // For now, we assume they are components on this page.
            // A full switch to app router would be better.
            router.push(`/student?view=${view}`);
        }
    };
    
    // This is a simplified router based on a query param for non-portfolio views
    // A more robust solution would use Next.js's App Router features more deeply.
    const [currentView, setCurrentView] = useState<View>('dashboard');

    const renderCurrentView = () => {
        switch (currentView) {
        case 'dashboard':
            return <StudentDashboardHome />;
        case 'timetable':
            return <StudentTimetablePage />;
        // Portfolio is now a separate page, so it's not rendered here.
        // We redirect to it.
        default:
            return <StudentDashboardHome />;
        }
    };


    return (
        <>
            <Header currentView={currentView} onViewChange={(view) => {
                if (view === 'portfolio') {
                    router.push(`/students/${student.id}`);
                } else {
                    setCurrentView(view);
                }
            }} />
            <div className="flex flex-col gap-8 mt-6">
                {renderCurrentView()}
            </div>
        </>
    );
}
