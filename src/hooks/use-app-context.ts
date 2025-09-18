'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';

export function useUser() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useUser must be used within an AppProvider');
  }
  return context;
}
