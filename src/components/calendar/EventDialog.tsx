import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Trash2, X } from "lucide-react";
import { EventDialogProps } from "./types"; // Import types
import useStore from "../../store/store";

const EventDialog: React.FC<EventDialogProps> = ({
  open,
  selectedDate,
  events,
  onAddEvent,
  onDeleteEvent,
  onToggleComplete,
  onClose,
}) => {
  const [newEventText, setNewEventText] = useState("");
  const { isDarkMode } = useStore(); // Get the dark mode state

  const handleSave = () => {
    onAddEvent(newEventText);
    setNewEventText("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`p-4 rounded-lg shadow-lg ${
          isDarkMode
            ? "bg-neutral-800 border-neutral-700"
            : "bg-white border-gray-300"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <DialogTitle
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {selectedDate && `Events for ${selectedDate}`}
          </DialogTitle>
          <Button
            variant="outline"
            className={`z-50 ${
              isDarkMode
                ? "text-neutral-400 hover:text-neutral-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={onClose}
          >
            <X size={16} />
          </Button>
        </div>
        <div className="mb-4">
          {events
            .filter((event) => event.date === selectedDate)
            .map((event) => (
              <div
                key={event._id}
                className={`p-2 rounded mb-2 text-sm flex justify-between items-center ${
                  isDarkMode ? "bg-neutral-700" : "bg-gray-100"
                }`}
              >
                <span
                  className={`${
                    event.completed
                      ? "line-through text-neutral-400"
                      : isDarkMode
                      ? "text-neutral-300"
                      : "text-gray-800"
                  }`}
                >
                  {event.text}
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => event._id && onToggleComplete(event._id)}
                    className="mr-2"
                  >
                    <Check
                      size={16}
                      className={`${
                        event.completed
                          ? "text-green-500"
                          : isDarkMode
                          ? "text-neutral-500"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => event._id && onDeleteEvent(event._id)}
                    className={`text-red-500 hover:text-red-700 ml-2 ${
                      isDarkMode ? "hover:text-red-400" : ""
                    }`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <Input
          type="text"
          className={`border p-2 rounded-md w-full mb-4 ${
            isDarkMode
              ? "bg-neutral-900 text-white border-neutral-600"
              : "bg-white border-gray-300"
          }`}
          value={newEventText}
          onChange={(e) => setNewEventText(e.target.value)}
          placeholder="Add event/task"
        />
        <Button
          className={`w-full ${
            isDarkMode ? "bg-neutral-600 text-white" : "bg-black text-white"
          }`}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
