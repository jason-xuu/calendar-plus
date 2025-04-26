import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface CalendarLayoutProps {
  children: React.ReactNode;
  onOpenCreateEvent: (date?: Date) => void;
}

const CalendarLayout: React.FC<CalendarLayoutProps> = ({ children, onOpenCreateEvent }) => {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Pass to Header */}
      <Header onOpenCreateEvent={onOpenCreateEvent} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar onOpenCreateEvent={onOpenCreateEvent} />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CalendarLayout;
