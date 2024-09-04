import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarHeaderProps } from "./types"; // Import types

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
  onTodayClick,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={() => onMonthChange("prev")} className="p-2">
        <ChevronLeft />
      </button>
      <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <button onClick={() => onMonthChange("next")} className="p-2">
        <ChevronRight />
      </button>
      <Button onClick={onTodayClick} className="ml-4">
        Today
      </Button>
    </div>
  );
};

export default CalendarHeader;
