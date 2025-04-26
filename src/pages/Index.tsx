import React, { useEffect, useState } from 'react';
import CalendarLayout from '@/components/layout/CalendarLayout';
import CalendarComponent from '@/components/calendar/CalendarComponent';
import EventModal from '@/components/calendar/EventModal';
import { supabase } from '@/lib/supabase';

const Index = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  const openCreateEventModal = (date?: Date) => {
    setSelectedEvent(null);
    setClickedDate(date || new Date());
    setIsEventModalOpen(true);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        console.error('Fetch error:', error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <CalendarLayout onOpenCreateEvent={openCreateEventModal}>
      <CalendarComponent
        events={events}
        setEvents={setEvents}
        onOpenCreateEvent={openCreateEventModal}
        setSelectedEvent={setSelectedEvent}
        setIsEventModalOpen={setIsEventModalOpen}
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
