
'use client';

import Link from 'next/link';
import {
  Bell,
  PanelLeft,
  User as UserIcon,
  LogOut,
  PlusCircle,
  LayoutDashboard,
  Calendar,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Megaphone,
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';


import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useUser } from '@/hooks/use-app-context';
import Image from 'next/image';
import MainSidebar from './main-sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { MOCK_NOTIFICATIONS } from '@/lib/notifications-data';
import type { Notification } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { usePathname } from 'next/navigation';


export type View = 'dashboard' | 'timetable' | 'portfolio';

interface HeaderProps {
}


const NavLink = ({ href, children, label }: { href: string, children: React.ReactNode, label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            href={href}
            className={`flex flex-col items-center justify-center h-16 w-20 text-gray-400 transition-colors hover:text-white ${isActive ? "text-primary border-b-2 border-primary" : ""}`}
          >
            {children}
            <span className="text-xs mt-1">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'approval':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'deadline':
      return <AlertCircle className="h-5 w-5 text-orange-500" />;
    case 'announcement':
      return <Megaphone className="h-5 w-5 text-blue-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-400" />;
  }
};

export default function Header({}: HeaderProps) {
  const { user, setUser } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const handleLogout = () => {
    setUser(null);
  };
  
  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({...n, read: true})));
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-900/50 px-4 backdrop-blur-sm sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="md:hidden bg-transparent border-gray-700 hover:bg-gray-800">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs p-0 bg-gray-900 border-r-gray-800">
          <MainSidebar isMobile={true}/>
        </SheetContent>
      </Sheet>
      
      {user?.role === 'student' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gray-900/80 backdrop-blur-sm border-t border-gray-800">
          <nav className="flex items-center justify-around">
            <NavLink href="/student" label="Dashboard"><LayoutDashboard size={20}/></NavLink>
            <NavLink href="/student/timetable" label="Timetable"><Calendar size={20} /></NavLink>
            <NavLink href={`/students/${user.id}`} label="Portfolio"><Briefcase size={20} /></NavLink>
          </nav>
        </div>
      )}

      <div className="relative ml-auto flex items-center gap-2">
        {user?.role === 'student' && (
            <Button asChild className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/student/add-activity">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Activity
                </Link>
            </Button>
        )}
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon" className="relative rounded-full h-10 w-10 hover:bg-gray-800">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 items-center justify-center bg-primary text-xs text-primary-foreground">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        </span>
                    )}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 md:w-96 p-0 border-gray-700 bg-gray-900/80 backdrop-blur-md">
                <Card className="border-0 bg-transparent shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-700">
                        <CardTitle className="text-lg text-white">Notifications</CardTitle>
                        {unreadCount > 0 && (
                            <Button variant="link" size="sm" onClick={handleMarkAllAsRead}>Mark all as read</Button>
                        )}
                    </CardHeader>
                    <CardContent className="p-0 max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map(notif => (
                                <div 
                                    key={notif.id} 
                                    className={cn("flex items-start gap-3 p-4 border-b border-gray-800 cursor-pointer", !notif.read && "bg-primary/10")}
                                    onClick={() => handleMarkAsRead(notif.id)}
                                >
                                    <NotificationIcon type={notif.type} />
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">{notif.title}</p>
                                        <p className="text-sm text-gray-400">{notif.description}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
                                        </p>
                                    </div>
                                    {!notif.read && (
                                        <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                                    )}
                                </div>
                            ))
                        ) : (
                             <p className="text-center text-gray-400 p-8">No new notifications.</p>
                        )}
                    </CardContent>
                    <CardFooter className="p-2 border-t border-gray-700">
                        <Button variant="ghost" className="w-full text-white hover:bg-gray-800">View all notifications</Button>
                    </CardFooter>
                </Card>
            </DropdownMenuContent>
        </DropdownMenu>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="overflow-hidden rounded-full h-10 w-10">
              <Image
                src={user?.avatarUrl || "https://picsum.photos/seed/placeholder/40/40"}
                width={40}
                height={40}
                alt={user?.name || 'User Avatar'}
                data-ai-hint="user avatar"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-gray-700 bg-gray-900 text-white">
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-gray-400">{user?.email}</p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700"/>
            <DropdownMenuItem className="focus:bg-gray-800 focus:text-white">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700"/>
            <DropdownMenuItem onClick={handleLogout} className="focus:bg-red-900/50 focus:text-white">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
