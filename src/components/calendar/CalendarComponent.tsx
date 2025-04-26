import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { ViewState, CalendarViewType } from '@/types/calendar';
import CalendarToolbar from './CalendarToolbar';

interface CalendarComponentProps {
  events: any[];
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  onOpenCreateEvent: (date?: Date) => void;
  setSelectedEvent: (event: any) => void;
  setIsEventModalOpen: (open: boolean) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  events,
  setEvents,
  onOpenCreateEvent,
  setSelectedEvent,
  setIsEventModalOpen
}) => {
  const [viewState, setViewState] = useState<ViewState>({
    currentView: 'dayGridMonth',
    currentDate: new Date(),
  });

  const handleDateClick = (arg: any) => {
    onOpenCreateEvent(arg.date);
  };

  const handleEventClick = (arg: any) => {
    setSelectedEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      allDay: arg.event.allDay,
      backgroundColor: arg.event.backgroundColor,
      calendar: arg.event.extendedProps.calendar,
    });
    setIsEventModalOpen(true);
  };

  const handleViewChange = (view: CalendarViewType) => {
    setViewState({
      ...viewState,
      currentView: view,
    });
  };

  const handleNavigate = (date: Date) => {
    setViewState({
      ...viewState,
      currentDate: date,
    });
  };

  return (
    <div className="h-full flex flex-col">
      <CalendarToolbar 
        viewState={viewState}
        onViewChange={handleViewChange}
        onNavigate={handleNavigate}
      />
      
      <div className="flex-1 overflow-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={false}
          initialView={viewState.currentView}
          initialDate={viewState.currentDate}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="100%"
          nowIndicator={true}
          stickyHeaderDates={true}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: 'short',
          }}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
