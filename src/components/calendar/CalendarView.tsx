import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
} from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";
import EventDialog from "./EventDialog";
import {
  fetchCalendarEvents,
  saveCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEventCompletion,
} from "@/services/api";
import { TooltipProvider } from "../ui/tooltip";
import { Event, CalendarViewProps, DateDirection } from "./types"; // Import types
import useStore from "../../store/store";

const CalendarView: React.FC<CalendarViewProps> = ({ googleId }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { isDarkMode } = useStore();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await fetchCalendarEvents(googleId);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch calendar events", error);
      }
    };
    fetchEvents();
  }, [googleId]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const handleAddEvent = async (newEventText: string) => {
    if (selectedDate && newEventText) {
      const newEvent: Event = {
        date: selectedDate,
        text: newEventText,
        completed: false,
      };
      setEvents([...events, newEvent]);
      setIsDialogOpen(false);
      try {
        await saveCalendarEvent(googleId, newEvent);
      } catch (error) {
        console.error("Failed to save calendar event", error);
      }
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteCalendarEvent(googleId, eventId);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Failed to delete calendar event", error);
    }
  };

  const handleToggleComplete = async (eventId: string) => {
    const eventToUpdate = events.find((event) => event._id === eventId);
    if (eventToUpdate) {
      const updatedEvent: Event = {
        ...eventToUpdate,
        completed: !eventToUpdate.completed,
      };
      setEvents(
        events.map((event) => (event._id === eventId ? updatedEvent : event))
      );
      try {
        await updateCalendarEventCompletion(
          googleId,
          eventId,
          updatedEvent.completed
        );
      } catch (error) {
        console.error("Failed to update calendar event", error);
      }
    }
  };

  const handleMonthChange = (direction: DateDirection) => {
    setCurrentMonth((prevMonth) =>
      direction === "next" ? addMonths(prevMonth, 1) : subMonths(prevMonth, 1)
    );
  };

  const handleTodayClick = () => setCurrentMonth(new Date());

  const startWeek = startOfWeek(startOfMonth(currentMonth), {
    weekStartsOn: 0,
  });
  const endWeek = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  return (
    <TooltipProvider>
      <div
        className={`calendar-view p-4 rounded-2xl ${
          isDarkMode ? "bg-neutral-900 text-white" : "bg-white text-black"
        }`}
      >
        <CalendarHeader
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          onTodayClick={handleTodayClick}
        />
        <div
          className={`grid grid-cols-7 gap-2 mb-4 text-center ${
            isDarkMode ? "text-neutral-400" : "text-neutral-800"
          }`}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-semibold">
              {day}
            </div>
          ))}
          {days.map((date) => (
            <CalendarDay
              key={format(date, "yyyy-MM-dd")}
              date={date}
              events={events}
              currentMonth={currentMonth}
              isToday={isToday(date)}
              onDateClick={handleDateClick}
              onToggleComplete={handleToggleComplete}
              onDeleteEvent={handleDeleteEvent}
            />
          ))}
        </div>
        <EventDialog
          open={isDialogOpen}
          selectedDate={selectedDate}
          events={events}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          onToggleComplete={handleToggleComplete}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </TooltipProvider>
  );
};

export default CalendarView;
