import React from "react";
import { Button } from "@/components/ui/button";
import useStore from "@/store/store";

interface DialogFooterSectionProps {
  onClose: () => void;
}

const DialogFooterSection: React.FC<DialogFooterSectionProps> = ({
  onClose,
}) => {
  const { isDarkMode } = useStore();

  return (
    <div className="mt-4">
      <Button
        onClick={onClose}
        className={`mt-4 ${
          isDarkMode ? "bg-gray-600 text-white" : "bg-black text-white"
        }`}
      >
        Close
      </Button>
    </div>
  );
};

export default DialogFooterSection;
