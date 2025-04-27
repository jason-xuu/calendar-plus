import React, { useEffect, useRef, useState } from 'react';
import CalendarLayout from '@/components/layout/CalendarLayout';
import CalendarComponent from '@/components/calendar/CalendarComponent';
import EventModal from '@/components/calendar/EventModal';
import { supabase } from '@/lib/supabase';
import { generateUSHolidays } from '@/utils/generateUSHolidays';
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar for types

const Index = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [visibleCalendars, setVisibleCalendars] = useState<{ [id: string]: boolean }>({});
  
  const [showHolidays, setShowHolidaysState] = useState(() => {
    const stored = localStorage.getItem("showHolidays");
    return stored ? JSON.parse(stored) : true;
  });

  const setShowHolidays = (value: boolean) => {
    setShowHolidaysState(value);
    localStorage.setItem("showHolidays", JSON.stringify(value));
  };

  const openCreateEventModal = (date?: Date) => {
    setSelectedEvent(null);
    setClickedDate(date || new Date());
    setIsEventModalOpen(true);
  };

  const calendarRef = useRef<FullCalendar>(null); // Reference to FullCalendar
  const calendarComponentRef = useRef<any>(null); // Reference to CalendarComponent

  const handleSelectEvent = (event: any) => {
    if (calendarComponentRef.current) {
      calendarComponentRef.current.moveToDate(event.start); // now it updates everything
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        console.error('Fetch error:', error);
      } else {
        let combinedEvents = [...(data || [])];

        combinedEvents = combinedEvents.map(ev => ({
          ...ev,
          calendarId: ev.calendarId || ev.calendar?.toLowerCase() || 'personal', // force calendarId
        }));

        if (showHolidays) {
          const year = new Date().getFullYear();
          const holidayEvents = generateUSHolidays(year).map((holiday) => ({
            title: holiday.title,
            start: holiday.date,
            color: "#60A5FA",
            textColor: "white",
          }));

          combinedEvents = [...combinedEvents, ...holidayEvents];
        }

        setEvents(combinedEvents);
      }
    };

    fetchEvents();

    // ⬇️ NEW: Load visibleCalendars from localStorage
    const savedMyCalendars = JSON.parse(localStorage.getItem('myCalendars') || '[]');
    const savedOtherCalendars = JSON.parse(localStorage.getItem('otherCalendars') || '[]');
    const allCalendars = [...savedMyCalendars, ...savedOtherCalendars];

    const visibilityMap: { [id: string]: boolean } = {};
    for (const cal of allCalendars) {
      visibilityMap[cal.id] = cal.visible;
    }
    setVisibleCalendars(visibilityMap);
  }, [showHolidays]);

  return (
    <CalendarLayout 
      onOpenCreateEvent={openCreateEventModal}
      onViewChange={() => {}} 
      showHolidays={showHolidays}
      setShowHolidays={setShowHolidays}
      events={events}
      onSelectEvent={handleSelectEvent}
      visibleCalendars={visibleCalendars}          
      setVisibleCalendars={setVisibleCalendars}    
    >
      <CalendarComponent
        ref={calendarComponentRef}
        events={events}
        setEvents={setEvents}
        onOpenCreateEvent={openCreateEventModal}
        setSelectedEvent={setSelectedEvent}
        setIsEventModalOpen={setIsEventModalOpen}
        calendarRef={calendarRef}
        visibleCalendars={visibleCalendars}
      />
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        event={selectedEvent}
        date={clickedDate}
        setEvents={setEvents}
      />
    </CalendarLayout>
  );
};

export default Index;
