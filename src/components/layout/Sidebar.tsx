import React, { useState } from 'react';
import { Calendar, ListCheck, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';

interface CalendarItem {
  id: string;
  name: string;
  color: string;
  visible: boolean;
}

interface SidebarProps {
  onOpenCreateEvent: () => void;
  onViewChange: (view: string) => void; // <-- ✅ ADD THIS
}

const Sidebar: React.FC<SidebarProps> = ({ onOpenCreateEvent, onViewChange }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);
  const [myCalendars, setMyCalendars] = useState<CalendarItem[]>([
    { id: '1', name: 'Personal', color: '#9b87f5', visible: true },
    { id: '2', name: 'Work', color: '#0EA5E9', visible: true },
    { id: '3', name: 'Family', color: '#D946EF', visible: true },
  ]);
  
  const [otherCalendars, setOtherCalendars] = useState<CalendarItem[]>([
    { id: '4', name: 'US Holidays', color: '#F2FCE2', visible: true },
  ]);

  const toggleCalendarVisibility = (id: string, list: 'my' | 'other') => {
    if (list === 'my') {
      setMyCalendars(myCalendars.map(cal => 
        cal.id === id ? { ...cal, visible: !cal.visible } : cal
      ));
    } else {
      setOtherCalendars(otherCalendars.map(cal => 
        cal.id === id ? { ...cal, visible: !cal.visible } : cal
      ));
    }
  };
  
  // Return null if on mobile - sidebar will be shown as a drawer
  if (isMobile && !isOpen) return null;
  
  return (
    <aside className={`w-64 border-r border-border bg-background p-4 flex flex-col ${isMobile ? 'absolute inset-y-0 left-0 z-50' : ''}`}>
      {isMobile && (
        <Button variant="ghost" size="sm" className="self-end" onClick={() => setIsOpen(false)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-lg">Calendar</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewChange('listWeek')} // <-- ✅ MAKE AGENDA WORK
        >
          <ListCheck className="h-4 w-4 mr-1" />
          <span>Agenda</span>
        </Button>
      </div>
      
      <Button 
        variant="default" 
        className="mb-6 gap-1"
        onClick={() => onOpenCreateEvent()}
      >
        <Plus className="h-4 w-4" />
        <span>Create Event</span>
      </Button>
      
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <ChevronDown className="h-4 w-4 mr-1" />
                <h3 className="font-medium text-sm">MY CALENDARS</h3>
              </div>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-1 ml-6">
              {myCalendars.map(calendar => (
                <div key={calendar.id} className="flex items-center gap-2">
                  <Checkbox 
                    checked={calendar.visible}
                    onCheckedChange={() => toggleCalendarVisibility(calendar.id, 'my')}
                    style={{ backgroundColor: calendar.visible ? calendar.color : undefined }}
                  />
                  <span className="text-sm">{calendar.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <ChevronDown className="h-4 w-4 mr-1" />
                <h3 className="font-medium text-sm">OTHER CALENDARS</h3>
              </div>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-1 ml-6">
              {otherCalendars.map(calendar => (
                <div key={calendar.id} className="flex items-center gap-2">
                  <Checkbox 
                    checked={calendar.visible}
                    onCheckedChange={() => toggleCalendarVisibility(calendar.id, 'other')}
                    style={{ backgroundColor: calendar.visible ? calendar.color : undefined }}
                  />
                  <span className="text-sm">{calendar.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default Sidebar;
