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
      className="flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
      key={widgetType}
    >
      <span className="capitalize">
        {widgetType.charAt(0).toUpperCase() + widgetType.slice(1)}
      </span>
      <Button
        variant="outline"
        className={`border ${
          isAdded
            ? "text-red-500 border-red-500"
            : "text-green-500 border-green-500"
        } ${isDarkMode ? "dark:border-gray-700" : "border-gray-300"}`}
        onClick={() => (isAdded ? onRemove(widgetType) : onAdd(widgetType))}
      >
        {isAdded ? <Minus /> : <Plus />}
      </Button>
    </div>
  );
};

export default WidgetListItem;
