
import type { Student, Faculty, Admin, Activity, TimetableEntry, ODApplication, AppUser } from './types';

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'student-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'student',
    avatarUrl: 'https://picsum.photos/seed/alice/100/100',
    department: 'Computer Science',
    major: 'Artificial Intelligence',
    enrollmentYear: 2021,
    registerNumber: 'CS2021001',
    dob: '2003-05-10',
    gpa: 8.8,
    attendance: 92,
    activities: ['activity-1', 'activity-2'],
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'React'],
    interests: ['AI Ethics', 'Robotics', 'Creative Writing'],
    bio: 'Passionate about leveraging AI for social good. Co-founder of the AI for All club and a keen hackathon participant.',
    medicalDetails: {
      condition: 'Pollen Allergy',
      notes: 'Requires access to antihistamines during spring.',
      bloodGroup: 'A+',
      allergies: ['Pollen', 'Dust'],
      emergencyContact: { name: 'John Johnson', phone: '123-456-7890' }
    }
  },
  {
    id: 'student-2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    role: 'student',
    avatarUrl: 'https://picsum.photos/seed/bob/100/100',
    department: 'Mechanical Engineering',
    major: 'Robotics',
    enrollmentYear: 2020,
    registerNumber: 'ME2020015',
    dob: '2002-11-22',
    gpa: 8.2,
    attendance: 85,
    activities: ['activity-3'],
    skills: ['CAD', 'SolidWorks', '3D Printing', 'MATLAB'],
    interests: ['Formula SAE', 'Drone Racing', 'Sustainable Design'],
    bio: 'Mechanical engineering student with a focus on robotics and automation. Captain of the university\'s Formula SAE team.',
  },
];

export const MOCK_FACULTY: Faculty[] = [
  {
    id: 'faculty-1',
    name: 'Dr. Carol Davis',
    email: 'carol@example.com',
    role: 'faculty',
    avatarUrl: 'https://picsum.photos/seed/carol/100/100',
    department: 'Computer Science',
    title: 'Professor',
  },
  {
    id: 'faculty-2',
    name: 'Dr. David Smith',
    email: 'david@example.com',
    role: 'faculty',
    avatarUrl: 'https://picsum.photos/seed/david/100/100',
    department: 'Mechanical Engineering',
    title: 'Associate Professor',
  },
];

export const MOCK_ADMINS: Admin[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatarUrl: 'https://picsum.photos/seed/admin/100/100',
    permissions: ['manage_users', 'view_all_activities'],
  },
];

export const MOCK_USERS: AppUser[] = [...MOCK_STUDENTS, ...MOCK_FACULTY, ...MOCK_ADMINS];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'activity-1',
    studentId: 'student-1',
    name: 'AI Hackathon 2023',
    description: 'Developed a prize-winning sentiment analysis tool for social media comments. Led a team of 4.',
    date: '2023-10-15',
    status: 'approved',
    skills: ['Python', 'NLP', 'Team Leadership'],
  },
  {
    id: 'activity-2',
    studentId: 'student-1',
    name: 'Volunteer Teacher at CodeCamp',
    description: 'Taught basic programming concepts to underprivileged high school students.',
    date: '2023-07-20',
    status: 'pending',
    skills: ['Teaching', 'JavaScript', 'Public Speaking'],
  },
  {
    id: 'activity-3',
    studentId: 'student-2',
    name: 'Formula SAE Competition',
    description: 'Led the aerodynamics sub-team for the 2023 Formula SAE car, resulting in a 15% improvement in downforce.',
    date: '2023-06-05',
    status: 'approved',
    skills: ['CAD', 'Aerodynamics', 'Project Management'],
  },
];


export const MOCK_STUDENT_TIMETABLE: TimetableEntry[] = [
    { day: 'Monday', time: '09:00 - 11:00', course: 'CS401: Advanced Algorithms', location: 'Room 301' },
    { day: 'Tuesday', time: '13:00 - 15:00', course: 'CS405: AI & Ethics', location: 'Room 405' },
    { day: 'Wednesday', time: '10:00 - 12:00', course: 'CS401: Advanced Algorithms Lab', location: 'Lab 5' },
    { day: 'Thursday', time: '14:00 - 16:00', course: 'ME302: Thermodynamics', location: 'Room 210' },
    { day: 'Friday', time: '11:00 - 13:00', course: 'HUM201: Creative Writing', location: 'Room 115' },
];

export const MOCK_FACULTY_TIMETABLE: TimetableEntry[] = [
    { day: 'Monday', time: '09:00 - 11:00', course: 'CS401: Advanced Algorithms', location: 'Room 301' },
    { day: 'Tuesday', time: '13:00 - 15:00', course: 'CS405: AI & Ethics', location: 'Room 405' },
    { day: 'Tuesday', time: '15:00 - 17:00', course: 'Office Hours', location: 'Office 22B' },
    { day: 'Thursday', time: '10:00 - 12:00', course: 'CS201: Data Structures', location: 'Room 101' },
];

export const MOCK_OD_APPLICATIONS: ODApplication[] = [
    { id: 'od-1', studentId: 'student-1', date: '2024-08-15', reason: 'Attending National AI Conference', status: 'approved' },
    { id: 'od-2', studentId: 'student-2', date: '2024-09-01', reason: 'Formula SAE Regional Meet', status: 'pending' },
    { id: 'od-3', studentId: 'student-1', date: '2024-09-05', reason: 'Inter-University Debate Competition', status: 'rejected' },
];
