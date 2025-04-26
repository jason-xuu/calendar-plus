import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface CalendarLayoutProps {
  children: React.ReactNode;
  onOpenCreateEvent: (date?: Date) => void;
  onViewChange: (view: string) => void;
}

const CalendarLayout: React.FC<CalendarLayoutProps> = ({ children, onOpenCreateEvent, onViewChange }) => {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Pass to Header */}
      <Header onOpenCreateEvent={onOpenCreateEvent} />

      <div className="flex flex-1 overflow-hidden">
      <Sidebar 
        onOpenCreateEvent={onOpenCreateEvent} 
        onViewChange={onViewChange}            
      />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CalendarLayout;
