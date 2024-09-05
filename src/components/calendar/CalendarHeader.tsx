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
      className={`flex justify-between items-center mb-4 p-4 rounded-lg${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } border-b ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
    >
      <button
        onClick={() => onMonthChange("prev")}
        className={`p-2 ${
          isDarkMode
            ? "text-white hover:text-gray-400"
            : "text-black hover:text-gray-700"
        }`}
      >
        <ChevronLeft />
      </button>
      <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <button
        onClick={() => onMonthChange("next")}
        className={`p-2 ${
          isDarkMode
            ? "text-white hover:text-gray-400"
            : "text-black hover:text-gray-700"
        }`}
      >
        <ChevronRight />
      </button>
      <Button
        onClick={onTodayClick}
        className={`ml-4 ${
          isDarkMode
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
      >
        Today
      </Button>
    </div>
  );
};

export default CalendarHeader;
