'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  LayoutDashboard,
  Calendar,
  LifeBuoy,
  BookUser,
  History,
  ClipboardList,
  BotMessageSquare,
  FileText,
  User,
  Building,
  Users,
  ShieldCheck,
  CheckSquare,
  Clock,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-app-context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  subLinks?: NavLink[];
};

type NavLinksConfig = {
  student: NavLink[];
  faculty: NavLink[];
  admin: NavLink[];
};

const navLinks: NavLinksConfig = {
  student: [
    { href: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/add-activity', label: 'Add Activity', icon: History },
    { href: '/student/timetable', label: 'Timetable', icon: Clock },
    {
      href: '#', label: 'Guidance', icon: BookUser,
      subLinks: [
        { href: '/student/career-guidance', label: 'Career AI', icon: BotMessageSquare },
        { href: '/student/resume', label: 'AI Resume', icon: FileText },
      ]
    },
    { href: '/student/od-management', label: 'OD Management', icon: ClipboardList },
  ],
  faculty: [
    { href: '/faculty', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/faculty/od-approvals', label: 'OD Approvals', icon: CheckSquare },
    { href: '/faculty/timetable', label: 'Timetable', icon: Clock },
  ],
  admin: [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/manage-students', label: 'Students', icon: Users },
    { href: '/admin/manage-faculty', label: 'Faculty', icon: Building },
  ],
};

const commonLinks: NavLink[] = [
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/support', label: 'Support', icon: LifeBuoy },
];

interface MainSidebarProps {
  isMobile?: boolean;
}

export default function MainSidebar({ isMobile = false }: MainSidebarProps) {
  const { user } = useUser();
  const pathname = usePathname();

  if (!user) return null;

  const userNavLinks = navLinks[user.role] || [];
  const allLinks = [...userNavLinks, ...commonLinks];

  const renderLink = (link: NavLink, isSubLink = false) => {
    const isActive = !isSubLink && (pathname === link.href || (link.href !== `/${user.role}` && pathname.startsWith(link.href) && link.href !== '/'));
    const isParentActive = link.subLinks && link.subLinks.some(sub => pathname.startsWith(sub.href));
    
    const linkContent = (
      <>
        <link.icon className="h-5 w-5" />
        <span className="truncate">{link.label}</span>
      </>
    );

    const linkClasses = cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
      (isActive || isParentActive) && 'text-primary bg-muted',
      isSubLink && 'ml-4'
    );
    
    return (
      <Link href={link.href} className={linkClasses}>
        {linkContent}
      </Link>
    );
  };
  
  const renderAccordionLink = (link: NavLink) => (
     <AccordionItem value={link.label} className="border-b-0">
      <AccordionTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg]:rotate-90">
        <link.icon className="h-5 w-5" />
        <span className="truncate">{link.label}</span>
      </AccordionTrigger>
      <AccordionContent className="pl-8 pb-0 pt-1">
        <nav className="grid gap-1">
          {link.subLinks?.map((subLink) => (
             <Link key={subLink.href} href={subLink.href} className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              pathname.startsWith(subLink.href) && 'text-primary bg-muted/50'
            )}>
              <subLink.icon className="h-4 w-4" />
              {subLink.label}
            </Link>
          ))}
        </nav>
      </AccordionContent>
    </AccordionItem>
  )


  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-headline font-semibold">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>Smart Student Hub</span>
        </Link>
      </div>
      <div className="flex-1">
        <TooltipProvider>
          <Accordion type="multiple" className="w-full">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {allLinks.map((link) =>
                link.subLinks ? (
                  <div key={link.label}>
                    {renderAccordionLink(link)}
                  </div>
                ) : (
                  <div key={link.href}>
                    {renderLink(link)}
                  </div>
                )
              )}
            </nav>
          </Accordion>
        </TooltipProvider>
      </div>
    </div>
  );
}
