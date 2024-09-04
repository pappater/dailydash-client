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
  isSameMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  fetchCalendarEvents,
  saveCalendarEvent,
  deleteCalendarEvent,
} from "@/services/api";

interface Event {
  _id: string;
  date: string;
  text: string;
}

interface CalendarViewProps {
  googleId: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({ googleId }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEventText, setNewEventText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load events from the database
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

  const handleAddEvent = async () => {
    if (selectedDate && newEventText) {
      const newEvent = { date: selectedDate, text: newEventText };
      setEvents([...events, newEvent]);
      setNewEventText("");
      setIsDialogOpen(false);

      // Save event to the database
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

  const handleMonthChange = (direction: "next" | "prev") => {
    setCurrentMonth((prevMonth) =>
      direction === "next" ? addMonths(prevMonth, 1) : subMonths(prevMonth, 1)
    );
  };

  const handleTodayClick = () => {
    setCurrentMonth(new Date());
  };

  const startWeek = startOfWeek(startOfMonth(currentMonth), {
    weekStartsOn: 0,
  });
  const endWeek = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

  const days = eachDayOfInterval({
    start: startWeek,
    end: endWeek,
  });

  return (
    <div className="calendar-view p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => handleMonthChange("prev")} className="p-2">
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={() => handleMonthChange("next")} className="p-2">
          <ChevronRight />
        </button>
        <Button onClick={handleTodayClick} className="ml-4">
          Today
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-semibold">
            {day}
          </div>
        ))}
        {days.map((date) => {
          const formattedDate = format(date, "yyyy-MM-dd");
          const dayEvents = events.filter(
            (event) => event.date === formattedDate
          );
          const hasEvent = dayEvents.length > 0;
          return (
            <div
              key={formattedDate}
              className={`calendar-day relative cursor-pointer w-20 h-20 flex flex-col justify-start items-start p-1 border rounded-lg ${
                isToday(date) ? "bg-blue-200" : ""
              } ${
                isSameMonth(date, currentMonth)
                  ? hasEvent
                    ? "bg-blue-100"
                    : "bg-white"
                  : "bg-gray-200"
              } ${
                selectedDate === formattedDate ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleDateClick(formattedDate)}
            >
              <div className="font-semibold">{format(date, "d")}</div>
              <div className="w-full flex flex-col  overflow-hidden">
                {/* {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-600 text-center">
                    +{dayEvents.length - 2}
                  </div>
                )} */}
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event._id}
                    className="event bg-blue-50 pl-1 rounded mb-1 text-xs text-left overflow-hidden truncate"
                  >
                    {event.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogContent className="p-4 bg-white border rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-semibold">
              {selectedDate && `Events for ${selectedDate}`}
            </DialogTitle>
            <Button
              variant="outline"
              className="text-gray-500 hover:text-gray-700 relative z-50"
              onClick={() => setIsDialogOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>

          <div className="mb-4">
            {events
              .filter((event) => event.date === selectedDate)
              .map((event) => (
                <div
                  key={event._id}
                  className="bg-gray-100 p-2 rounded mb-2 text-sm flex justify-between items-center"
                >
                  {event.text}
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
          </div>

          <Input
            type="text"
            className="border p-2 rounded-md w-full mb-4"
            value={newEventText}
            onChange={(e) => setNewEventText(e.target.value)}
            placeholder="Add event/task"
          />
          <Button
            className="bg-black text-white w-full"
            onClick={handleAddEvent}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarView;
