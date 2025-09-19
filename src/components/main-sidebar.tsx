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
  Percent,
  Briefcase
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-app-context';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  subLinks?: NavLink[];
  isDynamic?: boolean;
};

type NavLinksConfig = {
  student: NavLink[];
  faculty: NavLink[];
  admin: NavLink[];
};

const navLinks: NavLinksConfig = {
  student: [
    { href: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/timetable', label: 'Timetable', icon: Clock },
    { href: '/students/[id]', label: 'Portfolio', icon: Briefcase, isDynamic: true },
    {
      href: '#', label: 'Guidance', icon: BookUser,
      subLinks: [
        { href: '/student/career-guidance', label: 'Career AI', icon: BotMessageSquare },
        { href: '/student/resume', label: 'AI Resume', icon: FileText },
        { href: '/student/attendance-buddy', label: 'Attendance Buddy', icon: Percent },
      ]
    },
    { href: '/student/od-management', label: 'OD Management', icon: ClipboardList },
  ],
  faculty: [
    { href: '/faculty', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/faculty/manage-students', label: 'Manage Students', icon: Users },
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

  const getLinksForRole = () => {
    return navLinks[user.role] || [];
  };

  const allLinks = [...getLinksForRole(), ...commonLinks];


  const renderLink = (link: NavLink, isSubLink = false) => {
    const href = link.isDynamic ? link.href.replace('[id]', user.id) : link.href;
    const isActive = !link.subLinks && (pathname === href || (href !== '/' && pathname.startsWith(href) && link.isDynamic));

    const linkContent = (
      <>
        <link.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-gray-400 group-hover:text-primary")} />
        <span className="truncate">{link.label}</span>
      </>
    );

    const linkClasses = cn(
      'group flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 font-medium transition-all hover:bg-gray-800',
      isActive && 'bg-gray-800 text-primary',
      isSubLink && 'ml-4'
    );
    
    return (
      <Link href={href} className={linkClasses}>
        {linkContent}
      </Link>
    );
  };
  
  const renderAccordionLink = (link: NavLink) => (
     <AccordionItem value={link.label} className="border-b-0">
      <AccordionTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 font-medium transition-all hover:bg-gray-800 hover:no-underline [&[data-state=open]>svg]:rotate-90">
         <link.icon className="h-5 w-5 text-gray-400" />
        <span className="truncate">{link.label}</span>
      </AccordionTrigger>
      <AccordionContent className="pl-4 pb-0 pt-1">
        <nav className="grid gap-1">
          {link.subLinks?.map((subLink) => (
             <Link key={subLink.href} href={subLink.href} className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-primary',
              pathname.startsWith(subLink.href) && 'text-primary bg-gray-800'
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
    <div className="flex h-full max-h-screen flex-col">
       <div className="flex h-16 items-center border-b border-gray-800 px-4 lg:px-6 shrink-0">
        <Link href="/" className="flex items-center gap-2 font-headline font-semibold text-white">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>Smart Student Hub</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
          <Accordion type="multiple" className="w-full" defaultValue={['Guidance']}>
            <nav className="grid items-start p-2 text-sm font-medium lg:p-4">
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
      </div>
    </div>
  );
}
