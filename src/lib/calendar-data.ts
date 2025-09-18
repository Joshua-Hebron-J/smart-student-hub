// src/lib/calendarData.ts

import type { AcademicEventV2 } from './types';

export const EVENT_CATEGORIES = {
  Exam: { label: 'Exams', color: '#D32F2F' }, // Red
  Holiday: { label: 'Holidays', color: '#388E3C' }, // Green
  UniversityEvent: { label: 'University Events', color: '#1976D2' }, // Blue
  DepartmentEvent: { label: 'Department Events', color: '#7B1FA2' }, // Purple
  Deadline: { label: 'Deadlines', color: '#F57C00' }, // Orange
  Personal: { label: 'Personal Events', color: '#5D4037' }, // Brown
};

export const ACADEMIC_EVENTS: AcademicEventV2[] = [
  {
    id: 'evt001',
    title: 'Internal Assessment I',
    category: 'Exam',
    startDate: '2025-09-15T09:00:00',
    endDate: '2025-09-19T17:00:00',
    description: 'First internal assessment for all departments. The detailed per-subject schedule is available on the notice board.',
    scope: 'University',
  },
  {
    id: 'evt002',
    title: 'Hackathon Registration Deadline',
    category: 'Deadline',
    startDate: '2025-09-25T23:59:00',
    endDate: '2025-09-25T23:59:00',
    description: 'Final day to register for the "Innovate India" hackathon. See the attached flyer for more details.',
    scope: 'Department',
  },
  {
    id: 'evt003',
    title: 'Submit DSA Assignment',
    category: 'Personal',
    startDate: '2025-09-25T22:00:00',
    endDate: '2025-09-25T22:00:00',
    description: 'Submit the assignment on AVL Trees.',
    scope: 'Personal',
  },
  {
    id: 'evt004',
    title: 'Tech Fest Planning Meeting',
    category: 'UniversityEvent',
    startDate: '2025-09-26T15:00:00',
    endDate: '2025-09-26T16:00:00',
    description: 'Core committee meeting in the main auditorium.',
    scope: 'University',
  },
  {
    id: 'evt005',
    title: 'Gandhi Jayanti',
    category: 'Holiday',
    startDate: '2025-10-02T00:00:00',
    endDate: '2025-10-02T23:59:59',
    description: 'National holiday on account of Gandhi Jayanti.',
    scope: 'University',
  },
  {
    id: 'evt006',
    title: 'Mid-Term Exams',
    category: 'Exam',
    startDate: '2025-10-20T09:00:00',
    endDate: '2025-10-28T17:00:00',
    description: 'Mid-term examinations for the Fall semester.',
    scope: 'University',
  },
  {
    id: 'evt007',
    title: 'Diwali Break',
    category: 'Holiday',
    startDate: '2025-11-01T00:00:00',
    endDate: '2025-11-05T23:59:59',
    description: 'Holiday break for Diwali festival.',
    scope: 'University',
  },
  {
    id: 'evt008',
    title: 'Project Phase 1 Submission',
    category: 'Deadline',
    startDate: '2025-11-15T23:59:00',
    endDate: '2025-11-15T23:59:00',
    description: 'Deadline for submitting the first phase of the final year project.',
    scope: 'Department',
  },
  {
    id: 'evt009',
    title: 'Alumni Meet 2025',
    category: 'UniversityEvent',
    startDate: '2025-12-20T10:00:00',
    endDate: '2025-12-20T18:00:00',
    description: 'Annual alumni meet.',
    scope: 'University',
  },
  {
    id: 'evt010',
    title: 'Christmas Day',
    category: 'Holiday',
    startDate: '2025-12-25T00:00:00',
    endDate: '2025-12-25T23:59:59',
    description: 'National holiday for Christmas.',
    scope: 'University',
  },
];
