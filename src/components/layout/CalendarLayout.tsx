import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface CalendarLayoutProps {
  children: React.ReactNode;
  onOpenCreateEvent: (date?: Date) => void;
  onViewChange: (view: string) => void;
  showHolidays: boolean;
  setShowHolidays: (value: boolean) => void;
  events: any[]; // NEW: pass events
  onSelectEvent: (event: any) => void; // NEW: pass event handler
}

const CalendarLayout: React.FC<CalendarLayoutProps> = ({
  children,
  onOpenCreateEvent,
  onViewChange,
  showHolidays,
  setShowHolidays,
  events,
  onSelectEvent,
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
        />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CalendarLayout;
