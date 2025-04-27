import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any | null;
  date: Date | null;
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event, date, setEvents }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    start: '',
    end: '',
    allDay: false,
    description: '',
    location: '',
    calendar: 'Personal',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        id: event.id || '',
        title: event.title || '',
        start: event.start ? format(new Date(event.start), "yyyy-MM-dd'T'HH:mm") : '',
        end: event.end ? format(new Date(event.end), "yyyy-MM-dd'T'HH:mm") : '',
        allDay: event.allDay || false,
        description: event.description || '',
        location: event.location || '',
        calendar: event.calendar || 'Personal',
      });
    } else if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(endDate.getHours() + 1);

      setFormData({
        id: '',
        title: '',
        start: format(startDate, "yyyy-MM-dd'T'HH:mm"),
        end: format(endDate, "yyyy-MM-dd'T'HH:mm"),
        allDay: false,
        description: '',
        location: '',
        calendar: 'Personal',
      });
    } else {
      setFormData({
        id: '',
        title: '',
        start: '',
        end: '',
        allDay: false,
        description: '',
        location: '',
        calendar: 'Personal',
      });
    }
  }, [event, date]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, allDay: checked }));
  };

  const calendarOptions = [
    { id: 'personal', name: 'Personal', color: '#9b87f5' },
    { id: 'work', name: 'Work', color: '#0EA5E9' },
    { id: 'family', name: 'Family', color: '#D946EF' },
  ];

  const getCalendarId = (calendarName: string) => {
    const match = calendarOptions.find(opt => opt.name === calendarName);
    return match ? match.id : 'personal';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newEvent = {
        title: formData.title,
        start: new Date(formData.start).toISOString(),
        end: new Date(formData.end).toISOString(),
        allDay: formData.allDay,
        description: formData.description,
        location: formData.location,
        calendar: formData.calendar,
        calendarId: formData.calendar.toLowerCase(), // ✅ add calendarId properly!
      };

      const { data, error } = await supabase.from('events').insert(newEvent).select();

      if (error) throw error;

      setEvents(prev => [...prev, data[0]]);
      onClose();
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!formData.id) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.from('events').delete().eq('id', formData.id);
      if (error) throw error;

      setEvents(prev => prev.filter(e => e.id !== formData.id));
      onClose();
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{formData.id ? 'Edit Event' : 'Create Event'}</DialogTitle>
          <DialogDescription>
            Fill out the event details and click Create.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Add title"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="allDay"
              checked={formData.allDay}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="allDay">All day</Label>
          </div>

          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="start">Start</Label>
              <Input
                type="datetime-local"
                id="start"
                name="start"
                value={formData.start}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2 flex-1">
              <Label htmlFor="end">End</Label>
              <Input
                type="datetime-local"
                id="end"
                name="end"
                value={formData.end}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Add location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calendar">Calendar</Label>
            <select
              id="calendar"
              name="calendar"
              value={formData.calendar}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {calendarOptions.map(option => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add description"
              rows={3}
            />
          </div>

          <DialogFooter className="pt-4 flex justify-between">
            {formData.id && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                Delete
              </Button>
            )}
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !formData.title.trim()}>
                {isLoading ? 'Saving...' : formData.id ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
