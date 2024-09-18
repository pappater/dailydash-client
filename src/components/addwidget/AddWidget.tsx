import React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer"; // Updated import
import useStore from "@/store/store";
import WidgetListItem from "./WidgetListItem";
import DialogHeaderSection from "./DialogHeaderSection";
import DialogFooterSection from "./DialogFooterSection";

interface AddWidgetModalProps {
  onClose: () => void;
  isOpen: boolean;
  userId: string;
}

const widgetOptions = ["calendar", "stocks", "random_location", "quotes"];

const AddWidget: React.FC<AddWidgetModalProps> = ({ onClose, isOpen }) => {
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
    <Drawer open={isOpen} onOpenChange={onClose}> {/* Updated component */}
      <DrawerContent
        className={`p-4 rounded-lg shadow-lg ${
          isDarkMode
            ? "bg-neutral-900 text-neutral-200"
            : "bg-white text-neutral-900"
        }`}
      >
        <DialogHeaderSection /> {/* You might want to rename these sections */}
        <div className="flex flex-col gap-4 mt-4">
          {widgetOptions.map((widgetType) => {
            const isAdded = widgets.some((w) => w.type === widgetType);
            return (
              <WidgetListItem
                key={widgetType}
                widgetType={widgetType}
                isAdded={isAdded}
                onAdd={handleAddWidget}
                onRemove={handleRemoveWidget}
              />
            );
          })}
        </div>
        <DialogFooterSection onClose={onClose} /> {/* You might want to rename these sections */}
      </DrawerContent>
    </Drawer>
  );
};

export default AddWidget;
