import React from "react";
import { format, isSameMonth } from "date-fns";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Check, Trash2 } from "lucide-react";
import { CalendarDayProps } from "./types"; // Import types
import useStore from "../../store/store";

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  events,
  currentMonth,
  isToday,
  onDateClick,
  onToggleComplete,
  onDeleteEvent,
}) => {
  const { isDarkMode } = useStore();
  const formattedDate = format(date, "yyyy-MM-dd");
  const dayEvents = events.filter((event) => event.date === formattedDate);
  const hasEvent = dayEvents.length > 0;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          style={{
            backgroundColor: isToday
              ? isDarkMode
                ? "#1E40AF"
                : "#93C5FD"
              : undefined,
          }}
          className={`calendar-day relative cursor-pointer flex flex-col justify-start items-center p-2 border rounded-lg transition-all duration-150 ease-in-out ${
            isSameMonth(date, currentMonth)
              ? hasEvent
                ? isDarkMode
                  ? "bg-neutral-700"
                  : "bg-blue-200"
                : isDarkMode
                ? "bg-neutral-800"
                : "bg-white"
              : isDarkMode
              ? "bg-neutral-900"
              : "bg-neutral-300"
          } border-${isDarkMode ? "neutral-600" : "neutral-300"}`}
          onClick={() => onDateClick(formattedDate)}
        >
          <div
            className={`font-semibold text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {format(date, "d")}
          </div>
          <div className="w-full flex flex-col overflow-hidden mt-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event._id}
                className={`event p-1 rounded mb-1 text-xs text-left overflow-hidden truncate ${
                  isDarkMode
                    ? event.completed
                      ? "line-through text-gray-500 bg-neutral-800"
                      : "bg-neutral-900 text-white"
                    : event.completed
                    ? "line-through text-gray-400"
                    : "bg-blue-50 text-black"
                }`}
              >
                {event.text}
              </div>
            ))}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent
        className={`p-3 ${
          isDarkMode
            ? "bg-neutral-800 text-white border-neutral-600"
            : "bg-white text-black border-neutral-300"
        } border rounded-lg shadow-lg text-sm`}
      >
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
                      ? isDarkMode
                        ? "line-through text-gray-500"
                        : "line-through text-gray-400"
                      : isDarkMode
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {event.text}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => event._id && onToggleComplete(event._id)}
                    className={`hover:${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => event._id && onDeleteEvent(event._id)}
                    className={`hover:${
                      isDarkMode ? "text-red-500" : "text-red-600"
                    }`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              No events
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CalendarDay;
