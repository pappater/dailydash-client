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
          className={`calendar-day relative cursor-pointer flex flex-col justify-start items-center p-2 border rounded-lg transition-all duration-150 ease-in-out ${
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
          <div className="font-semibold text-center">{format(date, "d")}</div>
          <div className="w-full flex flex-col overflow-hidden mt-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event._id}
                className={`event bg-blue-50 p-1 rounded mb-1 text-xs text-left overflow-hidden truncate ${
                  event.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {event.text}
              </div>
            ))}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="p-3 bg-white border border-gray-300 rounded-lg shadow-lg text-sm">
        <div>
          {dayEvents.length > 0 ? (
            dayEvents.map((event) => (
              <div
                key={event._id}
                className="flex justify-between items-center mb-2"
              >
                <span
                  className={`${
                    event.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {event.text}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onToggleComplete(event._id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteEvent(event._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No events</p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CalendarDay;
