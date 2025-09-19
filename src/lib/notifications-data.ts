import type { Notification } from './types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'approval',
    title: 'Activity Approved',
    description: 'Your submission for "AI Hackathon 2023" has been approved by Dr. Davis.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
  },
  {
    id: 'notif-2',
    type: 'deadline',
    title: 'Upcoming Deadline',
    description: 'Project Phase 1 Submission is due in 3 days.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: false,
  },
  {
    id: 'notif-3',
    type: 'announcement',
    title: 'University Fest "Momentum 2026"',
    description: 'The annual cultural and technical fest is scheduled for next month. Get ready!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    read: false,
  },
    {
    id: 'notif-4',
    type: 'approval',
    title: 'OD Request Approved',
    description: 'Your OD request for the "National AI Conference" has been approved.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    read: true,
  },
  {
    id: 'notif-5',
    type: 'deadline',
    title: 'Fee Payment Due',
    description: 'The deadline for semester fee payment is tomorrow.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    read: true,
  }
];
