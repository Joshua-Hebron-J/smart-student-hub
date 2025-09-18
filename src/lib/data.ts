
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
    medicalDetails: {
      condition: 'None',
      notes: 'No significant medical history.',
      bloodGroup: 'B+',
      allergies: ['None'],
      emergencyContact: { name: 'Sarah Williams', phone: '987-654-3210' }
    }
  },
  {
    id: 'student-3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'student',
    avatarUrl: 'https://picsum.photos/seed/charlie/100/100',
    department: 'Business Administration',
    major: 'Marketing',
    enrollmentYear: 2022,
    registerNumber: 'BA2022042',
    dob: '2004-02-14',
    gpa: 9.1,
    attendance: 98,
    activities: [],
    skills: ['Market Research', 'SEO', 'Content Creation', 'Social Media Marketing'],
    interests: ['Entrepreneurship', 'Digital Art', 'Public Speaking'],
    bio: 'A creative and driven marketing student with a passion for building brands and connecting with audiences. Eager to apply my skills in a real-world setting.',
    medicalDetails: {
      condition: 'None',
      notes: '',
      bloodGroup: 'O+',
      allergies: ['Peanuts'],
      emergencyContact: { name: 'Sally Brown', phone: '555-0103' }
    }
  },
  {
    id: 'student-4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    role: 'student',
    avatarUrl: 'https://picsum.photos/seed/diana/100/100',
    department: 'Computer Science',
    major: 'Cybersecurity',
    enrollmentYear: 2021,
    registerNumber: 'CS2021088',
    dob: '2003-08-30',
    gpa: 8.5,
    attendance: 90,
    activities: [],
    skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Linux'],
    interests: ['Ancient History', 'Archery', 'Diplomacy'],
    bio: 'Dedicated cybersecurity student focused on protecting digital infrastructure. My goal is to work in national security or for a major tech firm to combat cyber threats.',
  },
  {
    id: 'student-5',
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    role: 'student',
    avatarUrl: 'https://picsum.photos/seed/ethan/100/100',
    department: 'Mechanical Engineering',
    major: 'Automotive',
    enrollmentYear: 2020,
    registerNumber: 'ME2020031',
    dob: '2002-01-18',
    gpa: 7.9,
    attendance: 81,
    activities: ['activity-3'],
    skills: ['Engine Dynamics', 'Vehicle Design', 'AutoCAD', 'Problem Solving'],
    interests: ['Rock Climbing', 'Motorcycle Restoration', 'Travel'],
    bio: 'Hands-on automotive engineering student with a knack for solving impossible problems. I thrive under pressure and enjoy working on complex mechanical systems.',
  }
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
   {
    id: 'faculty-3',
    name: 'Dr. Evelyn Reed',
    email: 'evelyn@example.com',
    role: 'faculty',
    avatarUrl: 'https://picsum.photos/seed/evelyn/100/100',
    department: 'Business Administration',
    title: 'Department Head',
  },
  {
    id: 'faculty-4',
    name: 'Dr. Frank Miller',
    email: 'frank@example.com',
    role: 'faculty',
    avatarUrl: 'https://picsum.photos/seed/frank/100/100',
    department: 'Computer Science',
    title: 'Assistant Professor',
  },
  {
    id: 'faculty-5',
    name: 'Dr. Grace Lee',
    email: 'grace@example.com',
    role: 'faculty',
    avatarUrl: 'https://picsum.photos/seed/grace/100/100',
    department: 'Mechanical Engineering',
    title: 'Professor',
  }
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
  {
    id: 'activity-4',
    studentId: 'student-5',
    name: 'Engine Overhaul Workshop',
    description: 'Participated in a 3-day workshop on completely disassembling and reassembling a V8 engine. Diagnosed and fixed three simulated faults.',
    date: '2024-02-20',
    status: 'approved',
    skills: ['Engine Dynamics', 'Fault Diagnosis', 'Teamwork'],
  },
  {
    id: 'activity-5',
    studentId: 'student-3',
    name: 'National Business Plan Competition',
    description: 'Reached the semi-finals with an innovative business plan for a sustainable packaging startup. Developed the marketing and go-to-market strategy.',
    date: '2024-04-10',
    status: 'pending',
    skills: ['Market Research', 'Business Strategy', 'Financial Projections'],
  },
];


export const MOCK_STUDENT_TIMETABLE: TimetableEntry[] = [
  // Monday
  { id: 'tt-m1', title: 'Calculus II', day: 'Monday', startTime: '08:00', endTime: '09:00', location: 'Hall A', color: 'blue' },
  { id: 'tt-m2', title: 'Intro to Python', day: 'Monday', startTime: '09:00', endTime: '11:00', location: 'Lab 3', color: 'green' },
  { id: 'tt-m3', title: 'Lunch Break', day: 'Monday', startTime: '12:00', endTime: '13:00', location: 'Cafeteria', color: 'orange' },
  { id: 'tt-m4', title: 'Physics I', day: 'Monday', startTime: '14:00', endTime: '15:30', location: 'Sci-201', color: 'purple' },
  { id: 'tt-m5', title: 'Robotics Club', day: 'Monday', startTime: '17:00', endTime: '18:30', location: 'Mech Hall', color: 'red' },

  // Tuesday
  { id: 'tt-t1', title: 'Data Structures', day: 'Tuesday', startTime: '10:00', endTime: '12:00', location: 'CS-101', color: 'blue' },
  { id: 'tt-t2', title: 'English Composition', day: 'Tuesday', startTime: '12:00', endTime: '13:00', location: 'Arts-50', color: 'pink' },
  { id: 'tt-t3', title: 'AI & Ethics', day: 'Tuesday', startTime: '13:00', endTime: '15:00', location: 'Room 405', color: 'purple' },
  { id: 'tt-t4', title: 'Library Study Session', day: 'Tuesday', startTime: '15:00', endTime: '17:00', location: 'Library', color: 'red' },
  { id: 'tt-t5', title: 'Gym Time', day: 'Tuesday', startTime: '18:00', endTime: '19:00', location: 'Campus Gym', color: 'orange' },

  // Wednesday
  { id: 'tt-w1', title: 'Calculus II', day: 'Wednesday', startTime: '08:00', endTime: '09:00', location: 'Hall A', color: 'blue' },
  { id: 'tt-w2', title: 'Intro to Python Lab', day: 'Wednesday', startTime: '10:00', endTime: '12:00', location: 'Lab 5', color: 'green' },
  { id: 'tt-w3', title: 'Lunch', day: 'Wednesday', startTime: '12:00', endTime: '13:00', location: 'Cafeteria', color: 'orange' },
  { id: 'tt-w4', title: 'Physics I Lab', day: 'Wednesday', startTime: '14:00', endTime: '16:00', location: 'Physics Lab B', color: 'purple' },
  { id: 'tt-w5', title: 'Study Group for DS', day: 'Wednesday', startTime: '16:00', endTime: '18:00', location: 'Library', color: 'red' },

  // Thursday
  { id: 'tt-th1', title: 'Data Structures', day: 'Thursday', startTime: '10:00', endTime: '12:00', location: 'CS-101', color: 'blue' },
  { id: 'tt-th2', title: 'Thermodynamics', day: 'Thursday', startTime: '14:00', endTime: '16:00', location: 'Room 210', color: 'orange' },
  { id: 'tt-th3', title: 'Presentation Skills Workshop', day: 'Thursday', startTime: '16:00', endTime: '17:30', location: 'Auditorium', color: 'pink' },
  { id: 'tt-th4', title: 'Part-time Job', day: 'Thursday', startTime: '18:00', endTime: '21:00', location: 'Campus Cafe', color: 'green' },
  { id: 'tt-th5', title: 'Meet with Advisor', day: 'Thursday', startTime: '12:30', endTime: '13:00', location: 'Office 22B', color: 'purple' },
  
  // Friday
  { id: 'tt-f1', title: 'Calculus II', day: 'Friday', startTime: '08:00', endTime: '09:00', location: 'Hall A', color: 'blue' },
  { id: 'tt-f2', title: 'Creative Writing', day: 'Friday', startTime: '11:00', endTime: '13:00', location: 'Room 115', color: 'pink' },
  { id: 'tt-f3', title: 'Team Project Meeting', day: 'Friday', startTime: '14:00', endTime: '16:00', location: 'Project Room 3', color: 'green' },
  { id: 'tt-f4', title: 'Weekly Quiz - Physics', day: 'Friday', startTime: '16:00', endTime: '17:00', location: 'Sci-201', color: 'purple' },
  { id: 'tt-f5', title: 'Movie Night', day: 'Friday', startTime: '19:00', endTime: '21:00', location: 'Common Room', color: 'red' }
];

export const MOCK_FACULTY_TIMETABLE: TimetableEntry[] = [
  { id: 'tt-f1', title: 'CS401: Adv. Algorithms', day: 'Monday', startTime: '09:00', endTime: '11:00', location: 'Room 301', color: 'blue' },
  { id: 'tt-f2', title: 'CS405: AI & Ethics', day: 'Tuesday', startTime: '13:00', endTime: '15:00', location: 'Room 405', color: 'purple' },
  { id: 'tt-f3', title: 'Office Hours', day: 'Tuesday', startTime: '15:00', endTime: '17:00', location: 'Office 22B', color: 'green' },
  { id: 'tt-f4', title: 'CS201: Data Structures', day: 'Thursday', startTime: '10:00', endTime: '12:00', location: 'Room 101', color: 'blue' },
  { id: 'tt-f5', title: 'Department Meeting', day: 'Friday', startTime: '15:00', endTime: '16:00', location: 'Conf Room 3', color: 'red' },
];

export const MOCK_OD_APPLICATIONS: ODApplication[] = [
    { id: 'od-1', studentId: 'student-1', date: '2024-08-15', reason: 'Attending National AI Conference', status: 'approved' },
    { id: 'od-2', studentId: 'student-2', date: '2024-09-01', reason: 'Formula SAE Regional Meet', status: 'pending' },
    { id: 'od-3', studentId: 'student-1', date: '2024-09-05', reason: 'Inter-University Debate Competition', status: 'rejected' },
    { id: 'od-4', studentId: 'student-4', date: '2024-09-12', reason: 'DefCon Hacking Conference', status: 'pending' },
];
