'use client';

import { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import type { AppUser, Notification } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';
import { MOCK_NOTIFICATIONS } from '@/lib/data';

interface AppContextType {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
  isLoading: boolean;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let userIsSet = false;
    try {
      const storedUser = localStorage.getItem('smart-student-hub-user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserState(parsedUser);
        setNotifications(MOCK_NOTIFICATIONS); // Load initial notifications for demo
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

  const setUser = (user: AppUser | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('smart-student-hub-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smart-student-hub-user');
      setNotifications([]);
      router.replace('/');
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  const markAsRead = (id: string) => {
     setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }
  
  const markAllAsRead = () => {
     setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }


  const contextValue = useMemo(() => ({ 
      user, 
      setUser, 
      isLoading, 
      notifications, 
      addNotification,
      markAsRead,
      markAllAsRead 
    }), [user, isLoading, notifications]);

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
