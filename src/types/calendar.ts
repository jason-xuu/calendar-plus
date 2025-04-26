
export type CalendarViewType = 
  | 'dayGridMonth' 
  | 'timeGridWeek' 
  | 'timeGridDay'
  | 'listWeek';

export interface ViewState {
  currentView: CalendarViewType;
  currentDate: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  location?: string;
  description?: string;
  calendar: string;
  color?: string;
  attendees?: Attendee[];
  recurringRule?: string;
  isRecurring?: boolean;
}

export interface Attendee {
  email: string;
  name?: string;
  response?: 'accepted' | 'declined' | 'tentative' | 'needsAction';
}

export interface Calendar {
  id: string;
  name: string;
  color: string;
  description?: string;
  isVisible: boolean;
  isDefault?: boolean;
  isShared?: boolean;
  owner?: string;
  accessLevel?: 'owner' | 'editor' | 'viewer';
}
