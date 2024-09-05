import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import useStore from "@/store/store";

interface AddWidgetModalProps {
  onClose: () => void;
  isOpen: boolean;
  userId: string;
}

const widgetOptions = ["calendar", "stocks", "maps"];

const AddWidget: React.FC<AddWidgetModalProps> = ({
  onClose,
  isOpen,
  userId,
}) => {
  const { widgets, addWidget, removeWidget, isDarkMode } = useStore();

  const handleAddWidget = async (widgetType: string) => {
    try {
      addWidget(widgetType);
    } catch (error) {
      console.error("Failed to add and save widget", error);
    }
  };

  const handleRemoveWidget = async (widgetType: string) => {
    try {
      const widgetToRemove = widgets.find((w) => w.type === widgetType);
      if (widgetToRemove) {
        removeWidget(widgetToRemove.id);
      }
    } catch (error) {
      console.error("Failed to remove widget", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`p-4 rounded-lg shadow-lg ${
          isDarkMode
            ? "bg-neutral-900 text-neutral-200"
            : "bg-white text-neutral-900"
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-lg font-bold ${
              isDarkMode ? "text-neutral-200" : "text-neutral-900"
            }`}
          >
            Add Widget
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          {widgetOptions.map((widgetType) => {
            const isAdded = widgets.some((w) => w.type === widgetType);
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
                  onClick={() =>
                    isAdded
                      ? handleRemoveWidget(widgetType)
                      : handleAddWidget(widgetType)
                  }
                >
                  {isAdded ? <Minus /> : <Plus />}
                </Button>
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            className={`mt-4 ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-black text-white"
            }`}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidget;
