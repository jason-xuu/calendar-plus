import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface CalendarLayoutProps {
  children: React.ReactNode;
  onOpenCreateEvent: (date?: Date) => void;
  onViewChange: (view: string) => void;
  showHolidays: boolean;
  setShowHolidays: (value: boolean) => void;
  events: any[]; 
  onSelectEvent: (event: any) => void;
  visibleCalendars: { [id: string]: boolean };  // ✅ ADD THIS
  setVisibleCalendars: React.Dispatch<React.SetStateAction<{ [id: string]: boolean }>>;  // ✅ ADD THIS
}

const CalendarLayout: React.FC<CalendarLayoutProps> = ({
  children,
  onOpenCreateEvent,
  onViewChange,
  showHolidays,
  setShowHolidays,
  events,
  onSelectEvent,
  visibleCalendars,       // ✅ DESTRUCTURE IT
  setVisibleCalendars,    // ✅ DESTRUCTURE IT
}) => {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <Header 
        onOpenCreateEvent={onOpenCreateEvent}
        events={events}
        onSelectEvent={onSelectEvent}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onOpenCreateEvent={onOpenCreateEvent}
          onViewChange={onViewChange}
          showHolidays={showHolidays}
          setShowHolidays={setShowHolidays}
          visibleCalendars={visibleCalendars}           
          setVisibleCalendars={setVisibleCalendars}     
        />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CalendarLayout;
