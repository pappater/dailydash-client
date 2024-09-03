import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"; // Import Plus icon from Lucide
import useStore from "../store/store";

interface AddWidgetModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({ onClose, isOpen }) => {
  const { addWidget } = useStore();

  const handleAddWidget = (widgetType: string) => {
    addWidget(widgetType);
    onClose(); // Close the modal after adding the widget
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
          <div className="flex justify-between items-center">
            <span>Calendar View</span>
            <Button variant="ghost" onClick={() => handleAddWidget("calendar")}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          {/* You can add more widgets here */}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetModal;
