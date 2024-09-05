import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useStore from "@/store/store";

const DialogHeaderSection: React.FC = () => {
  const { isDarkMode } = useStore();

  return (
    <DialogHeader>
      <DialogTitle
        className={`text-lg font-bold ${
          isDarkMode ? "text-neutral-200" : "text-neutral-900"
        }`}
      >
        Add Widget
      </DialogTitle>
    </DialogHeader>
  );
};

export default DialogHeaderSection;
