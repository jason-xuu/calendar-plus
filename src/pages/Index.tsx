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

        if (showHolidays) {
          const year = new Date().getFullYear();
          const holidayEvents = generateUSHolidays(year).map((holiday) => ({
            title: holiday.title,
            start: holiday.date, // start, not date
            color: "#60A5FA",
            textColor: "white",
          }));

          combinedEvents = [...combinedEvents, ...holidayEvents];
        }

        setEvents(combinedEvents);
      }
    };

    fetchEvents();
  }, [showHolidays]);

  return (
    <CalendarLayout 
      onOpenCreateEvent={openCreateEventModal}
      onViewChange={() => {}} 
      showHolidays={showHolidays}
      setShowHolidays={setShowHolidays}
      events={events}
      onSelectEvent={handleSelectEvent}
    >
      <CalendarComponent
        ref={calendarComponentRef} // <-- NEW: give CalendarComponent a ref
        events={events}
        setEvents={setEvents}
        onOpenCreateEvent={openCreateEventModal}
        setSelectedEvent={setSelectedEvent}
        setIsEventModalOpen={setIsEventModalOpen}
        calendarRef={calendarRef}
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
