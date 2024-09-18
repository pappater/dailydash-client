import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import useStore from "@/store/store";

interface WidgetListItemProps {
  widgetType: string;
  isAdded: boolean;
  onAdd: (widgetType: string) => void;
  onRemove: (widgetType: string) => void;
}

const WidgetListItem: React.FC<WidgetListItemProps> = ({
  widgetType,
  isAdded,
  onAdd,
  onRemove,
}) => {
  const { isDarkMode } = useStore();

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg cursor-pointer transition-shadow duration-200 ${
        isDarkMode ? "bg-neutral-800 hover:bg-neutral-700" : "bg-white hover:bg-gray-100"
      } shadow-sm hover:shadow-md`}
      key={widgetType}
    >
      <span className="capitalize text-lg font-medium">
        {widgetType.charAt(0).toUpperCase() + widgetType.slice(1)}
      </span>
      <Button
        variant="outline"
        className={`px-4 py-2 rounded-full transition-colors duration-200 ${
          isAdded
            ? "text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            : "text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
        } ${isDarkMode ? "dark:border-gray-700" : "border-gray-300"}`}
        onClick={() => (isAdded ? onRemove(widgetType) : onAdd(widgetType))}
      >
        {isAdded ? <Minus /> : <Plus />}
      </Button>
    </div>
  );
};

export default WidgetListItem;
