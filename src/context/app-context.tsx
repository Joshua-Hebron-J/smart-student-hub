'use client';

import { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import type { AppUser } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';

interface AppContextType {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
  isLoading: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('smart-student-hub-user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserState(parsedUser);
        // If user is on login page, redirect them to their dashboard
        if (pathname === '/') {
          router.replace(`/${parsedUser.role}`);
        }
      } else {
        // If no user and not on login page, redirect to login
        if (pathname !== '/') {
          router.replace('/');
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('smart-student-hub-user');
      if (pathname !== '/') {
        router.replace('/');
      }
    } finally {
      setIsLoading(false);
    }
  }, []); // Run only once on mount

  const setUser = (user: AppUser | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('smart-student-hub-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smart-student-hub-user');
      router.replace('/');
    }
  };

  const contextValue = useMemo(() => ({ user, setUser, isLoading }), [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
      </div>
    );
  }
  
  // If no user and not on login page, don't render children to prevent flashes of authenticated content
  if (!user && pathname !== '/') {
    return null;
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
