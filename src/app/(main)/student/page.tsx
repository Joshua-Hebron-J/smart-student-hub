'use client';

import { useState } from 'react';
import StudentDashboardHome from '@/components/student-dashboard-home';
import StudentTimetablePage from './timetable/page';
import StudentPortfolioPage from '../students/[id]/page';
import { useUser } from '@/hooks/use-app-context';
import type { Student } from '@/lib/types';
import Header, { type View } from '@/components/header';

export default function StudentPage() {
    const { user } = useUser();
    const [currentView, setCurrentView] = useState<View>('dashboard');
    
    if (!user || user.role !== 'student') {
        return <div>Loading or not authorized...</div>;
    }

    const student = user as Student;

    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    const renderCurrentView = () => {
        switch (currentView) {
        case 'dashboard':
            return <StudentDashboardHome />;
        case 'timetable':
            return <StudentTimetablePage />;
        case 'portfolio':
            return <StudentPortfolioPage />;
        default:
            return <StudentDashboardHome />;
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
