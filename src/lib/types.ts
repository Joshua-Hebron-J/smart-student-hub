

export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

export interface Activity {
  id:string;
  studentId: string;
  name: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  skills: string[];
  aiSummary?: string;
}

export interface MedicalRecord {
  condition: string;
  notes: string;
  bloodGroup: string;
  allergies: string[];
  emergencyContact: {
    name: string;
    phone: string;
  };
}

export interface Student extends User {
  role: 'student';
  department: string;
  major: string;
  enrollmentYear: number;
  registerNumber: string;
  dob: string;
  gpa: number;
  attendance: number;
  areaOfInterest: string;
  activities: string[]; // array of activity IDs
  skills: string[];
  interests: string[];
  bio: string;
  medicalDetails?: MedicalRecord;
}

export interface Faculty extends User {
  role: 'faculty';
  department: string;
  title: string;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export type AppUser = Student | Faculty | Admin;

export interface TimetableEntry {
  id: string;
  title: string;
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  location: string;
  description?: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'pink';
}

export interface ODApplication {
  id: string;
  studentId: string;
  date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AcademicEvent {
  date: string;
  title: string;
  color: 'green' | 'orange' | 'red' | 'blue' | 'purple' | 'pink' | 'yellow';
}
