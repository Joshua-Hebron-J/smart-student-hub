'use client';

import { useState } from 'react';
import StudentDashboardHome from '@/components/student-dashboard-home';
import StudentTimetablePage from './timetable/page';
import StudentPortfolioPage from '../students/[id]/page';
import { useUser } from '@/hooks/use-app-context';
import type { Student } from '@/lib/types';

type View = 'dashboard' | 'timetable' | 'portfolio';

export default function StudentPage() {
    const { user } = useUser();
    const [currentView, setCurrentView] = useState<View>('dashboard');
    
    if (!user || user.role !== 'student') {
        return <div>Loading or not authorized...</div>;
    }

    const student = user as Student;

    // This function will be passed to the header/navigation to change the view
    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    const renderCurrentView = () => {
        switch (currentView) {
        case 'dashboard':
            return <StudentDashboardHome />;
        case 'timetable':
            // We can reuse the existing page component
            return <StudentTimetablePage />;
        case 'portfolio':
             // The portfolio page needs the student's ID
            return <StudentPortfolioPage />;
        default:
            return <StudentDashboardHome />;
        }
    };

    // The parent layout will contain the header. We need to modify the header
    // to call handleViewChange instead of navigating with Link.
    // For now, let's just render the view. The layout and header will be updated next.
    return (
        <div className="flex flex-col gap-8">
            {renderCurrentView()}
        </div>
    );
}
