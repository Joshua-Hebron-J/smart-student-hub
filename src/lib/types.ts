import type { EVENT_CATEGORIES, ACADEMIC_EVENTS_BY_SEMESTER } from "./calendar-data";

export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

export type ActivityCategory = 'Internship' | 'Competition' | 'Workshop' | 'Social Service' | 'Research';

export interface Activity {
  id:string;
  studentId: string;
  name: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  skills: string[];
  aiSummary?: string;
  category: ActivityCategory;
  credits: number;
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


// New Calendar Types
export type EventCategoryKey = keyof typeof EVENT_CATEGORIES;
export type SemesterKey = keyof typeof ACADEMIC_EVENTS_BY_SEMESTER;

export interface AcademicEventV2 {
  id: string;
  title: string;
  category: EventCategoryKey;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  description: string;
  scope: 'University' | 'Department' | 'Personal';
}

export type AcademicEventsBySemester = {
  [semester: string]: AcademicEventV2[];
}
