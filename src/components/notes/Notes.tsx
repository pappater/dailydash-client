import React, { useEffect, useRef, useState } from "react";
import { saveUserDataToDB } from "../../services/api";
import useStore from "../../store/store";

interface NotesProps {
  userId: string;
}

const Notes: React.FC<NotesProps> = ({ userId }) => {
  const { dashboardData, setText, isDarkMode } = useStore();
  const [localText, setLocalText] = useState(dashboardData?.savedData || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (dashboardData) {
      setLocalText(dashboardData.savedData || ""); // Update local text with saved data from dashboardData
      setText(dashboardData.savedData || ""); // Update global state with fetched data from dashboardData
    }
  }, [dashboardData, setText]);

  useEffect(() => {
    setLocalText(dashboardData?.savedData || ""); // Update local state when global text changes
  }, [dashboardData?.savedData]);

  useEffect(() => {
    // Focus the textarea on page load and set cursor to the start
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.setSelectionRange(0, 0); // Set cursor to the start
    }
  }, []);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newText = event.target.value;
    setLocalText(newText);
    setText(newText); // Update global state on change

    // Save data to DB on change
    if (userId) {
      try {
        await saveUserDataToDB(userId, newText);
      } catch (error) {
        console.error("Failed to save data to DB", error);
      }
    }
  };

  return (
    <div className={`p-1 ${isDarkMode ? "bg-neutral-900" : "bg-white"}`}>
      <textarea
        ref={textareaRef}
        placeholder="Enter some text"
        value={localText}
        onChange={handleInputChange}
        className={`w-full p-5 border resize-none h-80 focus:outline-none rounded-md ${
          isDarkMode
            ? "bg-neutral-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
      />
    </div>
  );
};

export default Notes;
