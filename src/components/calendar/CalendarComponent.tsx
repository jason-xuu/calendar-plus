import React, { useImperativeHandle, useRef } from "react";
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
  calendarRef: React.RefObject<FullCalendar>;
  visibleCalendars: { [id: string]: boolean };
}

const CalendarComponent = React.forwardRef<any, CalendarComponentProps>(({
  events = [],
  onOpenCreateEvent,
  setSelectedEvent,
  setIsEventModalOpen,
  setEvents,
  calendarRef,
  visibleCalendars,
}, ref) => {
  const [viewState, setViewState] = React.useState<ViewState>({
    currentView: "dayGridMonth",
    currentDate: new Date(),
  });

  // Expose moveToDate to parent
  useImperativeHandle(ref, () => ({
    moveToDate(date: Date) {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.gotoDate(date);
      }
      setViewState((prev) => ({
        ...prev,
        currentDate: date,
      }));
      highlightEventAtDate(date);
    }
  }));

  const highlightEventAtDate = (date: Date) => {
    const eventElements = document.querySelectorAll(`.fc-event`);
    eventElements.forEach((el) => {
      const eventDate = el.getAttribute('data-date');
      if (eventDate && new Date(eventDate).toDateString() === new Date(date).toDateString()) {
        el.classList.add("animate-pulse", "ring-2", "ring-indigo-400");
        setTimeout(() => {
          el.classList.remove("animate-pulse", "ring-2", "ring-indigo-400");
        }, 2000);
      }
    });
  };

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

  console.log('Visible Calendars:', visibleCalendars);
  console.log('Events passed to calendar:', events);

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
          events={events.filter(event => {
            const id = event.calendarId || event.calendar?.toLowerCase();
            if (!id) return true; // holidays and others
            return visibleCalendars[id] !== false;
          })}
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
});

CalendarComponent.displayName = "CalendarComponent";
export default CalendarComponent;
