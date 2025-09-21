'use client';

import { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import type { AppUser, Notification, Activity, ODApplication } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';
import { MOCK_NOTIFICATIONS, MOCK_ACTIVITIES, MOCK_OD_APPLICATIONS, MOCK_USERS } from '@/lib/data';

interface AppContextType {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
  isLoading: boolean;
  
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read' | 'userId'>, userId: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  
  activities: Activity[];
  updateActivityStatus: (activityId: string, status: 'approved' | 'rejected') => Activity | undefined;

  odApplications: ODApplication[];
  updateODStatus: (applicationId: string, status: 'approved' | 'rejected') => ODApplication | undefined;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const [state, setState] = useState<T>(() => {
        try {
            if (typeof window !== 'undefined') {
                const storedValue = localStorage.getItem(key);
                return storedValue ? JSON.parse(storedValue) : defaultValue;
            }
        } catch (error) {
            console.error(`Error reading from localStorage key “${key}”:`, error);
        }
        return defaultValue;
    });

    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(state));
            }
        } catch (error) {
            console.error(`Error writing to localStorage key “${key}”:`, error);
        }
    }, [key, state]);

    return [state, setState];
}


export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activities, setActivities] = usePersistentState<Activity[]>('activities', MOCK_ACTIVITIES);
  const [odApplications, setODApplications] = usePersistentState<ODApplication[]>('odApplications', MOCK_OD_APPLICATIONS);
  const [notifications, setNotifications] = usePersistentState<Notification[]>('notifications', MOCK_NOTIFICATIONS);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let userIsSet = false;
    try {
      const storedUser = localStorage.getItem('smart-student-hub-user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserState(parsedUser);
        userIsSet = true;
        if (pathname === '/') {
          router.replace(`/${parsedUser.role}`);
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('smart-student-hub-user');
    } finally {
      setIsLoading(false);
      if (!userIsSet && pathname !== '/') {
        router.replace('/');
      }
    }
  }, []);
  
  const currentUserNotifications = useMemo(() => {
    if (!user) return [];
    return notifications.filter(n => n.userId === user.id || n.userId === 'all');
  }, [notifications, user]);

  const setUser = (user: AppUser | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('smart-student-hub-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smart-student-hub-user');
      // Optional: Clear all data on logout if desired
      // localStorage.removeItem('activities');
      // localStorage.removeItem('odApplications');
      // localStorage.removeItem('notifications');
      router.replace('/');
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read' | 'userId'>, userId: string) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
      userId: userId,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  const markAsRead = (id: string) => {
     setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }
  
  const markAllAsRead = () => {
    if(!user) return;
    setNotifications(prev => prev.map(n => n.userId === user.id ? { ...n, read: true } : n));
  }
  
  const updateActivityStatus = (activityId: string, status: 'approved' | 'rejected') => {
    let updatedActivity: Activity | undefined;
    setActivities(prev => prev.map(act => {
        if(act.id === activityId) {
            updatedActivity = { ...act, status: status };
            return updatedActivity;
        }
        return act;
    }));
    return updatedActivity;
  }
  
  const updateODStatus = (applicationId: string, status: 'approved' | 'rejected') => {
    let updatedOD: ODApplication | undefined;
    setODApplications(prev => prev.map(app => {
        if(app.id === applicationId) {
            updatedOD = { ...app, status: status };
            return updatedOD;
        }
        return app;
    }));
    return updatedOD;
  }

  const contextValue = useMemo(() => ({ 
      user, 
      setUser, 
      isLoading, 
      notifications: currentUserNotifications, 
      addNotification,
      markAsRead,
      markAllAsRead,
      activities,
      updateActivityStatus,
      odApplications,
      updateODStatus,
    }), [user, isLoading, notifications, activities, odApplications]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
      </div>
    );
  }
  
  if (!isLoading && !user && pathname !== '/') {
      return null;
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
