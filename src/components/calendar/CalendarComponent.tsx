import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { ViewState, CalendarViewType } from "@/types/calendar";
import CalendarToolbar from "./CalendarToolbar";

interface CalendarComponentProps {
  events?: any[];
  onOpenCreateEvent: (date?: Date) => void;
  setSelectedEvent: (event: any) => void;
  setIsEventModalOpen: (open: boolean) => void;
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  events = [],
  onOpenCreateEvent,
  setSelectedEvent,
  setIsEventModalOpen,
}) => {
  const calendarRef = useRef<FullCalendar>(null);

  const [viewState, setViewState] = useState<ViewState>({
    currentView: "dayGridMonth",
    currentDate: new Date(),
  });

  const handleViewChange = (view: CalendarViewType) => {
    setViewState((prev) => ({
      ...prev,
      currentView: view,
    }));

    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
    }
  };

  const handleNavigate = (date: Date) => {
    setViewState((prev) => ({
      ...prev,
      currentDate: date,
    }));

    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(date);
    }
  };

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

  return (
    <div className="h-full flex flex-col">
      <CalendarToolbar
        viewState={viewState}
        onViewChange={handleViewChange}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 overflow-auto">
        <FullCalendar
          ref={calendarRef}
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
            hour: "2-digit",
            minute: "2-digit",
            meridiem: "short",
          }}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
