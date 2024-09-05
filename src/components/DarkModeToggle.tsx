import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import useStore from "../store/store"; // Adjust path if needed

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, setDarkMode } = useStore();

  return (
    <button
      onClick={() => setDarkMode(!isDarkMode)}
      className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isDarkMode ? "bg-gray-700" : ""
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isDarkMode ? "translate-x-6" : ""
        } flex items-center justify-center`}
      >
        {isDarkMode ? (
          <FaMoon className="text-yellow-500 w-3/4 h-full" />
        ) : (
          <FaSun className="text-yellow-500 w-3/4 h-full" />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;
