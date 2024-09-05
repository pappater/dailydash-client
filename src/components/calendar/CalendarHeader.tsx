import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarHeaderProps } from "./types"; // Import types
import useStore from "../../store/store";

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
  onTodayClick,
}) => {
  const { isDarkMode } = useStore();

  return (
    <div
      className={`flex justify-between items-center mb-4 p-4 rounded-lg ${
        isDarkMode
          ? "bg-neutral-900 text-neutral-200"
          : "bg-white text-neutral-900"
      }  ${isDarkMode ? "border-neutral-700" : "border-neutral-300"}`}
    >
      <button
        onClick={() => onMonthChange("prev")}
        className={`p-2 ${
          isDarkMode
            ? "text-neutral-200 hover:text-neutral-400"
            : "text-neutral-900 hover:text-neutral-700"
        }`}
      >
        <ChevronLeft />
      </button>
      <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <button
        onClick={() => onMonthChange("next")}
        className={`p-2 ${
          isDarkMode
            ? "text-neutral-200 hover:text-neutral-400"
            : "text-neutral-900 hover:text-neutral-700"
        }`}
      >
        <ChevronRight />
      </button>
      <Button
        onClick={onTodayClick}
        className={`ml-4 ${
          isDarkMode
            ? "bg-neutral-800 text-neutral-200 hover:bg-neutral-600"
            : "bg-gray-200 text-neutral-900 hover:bg-gray-300"
        }`}
      >
        Today
      </Button>
    </div>
  );
};

export default CalendarHeader;
