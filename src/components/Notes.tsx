import React, { useEffect, useRef, useState } from "react";
import { saveUserDataToDB, fetchUserDataFromDB } from "../services/api";
import useStore from "../store/store";

interface NotesProps {
  userId: string;
}

const Notes: React.FC<NotesProps> = ({ userId }) => {
  const { text, setText, isDarkMode } = useStore();
  const [localText, setLocalText] = useState(text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserDataFromDB(userId);
        setLocalText(data.savedData || ""); // Update local text with saved data
        setText(data.savedData || ""); // Update global state with fetched data
      } catch (error) {
        console.error("Failed to fetch data from DB");
      }
    };

    fetchData();
  }, [userId, setText]);

  useEffect(() => {
    setLocalText(text); // Update local state when global text changes
  }, [text]);

  useEffect(() => {
    // Focus the textarea on page load and set cursor to the start
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.setSelectionRange(0, 0); // Set cursor to the start
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setLocalText(newText);
    // Save data to DB on change
    if (userId) {
      saveUserDataToDB(userId, newText).catch((error) =>
        console.error("Failed to save data to DB", error)
      );
    }
    setText(newText); // Update global state on change
  };

  return (
    <div className={`p-1 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
      <textarea
        ref={textareaRef}
        placeholder="Enter some text"
        value={localText}
        onChange={handleInputChange}
        className={`w-full p-5 border resize-none h-64 focus:outline-none rounded-md ${
          isDarkMode
            ? "bg-gray-900 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
      />
    </div>
  );
};

export default Notes;
