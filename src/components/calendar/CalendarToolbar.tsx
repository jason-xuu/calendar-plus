
import React from 'react';
import { format, addDays, addMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import { ViewState, CalendarViewType } from '@/types/calendar';
import { useIsMobile } from '@/hooks/use-mobile';

interface CalendarToolbarProps {
  viewState: ViewState;
  onViewChange: (view: CalendarViewType) => void;
  onNavigate: (date: Date) => void;
}

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  viewState,
  onViewChange,
  onNavigate,
}) => {
  const isMobile = useIsMobile();
  
  const { currentView, currentDate } = viewState;
  
  const handlePrev = () => {
    let newDate;
    
    switch (currentView) {
      case 'dayGridMonth':
        newDate = addMonths(currentDate, -1);
        break;
      case 'timeGridWeek':
        newDate = addDays(currentDate, -7);
        break;
      case 'timeGridDay':
      case 'listWeek':
        newDate = addDays(currentDate, -1);
        break;
      default:
        newDate = addDays(currentDate, -1);
    }
    
    onNavigate(newDate);
  };
  
  const handleNext = () => {
    let newDate;
    
    switch (currentView) {
      case 'dayGridMonth':
        newDate = addMonths(currentDate, 1);
        break;
      case 'timeGridWeek':
        newDate = addDays(currentDate, 7);
        break;
      case 'timeGridDay':
      case 'listWeek':
        newDate = addDays(currentDate, 1);
        break;
      default:
        newDate = addDays(currentDate, 1);
    }
    
    onNavigate(newDate);
  };
  
  const handleToday = () => {
    onNavigate(new Date());
  };
  
  const formatDate = () => {
    if (currentView === 'dayGridMonth') {
      return format(currentDate, 'MMMM yyyy');
    } else if (currentView === 'timeGridWeek') {
      const endOfWeek = addDays(currentDate, 6);
      return `${format(currentDate, 'MMM d')} - ${format(endOfWeek, 'MMM d, yyyy')}`;
    } else if (currentView === 'timeGridDay') {
      return format(currentDate, 'EEEE, MMMM d, yyyy');
    } else {
      return format(currentDate, 'MMMM yyyy');
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
      <div className="flex items-center">
        <Button variant="outline" size="sm" onClick={handleToday}>
          Today
        </Button>
        
        <div className="flex items-center mx-2">
          <Button variant="ghost" size="icon" onClick={handlePrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <h2 className="text-lg font-semibold flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-calendar-primary" />
          {formatDate()}
        </h2>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button 
          variant={currentView === 'dayGridMonth' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onViewChange('dayGridMonth')}
        >
          Month
        </Button>
        <Button 
          variant={currentView === 'timeGridWeek' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onViewChange('timeGridWeek')}
        >
          Week
        </Button>
        <Button 
          variant={currentView === 'timeGridDay' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onViewChange('timeGridDay')}
        >
          Day
        </Button>
        <Button 
          variant={currentView === 'listWeek' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onViewChange('listWeek')}
        >
          Agenda
        </Button>
      </div>
    </div>
  );
};

export default CalendarToolbar;
