import React from "react";
import { format, isSameMonth } from "date-fns";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Check, Trash2 } from "lucide-react";
import { CalendarDayProps } from "./types"; // Import types

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  events,
  currentMonth,
  isToday,
  onDateClick,
  onToggleComplete,
  onDeleteEvent,
}) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  const dayEvents = events.filter((event) => event.date === formattedDate);
  const hasEvent = dayEvents.length > 0;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`calendar-day relative cursor-pointer w-20 h-20 flex flex-col justify-start items-start p-1 border rounded-lg ${
            isToday ? "bg-blue-200" : ""
          } ${
            isSameMonth(date, currentMonth)
              ? hasEvent
                ? "bg-blue-100"
                : "bg-white"
              : "bg-gray-200"
          }`}
          onClick={() => onDateClick(formattedDate)}
        >
          <div className="font-semibold">{format(date, "d")}</div>
          <div className="w-full flex flex-col overflow-hidden">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event._id}
                className={`event bg-blue-50 pl-1 rounded mb-1 text-xs text-left overflow-hidden truncate ${
                  event.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {event.text}
              </div>
            ))}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-sm">
          {dayEvents.length > 0 ? (
            dayEvents.map((event) => (
              <div
                key={event._id}
                className="flex justify-between items-center mb-1"
              >
                <span
                  className={`${
                    event.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {event.text}
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => onToggleComplete(event._id)}
                    className="mr-2"
                  >
                    <Check
                      size={16}
                      className={`${
                        event.completed ? "text-green-500" : "text-gray-500"
                      }`}
                    />
                  </button>
                  <button onClick={() => onDeleteEvent(event._id)}>
                    <Trash2
                      size={16}
                      className="text-red-500 hover:text-red-700"
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No events</p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CalendarDay;
