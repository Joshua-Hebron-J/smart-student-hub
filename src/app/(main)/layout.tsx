'use client';

import { useState } from 'react';
import Header from '@/components/header';
import MainSidebar from '@/components/main-sidebar';
import { cn } from '@/lib/utils';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div
      className={cn(
        "grid min-h-screen w-full transition-[grid-template-columns] duration-300 ease-in-out",
        isSidebarCollapsed 
          ? "md:grid-cols-[80px_1fr]" 
          : "md:grid-cols-[280px_1fr]"
      )}
    >
      <div className="hidden border-r bg-gray-900/50 md:block">
        <MainSidebar isCollapsed={isSidebarCollapsed} />
      </div>
      <div className="flex flex-col">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
