import type { Student, Faculty, Admin, Activity, TimetableEntry, ODApplication, AppUser, AcademicEventV2, Notification, EventCategoryKey, AcademicEventsBySemester } from './types';

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
    areaOfInterest: 'Machine Learning',
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
    areaOfInterest: 'Robotics',
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
    areaOfInterest: 'Digital Marketing',
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
    areaOfInterest: 'Ethical Hacking',
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
    areaOfInterest: 'Vehicle Dynamics',
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
    publications: [
      { title: 'The Future of Ethical AI', journal: 'Journal of AI Research', year: 2023 },
      { title: 'Advanced Reinforcement Learning Techniques', journal: 'IEEE Transactions on Neural Networks', year: 2022 },
      { title: 'A Survey of Neuromorphic Computing', journal: 'Nature Communications', year: 2021 },
    ],
  },
  {
    id: 'faculty-2',
    name: 'Dr. David Smith',
    email: 'david@example.com',
    role: 'faculty',
    avatarUrl: 'https://picsum.photos/seed/david/100/100',
    department: 'Mechanical Engineering',
    title: 'Associate Professor',
    publications: [
      { title: 'Innovations in 3D-Printed Prosthetics', journal: 'Journal of Biomechanical Engineering', year: 2023 },
      { title: 'Aerodynamic Efficiency in Urban Drone Delivery', journal: 'AIAA Journal', year: 2022 },
    ],
  },
   {
    id: 'faculty-3',
    name: 'Dr. Evelyn Reed',
    email: 'evelyn@example.com',
    role: 'faculty',
    avatarUrl: 'https://picsum.photos/seed/evelyn/100/100',
    department: 'Business Administration',
    title: 'Department Head',
    publications: [
        { title: 'Consumer Behavior in Digital Markets', journal: 'Journal of Marketing Research', year: 2024 },
        { title: 'The Impact of AI on Modern Marketing Strategies', journal: 'Harvard Business Review', year: 2023 },
    ],
  },
  {
    id: 'faculty-4',
    name: 'Dr. Frank Miller',
    email: 'frank@example.com',
    role: 'faculty',
    avatarUrl: 'https://picsum.photos/seed/frank/100/100',
    department: 'Computer Science',
    title: 'Assistant Professor',
    publications: [
        { title: 'A Novel Approach to Network Intrusion Detection', journal: 'Computers & Security', year: 2024 },
    ],
  },
  {
    id: 'faculty-5',
    name: 'Dr. Grace Lee',
    email: 'grace@example.com',
    role: 'faculty',
    avatarUrl: 'https://picsum.photos/seed/grace/100/100',
    department: 'Mechanical Engineering',
    title: 'Professor',
    publications: [
        { title: 'Fatigue Analysis in Composite Materials', journal: 'International Journal of Fatigue', year: 2024 },
        { title: 'Robotic Arm Dynamics for High-Precision Manufacturing', journal: 'Robotics and Computer-Integrated Manufacturing', year: 2023 },
    ],
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

export const ACTIVITY_CATEGORIES: Activity['category'][] = ['Internship', 'Competition', 'Workshop', 'Social Service', 'Research'];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'activity-1',
    studentId: 'student-1',
    name: 'AI Hackathon 2023',
    description: 'Developed a prize-winning sentiment analysis tool for social media comments. Led a team of 4.',
    date: '2023-10-15',
    status: 'approved',
    skills: ['Python', 'NLP', 'Team Leadership'],
    category: 'Competition',
    credits: 15,
  },
  {
    id: 'activity-2',
    studentId: 'student-1',
    name: 'Volunteer Teacher at CodeCamp',
    description: 'Taught basic programming concepts to underprivileged high school students.',
    date: '2023-07-20',
    status: 'pending',
    skills: ['Teaching', 'JavaScript', 'Public Speaking'],
    category: 'Social Service',
    credits: 5,
  },
  {
    id: 'activity-3',
    studentId: 'student-2',
    name: 'Formula SAE Competition',
    description: 'Led the aerodynamics sub-team for the 2023 Formula SAE car, resulting in a 15% improvement in downforce.',
    date: '2023-06-05',
    status: 'approved',
    skills: ['CAD', 'Aerodynamics', 'Project Management'],
    category: 'Competition',
    credits: 20,
  },
  {
    id: 'activity-4',
    studentId: 'student-5',
    name: 'Engine Overhaul Workshop',
    description: 'Participated in a 3-day workshop on completely disassembling and reassembling a V8 engine. Diagnosed and fixed three simulated faults.',
    date: '2024-02-20',
    status: 'approved',
    skills: ['Engine Dynamics', 'Fault Diagnosis', 'Teamwork'],
    category: 'Workshop',
    credits: 10,
  },
  {
    id: 'activity-5',
    studentId: 'student-3',
    name: 'National Business Plan Competition',
    description: 'Reached the semi-finals with an innovative business plan for a sustainable packaging startup. Developed the marketing and go-to-market strategy.',
    date: '2024-04-10',
    status: 'pending',
    skills: ['Market Research', 'Business Strategy', 'Financial Projections'],
    category: 'Competition',
    credits: 15,
  },
   {
    id: 'activity-6',
    studentId: 'student-4',
    name: 'Summer Internship at CyberCorp',
    description: 'Worked as a security analyst intern, identifying and patching vulnerabilities in web applications.',
    date: '2024-08-01',
    status: 'approved',
    skills: ['Penetration Testing', 'OWASP Top 10', 'Python'],
    category: 'Internship',
    credits: 40,
  },
   {
    id: 'activity-7',
    studentId: 'student-1',
    name: 'Research Paper on LLM Bias',
    description: 'Co-authored a research paper on identifying and mitigating bias in large language models, published in a university journal.',
    date: '2024-05-15',
    status: 'approved',
    skills: ['Research', 'AI Ethics', 'Python'],
    category: 'Research',
    credits: 25,
  },
   {
    id: 'activity-8',
    studentId: 'student-2',
    name: 'Paper on 3D Printed Prosthetics',
    description: 'Co-authored a research paper on using novel materials for 3D printed prosthetics.',
    date: '2024-09-01',
    status: 'pending',
    skills: ['Research', '3D Printing', 'Materials Science'],
    category: 'Research',
    credits: 25,
  },
];


export const MOCK_STUDENT_TIMETABLE: TimetableEntry[] = [
  // Monday
  { id: 'tt-m1', title: 'Calculus II', day: 'Monday', startTime: '08:00', endTime: '09:00', location: 'Hall A', color: 'blue', description: 'Prof. Einstein' },
  { id: 'tt-m2', title: 'Intro to Python', day: 'Monday', startTime: '09:00', endTime: '11:00', location: 'Lab 3', color: 'green', description: 'Prof. Turing' },
  { id: 'tt-m3', title: 'Lunch Break', day: 'Monday', startTime: '12:00', endTime: '13:00', location: 'Cafeteria', color: 'orange' },
  { id: 'tt-m4', title: 'Physics I', day: 'Monday', startTime: '14:00', endTime: '15:30', location: 'Sci-201', color: 'purple', description: 'Prof. Newton' },
  { id: 'tt-m5', title: 'Robotics Club', day: 'Monday', startTime: '17:00', endTime: '18:30', location: 'Mech Hall', color: 'red' },

  // Tuesday
  { id: 'tt-t1', title: 'Data Structures', day: 'Tuesday', startTime: '10:00', endTime: '12:00', location: 'CS-101', color: 'blue', description: 'Prof. Knuth' },
  { id: 'tt-t2', title: 'English Composition', day: 'Tuesday', startTime: '12:00', endTime: '13:00', location: 'Arts-50', color: 'pink', description: 'Prof. Austen' },
  { id: 'tt-t3', title: 'AI & Ethics', day: 'Tuesday', startTime: '13:00', endTime: '15:00', location: 'Room 405', color: 'purple', description: 'Prof. Asimov' },
  { id: 'tt-t4', title: 'Library Study Session', day: 'Tuesday', startTime: '15:00', endTime: '17:00', location: 'Library', color: 'red' },
  { id: 'tt-t5', title: 'Gym Time', day: 'Tuesday', startTime: '18:00', endTime: '19:00', location: 'Campus Gym', color: 'orange' },

  // Wednesday
  { id: 'tt-w1', title: 'Calculus II', day: 'Wednesday', startTime: '08:00', endTime: '09:00', location: 'Hall A', color: 'blue', description: 'Prof. Einstein' },
  { id: 'tt-w2', title: 'Intro to Python Lab', day: 'Wednesday', startTime: '10:00', endTime: '12:00', location: 'Lab 5', color: 'green', description: 'Prof. Turing' },
  { id: 'tt-w3', title: 'Lunch', day: 'Wednesday', startTime: '12:00', endTime: '13:00', location: 'Cafeteria', color: 'orange' },
  { id: 'tt-w4', title: 'Physics I Lab', day: 'Wednesday', startTime: '14:00', endTime: '16:00', location: 'Physics Lab B', color: 'purple', description: 'Prof. Newton' },
  { id: 'tt-w5', title: 'Study Group for DS', day: 'Wednesday', startTime: '16:00', endTime: '18:00', location: 'Library', color: 'red' },

  // Thursday
  { id: 'tt-th1', title: 'Data Structures', day: 'Thursday', startTime: '10:00', endTime: '12:00', location: 'CS-101', color: 'blue', description: 'Prof. Knuth' },
  { id: 'tt-th2', title: 'Thermodynamics', day: 'Thursday', startTime: '14:00', endTime: '16:00', location: 'Room 210', color: 'orange', description: 'Prof. Carnot' },
  { id: 'tt-th3', title: 'Presentation Skills Workshop', day: 'Thursday', startTime: '16:00', endTime: '17:30', location: 'Auditorium', color: 'pink' },
  { id: 'tt-th4', title: 'Part-time Job', day: 'Thursday', startTime: '18:00', endTime: '21:00', location: 'Campus Cafe', color: 'green' },
  { id: 'tt-th5', title: 'Meet with Advisor', day: 'Thursday', startTime: '12:30', endTime: '13:00', location: 'Office 22B', color: 'purple' },
  
  // Friday
  { id: 'tt-f1', title: 'Calculus II', day: 'Friday', startTime: '08:00', endTime: '09:00', location: 'Hall A', color: 'blue', description: 'Prof. Einstein' },
  { id: 'tt-f2', title: 'Creative Writing', day: 'Friday', startTime: '11:00', endTime: '13:00', location: 'Room 115', color: 'pink', description: 'Prof. Woolf' },
  { id: 'tt-f3', title: 'Team Project Meeting', day: 'Friday', startTime: '14:00', endTime: '16:00', location: 'Project Room 3', color: 'green' },
  { id: 'tt-f4', title: 'Weekly Quiz - Physics', day: 'Friday', startTime: '16:00', endTime: '17:00', location: 'Sci-201', color: 'purple' },
  { id: 'tt-f5', title: 'Movie Night', day: 'Friday', startTime: '19:00', endTime: '21:00', location: 'Common Room', color: 'red' }
];

export const MOCK_FACULTY_TIMETABLE: TimetableEntry[] = [
  { id: 'tt-f1', title: 'CS401: Adv. Algorithms', day: 'Monday', startTime: '09:00', endTime: '11:00', location: 'Room 301', color: 'blue' },
  { id: 'tt-f8', title: 'Office Hours', day: 'Monday', startTime: '13:00', endTime: '14:00', location: 'Office 22B', color: 'green' },
  { id: 'tt-f2', title: 'CS405: AI & Ethics', day: 'Tuesday', startTime: '13:00', endTime: '15:00', location: 'Room 405', color: 'purple' },
  { id: 'tt-f3', title: 'Office Hours', day: 'Tuesday', startTime: '15:00', endTime: '17:00', location: 'Office 22B', color: 'green' },
  { id: 'tt-f6', title: 'CS305: Operating Systems', day: 'Wednesday', startTime: '10:00', endTime: '12:00', location: 'Room 205', color: 'orange' },
  { id: 'tt-f7', title: 'CS401L: Adv. Algorithms Lab', day: 'Wednesday', startTime: '14:00', endTime: '16:00', location: 'Lab 7', color: 'pink' },
  { id: 'tt-f4', title: 'CS201: Data Structures', day: 'Thursday', startTime: '10:00', endTime: '12:00', location: 'Room 101', color: 'blue' },
  { id: 'tt-f5', title: 'Department Meeting', day: 'Friday', startTime: '15:00', endTime: '16:00', location: 'Conf Room 3', color: 'red' },
];

export const MOCK_OD_APPLICATIONS: ODApplication[] = [
    { id: 'od-1', studentId: 'student-1', date: '2024-08-15', reason: 'Attending National AI Conference', status: 'approved' },
    { id: 'od-2', studentId: 'student-2', date: '2024-09-01', reason: 'Formula SAE Regional Meet', status: 'pending' },
    { id: 'od-3', studentId: 'student-1', date: '2024-09-05', reason: 'Inter-University Debate Competition', status: 'rejected' },
    { id: 'od-4', studentId: 'student-4', date: '2024-09-12', reason: 'DefCon Hacking Conference', status: 'pending' },
    { id: 'od-5', studentId: 'student-2', date: '2024-09-20', reason: 'ASME Conference Presentation', status: 'pending' },
];


export const EVENT_CATEGORIES: Record<EventCategoryKey, { label: string; color: string; }> = {
  Exam: { label: 'Exams', color: '#D32F2F' }, // Red
  Holiday: { label: 'Holidays', color: '#388E3C' }, // Green
  UniversityEvent: { label: 'University Events', color: '#1976D2' }, // Blue
  DepartmentEvent: { label: 'Department Events', color: '#7B1FA2' }, // Purple
  Deadline: { label: 'Deadlines', color: '#F57C00' }, // Orange
  Personal: { label: 'Personal Events', color: '#5D4037' }, // Brown
};

export const ACADEMIC_EVENTS_BY_SEMESTER: AcademicEventsBySemester = {
  // --- FALL SEMESTER (ODD) ---
  'Odd Semester 2025': [
    {
      id: 'evt011',
      title: 'Fall Semester Begins',
      category: 'UniversityEvent',
      startDate: '2025-08-18T09:00:00',
      endDate: '2025-08-18T09:00:00',
      description: 'First day of classes for the Fall 2025 semester.',
      scope: 'University',
    },
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
      title: 'Internal Assessment II',
      category: 'Exam',
      startDate: '2025-10-20T09:00:00',
      endDate: '2025-10-28T17:00:00',
      description: 'Second internal assessment for the Fall semester.',
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
      id: 'evt012',
      title: 'End Semester Lab Exams',
      category: 'Exam',
      startDate: '2025-11-24T09:00:00',
      endDate: '2025-11-28T17:00:00',
      description: 'Practical laboratory examinations for the Fall semester.',
      scope: 'Department',
    },
    {
      id: 'evt013',
      title: 'End Semester Theory Exams',
      category: 'Exam',
      startDate: '2025-12-01T09:00:00',
      endDate: '2025-12-15T17:00:00',
      description: 'Final theory examinations for the Fall semester.',
      scope: 'University',
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
    {
      id: 'evt014',
      title: 'Winter Break',
      category: 'Holiday',
      startDate: '2025-12-16T00:00:00',
      endDate: '2026-01-18T23:59:59',
      description: 'Winter vacation for students.',
      scope: 'University',
    },
  ],
  // --- SPRING SEMESTER (EVEN) ---
  'Even Semester 2026': [
    {
      id: 'evt015',
      title: 'Spring Semester Begins',
      category: 'UniversityEvent',
      startDate: '2026-01-19T09:00:00',
      endDate: '2026-01-19T09:00:00',
      description: 'First day of classes for the Spring 2026 semester.',
      scope: 'University',
    },
    {
      id: 'evt016',
      title: 'Republic Day',
      category: 'Holiday',
      startDate: '2026-01-26T00:00:00',
      endDate: '2026-01-26T23:59:59',
      description: 'National holiday for Republic Day.',
      scope: 'University',
    },
    {
      id: 'evt017',
      title: 'Internal Assessment I (Spring)',
      category: 'Exam',
      startDate: '2026-02-16T09:00:00',
      endDate: '2026-02-20T17:00:00',
      description: 'First internal assessment for the Spring semester.',
      scope: 'University',
    },
    {
      id: 'evt018',
      title: 'Holi',
      category: 'Holiday',
      startDate: '2026-03-06T00:00:00',
      endDate: '2026-03-06T23:59:59',
      description: 'Holiday for the festival of Holi.',
      scope: 'University',
    },
    {
      id: 'evt019',
      title: 'Momentum 2026 - University Fest',
      category: 'UniversityEvent',
      startDate: '2026-03-12T10:00:00',
      endDate: '2026-03-14T22:00:00',
      description: 'The annual cultural and technical festival of the university.',
      scope: 'University',
    },
    {
      id: 'evt020',
      title: 'Spring Break',
      category: 'Holiday',
      startDate: '2026-03-15T00:00:00',
      endDate: '2026-03-22T23:59:59',
      description: 'Mid-semester break for students.',
      scope: 'University',
    },
    {
      id: 'evt021',
      title: 'Internal Assessment II (Spring)',
      category: 'Exam',
      startDate: '2026-04-13T09:00:00',
      endDate: '2026-04-17T17:00:00',
      description: 'Second internal assessment for the Spring semester.',
      scope: 'University',
    },
    {
      id: 'evt022',
      title: 'End Semester Lab Exams (Spring)',
      category: 'Exam',
      startDate: '2026-05-04T09:00:00',
      endDate: '2026-05-08T17:00:00',
      description: 'Practical laboratory examinations for the Spring semester.',
      scope: 'Department',
    },
    {
      id: 'evt023',
      title: 'End Semester Theory Exams (Spring)',
      category: 'Exam',
      startDate: '2026-05-11T09:00:00',
      endDate: '2026-05-25T17:00:00',
      description: 'Final theory examinations for the Spring semester.',
      scope: 'University',
    },
    {
      id: 'evt024',
      title: 'Summer Break Begins',
      category: 'Holiday',
      startDate: '2026-05-26T00:00:00',
      endDate: '2026-08-17T23:59:59',
      description: 'Summer vacation for students.',
      scope: 'University',
    },
  ],
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'student-1',
    type: 'approval',
    title: 'Activity Approved',
    description: 'Your submission for "AI Hackathon 2023" has been approved by Dr. Davis.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
  },
  {
    id: 'notif-2',
    userId: 'all',
    type: 'deadline',
    title: 'Upcoming Deadline',
    description: 'Project Phase 1 Submission is due in 3 days.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: false,
  },
  {
    id: 'notif-3',
    userId: 'all',
    type: 'announcement',
    title: 'University Fest "Momentum 2026"',
    description: 'The annual cultural and technical fest is scheduled for next month. Get ready!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    read: false,
  },
    {
    id: 'notif-4',
    userId: 'student-1',
    type: 'approval',
    title: 'OD Request Approved',
    description: 'Your OD request for the "National AI Conference" has been approved.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    read: true,
  },
  {
    id: 'notif-5',
    userId: 'all',
    type: 'deadline',
    title: 'Fee Payment Due',
    description: 'The deadline for semester fee payment is tomorrow.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    read: true,
  }
];
