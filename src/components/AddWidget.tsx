import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react"; // Import Plus and Minus icons from Lucide
import useStore from "@/store/store";

interface AddWidgetModalProps {
  onClose: () => void;
  isOpen: boolean;
  userId: string;
}

const widgetOptions = ["calendar", "stocks", "maps"]; // List of available widgets

const AddWidget: React.FC<AddWidgetModalProps> = ({
  onClose,
  isOpen,
  userId,
}) => {
  const { widgets, addWidget, removeWidget } = useStore();

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-black">
            Add Widget
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4">
          {widgetOptions.map((widgetType) => {
            const isAdded = widgets.some((w) => w.type === widgetType);
            return (
              <div
                className="flex justify-between items-center"
                key={widgetType}
              >
                <span>
                  {widgetType.charAt(0).toUpperCase() + widgetType.slice(1)}
                </span>
                <Button
                  variant="outline"
                  className={isAdded ? "text-red-500" : "text-green-500"}
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
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidget;
