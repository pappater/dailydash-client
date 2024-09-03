import React, { useState } from "react";
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
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface Event {
  date: string;
  text: string;
}

const CalendarView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEventText, setNewEventText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const handleAddEvent = () => {
    if (selectedDate && newEventText) {
      setEvents([...events, { date: selectedDate, text: newEventText }]);
      setSelectedDate(null);
      setNewEventText("");
      setIsDialogOpen(false);
    }
  };

  const handleMonthChange = (direction: "next" | "prev") => {
    setCurrentMonth((prevMonth) =>
      direction === "next" ? addMonths(prevMonth, 1) : subMonths(prevMonth, 1)
    );
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
      <div className="flex items-center mb-4">
        <button onClick={() => handleMonthChange("prev")} className="p-2">
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={() => handleMonthChange("next")} className="p-2">
          <ChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-semibold">
            {day}
          </div>
        ))}
        {days.map((date) => {
          const formattedDate = format(date, "yyyy-MM-dd");
          const hasEvent = events.some((event) => event.date === formattedDate);
          return (
            <div
              key={formattedDate}
              className={`calendar-day p-2 border rounded-lg relative cursor-pointer ${
                isToday(date) ? "bg-yellow-200" : ""
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
              <div className="text-xs text-gray-600">
                {events
                  .filter((event) => event.date === formattedDate)
                  .map((event, index) => (
                    <div key={index} className="event">
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
              Add Event
            </DialogTitle>
            <Button
              variant="outline"
              className="text-gray-500 hover:text-gray-700 relative z-50"
              onClick={() => setIsDialogOpen(false)}
            >
              <X size={16} />
            </Button>
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
