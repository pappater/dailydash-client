import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Trash2, X } from "lucide-react";
import { EventDialogProps } from "./types"; // Import types

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

  const handleSave = () => {
    onAddEvent(newEventText);
    setNewEventText("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-4 bg-white border rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <DialogTitle className="text-lg font-semibold">
            {selectedDate && `Events for ${selectedDate}`}
          </DialogTitle>
          <Button
            variant="outline"
            className="text-gray-500 hover:text-gray-700"
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
                className="bg-gray-100 p-2 rounded mb-2 text-sm flex justify-between items-center"
              >
                <span
                  className={`${
                    event.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {event.text}
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => onToggleComplete(event._id)}
                    className="mr-2"
                  >
                    <Check
                      size={16}
                      className={`${
                        event.completed ? "text-green-500" : "text-gray-500"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => onDeleteEvent(event._id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <Input
          type="text"
          className="border p-2 rounded-md w-full mb-4"
          value={newEventText}
          onChange={(e) => setNewEventText(e.target.value)}
          placeholder="Add event/task"
        />
        <Button className="bg-black text-white w-full" onClick={handleSave}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
