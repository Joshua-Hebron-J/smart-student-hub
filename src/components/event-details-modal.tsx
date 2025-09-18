'use client';

import { format, parseISO } from 'date-fns';
import { Calendar, Tag, Info, University, Users, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AcademicEventV2 } from '@/lib/types';
import { EVENT_CATEGORIES } from '@/lib/calendar-data';
import { cn } from '@/lib/utils';

interface EventDetailsModalProps {
  event: AcademicEventV2 | null;
  isOpen: boolean;
  onClose: () => void;
}

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <Icon className="h-5 w-5 text-muted-foreground mt-1" />
    <div>
      <p className="font-semibold">{label}</p>
      <div className="text-muted-foreground text-sm">{value}</div>
    </div>
  </div>
);

export default function EventDetailsModal({ event, isOpen, onClose }: EventDetailsModalProps) {
  if (!event) return null;

  const { title, description, startDate, endDate, category, scope } = event;
  const categoryInfo = EVENT_CATEGORIES[category];

  const formattedStartDate = format(parseISO(startDate), 'eee, MMM d, yyyy, h:mm a');
  const formattedEndDate = format(parseISO(endDate), 'eee, MMM d, yyyy, h:mm a');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryInfo.color }}/>
            {title}
          </DialogTitle>
          <DialogDescription>{categoryInfo.label}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <InfoRow icon={Info} label="Description" value={description} />
          <InfoRow 
            icon={Calendar} 
            label="Schedule" 
            value={`${formattedStartDate} to ${formattedEndDate}`} 
          />
          <InfoRow 
            icon={Tag}
            label="Category" 
            value={
                <Badge style={{ backgroundColor: categoryInfo.color }} className="text-white">
                    {categoryInfo.label}
                </Badge>
            }
          />
          <InfoRow
            icon={scope === 'University' ? University : scope === 'Department' ? Users : User}
            label="Scope"
            value={scope}
          />
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
