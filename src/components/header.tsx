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
  Briefcase
} from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useUser } from '@/hooks/use-app-context';
import Image from 'next/image';
import MainSidebar from './main-sidebar';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'


const NavLink = ({ href, children, label }: { href: string, children: React.ReactNode, label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className={cn(
            "flex items-center justify-center h-10 w-10 rounded-lg text-muted-foreground transition-colors hover:text-foreground",
            isActive && "bg-muted text-foreground"
          )}>
            {children}
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function Header() {
  const { user, setUser } = useUser();
  const pathname = usePathname();

  const handleLogout = () => {
    setUser(null);
  };
  
  const breadcrumbSegments = pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs p-0">
          <MainSidebar isMobile={true}/>
        </SheetContent>
      </Sheet>
      
      {/* Central Navigation for Student */}
      {user?.role === 'student' && (
        <nav className="hidden md:flex md:items-center md:gap-4 md:mx-auto">
          <NavLink href="/student" label="Dashboard"><LayoutDashboard/></NavLink>
          <NavLink href="/student/timetable" label="Timetable"><Calendar /></NavLink>
          <NavLink href={`/students/${user.id}`} label="Portfolio"><Briefcase /></NavLink>
        </nav>
      )}

      <div className="relative ml-auto flex items-center gap-2">
        <Button asChild className="hidden sm:flex bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
            <Link href="/student/add-activity">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Activity
            </Link>
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full h-10 w-10">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>

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
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
