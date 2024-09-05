export interface Event {
  _id?: string;
  date: string;
  text: string;
  completed: boolean;
}

export interface CalendarViewProps {
  googleId: string;
}

export type DateDirection = "next" | "prev";

export interface CalendarHeaderProps {
  currentMonth: Date;
  onMonthChange: (direction: DateDirection) => void;
  onTodayClick: () => void;
}

export interface CalendarDayProps {
  date: Date;
  events: Event[];
  currentMonth: Date;
  isToday: boolean;
  onDateClick: (date: string) => void;
  onToggleComplete: (eventId: string) => void;
  onDeleteEvent: (eventId: string) => void;
}

export interface EventDialogProps {
  open: boolean;
  selectedDate: string | null;
  events: Event[];
  onAddEvent: (newEventText: string) => void;
  onDeleteEvent: (eventId: string) => void;
  onToggleComplete: (eventId: string) => void;
  onClose: () => void;
}
