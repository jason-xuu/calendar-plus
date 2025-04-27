import React, { useState, useEffect } from 'react';
import { Calendar, ListCheck, ChevronDown, ChevronRight, Plus, Minus, X, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';

interface CalendarItem {
  id: string;
  name: string;
  color: string;
  visible: boolean;
}

interface SidebarProps {
  onOpenCreateEvent: (date?: Date) => void;
  onViewChange: (view: string) => void;
  showHolidays: boolean;
  setShowHolidays: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOpenCreateEvent, onViewChange, showHolidays, setShowHolidays }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);

  const [myCalendars, setMyCalendars] = useState<CalendarItem[]>([]);
  const [otherCalendars, setOtherCalendars] = useState<CalendarItem[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCalendarName, setNewCalendarName] = useState('');
  const [newCalendarList, setNewCalendarList] = useState<'my' | 'other'>('my');

  const [deleteMode, setDeleteMode] = useState<'none' | 'my' | 'other'>('none');
  const [editingCalendarId, setEditingCalendarId] = useState<string | null>(null);
  const [editingCalendarName, setEditingCalendarName] = useState('');

  useEffect(() => {
    const savedMyCalendars = localStorage.getItem('myCalendars');
    const savedOtherCalendars = localStorage.getItem('otherCalendars');

    if (savedMyCalendars) {
      setMyCalendars(JSON.parse(savedMyCalendars));
    } else {
      setMyCalendars([
        { id: '1', name: 'Personal', color: '#9b87f5', visible: true },
        { id: '2', name: 'Work', color: '#0EA5E9', visible: true },
        { id: '3', name: 'Family', color: '#D946EF', visible: true },
      ]);
    }

    if (savedOtherCalendars) {
      setOtherCalendars(JSON.parse(savedOtherCalendars));
    }
  }, []);

  const saveCalendarsToStorage = (type: 'my' | 'other', calendars: CalendarItem[]) => {
    if (type === 'my') {
      localStorage.setItem('myCalendars', JSON.stringify(calendars));
    } else {
      localStorage.setItem('otherCalendars', JSON.stringify(calendars));
    }
  };

  const toggleCalendarVisibility = (id: string, list: 'my' | 'other') => {
    if (list === 'my') {
      const updated = myCalendars.map(cal => cal.id === id ? { ...cal, visible: !cal.visible } : cal);
      setMyCalendars(updated);
      saveCalendarsToStorage('my', updated);
    } else {
      const updated = otherCalendars.map(cal => cal.id === id ? { ...cal, visible: !cal.visible } : cal);
      setOtherCalendars(updated);
      saveCalendarsToStorage('other', updated);
    }
  };

  const handleAddCalendarClick = (list: 'my' | 'other') => {
    setNewCalendarList(list);
    setNewCalendarName('');
    setShowAddModal(true);
  };

  const handleAddCalendarSubmit = () => {
    if (!newCalendarName.trim()) return;

    const newCalendar: CalendarItem = {
      id: Date.now().toString(),
      name: newCalendarName,
      color: randomColor(),
      visible: true,
    };

    if (newCalendarList === 'my') {
      const updated = [...myCalendars, newCalendar];
      setMyCalendars(updated);
      saveCalendarsToStorage('my', updated);
    } else {
      const updated = [...otherCalendars, newCalendar];
      setOtherCalendars(updated);
      saveCalendarsToStorage('other', updated);
    }

    setShowAddModal(false);
  };

  const handleDeleteCalendar = (id: string, list: 'my' | 'other') => {
    if (!confirm('Are you sure you want to delete this calendar?')) return;

    if (list === 'my') {
      const updated = myCalendars.filter(cal => cal.id !== id);
      setMyCalendars(updated);
      saveCalendarsToStorage('my', updated);
    } else {
      const updated = otherCalendars.filter(cal => cal.id !== id);
      setOtherCalendars(updated);
      saveCalendarsToStorage('other', updated);
    }
  };

  const toggleDeleteMode = (list: 'my' | 'other') => {
    if (deleteMode === list) {
      setDeleteMode('none');
    } else {
      setDeleteMode(list);
    }
  };

  const startEditingCalendar = (id: string, currentName: string) => {
    setEditingCalendarId(id);
    setEditingCalendarName(currentName);
  };

  const saveEditedCalendarName = (list: 'my' | 'other') => {
    if (!editingCalendarId) return;

    const update = (calendars: CalendarItem[]) =>
      calendars.map((cal) =>
        cal.id === editingCalendarId ? { ...cal, name: editingCalendarName } : cal
      );

    if (list === 'my') {
      const updated = update(myCalendars);
      setMyCalendars(updated);
      saveCalendarsToStorage('my', updated);
    } else {
      const updated = update(otherCalendars);
      setOtherCalendars(updated);
      saveCalendarsToStorage('other', updated);
    }

    setEditingCalendarId(null);
    setEditingCalendarName('');
  };

  const randomColor = () => {
    const colors = ['#F87171', '#60A5FA', '#34D399', '#FBBF24', '#A78BFA'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (isMobile && !isOpen) return null;

  return (
    <aside className={`w-64 border-r border-border bg-background p-4 flex flex-col ${isMobile ? 'absolute inset-y-0 left-0 z-50' : ''}`}>
      {isMobile && (
        <Button variant="ghost" size="sm" className="self-end" onClick={() => setIsOpen(false)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-lg">Calendar</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewChange('listWeek')}
        >
          <ListCheck className="h-4 w-4 mr-1" />
          <span>Agenda</span>
        </Button>
      </div>

      <Button 
        variant="default" 
        className="mb-6 gap-1"
        onClick={() => onOpenCreateEvent()}
      >
        <Plus className="h-4 w-4" />
        <span>Create Event</span>
      </Button>

      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full">
          {/* MY CALENDARS */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <ChevronDown className="h-4 w-4 mr-1" />
                <h3 className="font-medium text-sm">MY CALENDARS</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleAddCalendarClick('my')}>
                  <Plus className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => toggleDeleteMode('my')}>
                  <Minus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-1 ml-6">
              {myCalendars.map(calendar => (
                <div key={calendar.id} className="flex items-center gap-2 justify-between group">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={calendar.visible}
                      onCheckedChange={() => toggleCalendarVisibility(calendar.id, 'my')}
                      style={{ backgroundColor: calendar.visible ? calendar.color : undefined }}
                    />
                    {editingCalendarId === calendar.id ? (
                      <Input
                        value={editingCalendarName}
                        onChange={(e) => setEditingCalendarName(e.target.value)}
                        onBlur={() => saveEditedCalendarName('my')}
                        autoFocus
                        className="h-6 text-sm"
                      />
                    ) : (
                      <span 
                        className="text-sm cursor-pointer"
                        onDoubleClick={() => startEditingCalendar(calendar.id, calendar.name)}
                      >
                        {calendar.name}
                      </span>
                    )}
                  </div>
                  {deleteMode === 'my' && (
                    <button 
                      onClick={() => handleDeleteCalendar(calendar.id, 'my')}
                      className="opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* OTHER CALENDARS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <ChevronDown className="h-4 w-4 mr-1" />
                <h3 className="font-medium text-sm">OTHER CALENDARS</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleAddCalendarClick('other')}>
                  <Plus className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => toggleDeleteMode('other')}>
                  <Minus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-1 ml-6 mb-2">
              <div className="flex items-center gap-2">
                <Checkbox 
                  checked={showHolidays}
                  onCheckedChange={(checked) => setShowHolidays(Boolean(checked))}
                  className="border-gray-300"
                  style={{ backgroundColor: showHolidays ? "#60A5FA" : undefined }}
                />
                <span className="text-sm">US Holidays</span>
              </div>
            </div>

            <div className="space-y-1 ml-6">
              {otherCalendars.map(calendar => (
                <div key={calendar.id} className="flex items-center gap-2 justify-between group">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={calendar.visible}
                      onCheckedChange={() => toggleCalendarVisibility(calendar.id, 'other')}
                      style={{ backgroundColor: calendar.visible ? calendar.color : undefined }}
                    />
                    {editingCalendarId === calendar.id ? (
                      <Input
                        value={editingCalendarName}
                        onChange={(e) => setEditingCalendarName(e.target.value)}
                        onBlur={() => saveEditedCalendarName('other')}
                        autoFocus
                        className="h-6 text-sm"
                      />
                    ) : (
                      <span 
                        className="text-sm cursor-pointer"
                        onDoubleClick={() => startEditingCalendar(calendar.id, calendar.name)}
                      >
                        {calendar.name}
                      </span>
                    )}
                  </div>
                  {deleteMode === 'other' && (
                    <button 
                      onClick={() => handleDeleteCalendar(calendar.id, 'other')}
                      className="opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Add Calendar Modal */}
      {showAddModal && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-72">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">New Calendar</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <Input 
              placeholder="Calendar Name"
              value={newCalendarName}
              onChange={(e) => setNewCalendarName(e.target.value)}
            />
            <Button onClick={handleAddCalendarSubmit} className="w-full">
              Add Calendar
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
