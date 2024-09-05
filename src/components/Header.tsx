import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useStore from "../store/store";
import { FaMoon, FaSun } from "react-icons/fa";
import { saveDarkModePreference } from "@/services/api"; // Ensure this path is correct

const Header: React.FC = () => {
  const { user, setShowModal, isDarkMode, setDarkMode } = useStore();

  const handleToggleDarkMode = async () => {
    try {
      const newDarkMode = !isDarkMode;
      setDarkMode(newDarkMode);

      // Save dark mode preference to the database
      if (user?.id) {
        await saveDarkModePreference(user.id, newDarkMode);
        console.log("Dark mode preference saved:", newDarkMode);
      } else {
        console.error("User ID is not available");
      }
    } catch (error) {
      console.error("Failed to save dark mode preference:", error);
    }
  };

  return (
    <header
      className={`flex justify-between items-center p-4 sticky top-0 z-50 transition-colors duration-300 ${
        isDarkMode
          ? "bg-neutral-900 text-neutral-200"
          : "bg-neutral-100 text-neutral-900"
      } shadow-md`}
    >
      {/* Left Side: Pearl */}
      <div className="text-4xl font-bold">Pearl.</div>

      {/* Right Side: Dark Mode Toggle, Manage Widget, Profile Image */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={handleToggleDarkMode}
          className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            isDarkMode ? "bg-neutral-800" : "bg-neutral-300"
          }`}
        >
          <div
            className={`absolute w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
              isDarkMode
                ? "translate-x-6 bg-neutral-700"
                : "translate-x-0 bg-neutral-200"
            } flex items-center justify-center`}
          >
            {isDarkMode ? (
              <FaMoon className="text-yellow-500 w-3/4 h-full" />
            ) : (
              <FaSun className="text-yellow-500 w-3/4 h-full" />
            )}
          </div>
        </button>

        {/* Manage Widgets Menu */}
        <button
          onClick={() => setShowModal(true)}
          className={`px-4 py-2 rounded-lg font-semibold transition duration-150 ease-in-out ${
            isDarkMode
              ? "text-neutral-300 hover:bg-neutral-800"
              : "text-neutral-800 hover:bg-neutral-200"
          }`}
        >
          Manage Widgets
        </button>

        {/* Profile Image and Dropdown Menu */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src={user.photos[0].value}
                alt={user.displayName}
                className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                  isDarkMode ? "border-neutral-700" : "border-neutral-300"
                }`}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`mt-2 w-48 ${
                isDarkMode
                  ? "bg-neutral-900 text-neutral-200 border-neutral-700"
                  : "bg-white text-neutral-900 border-neutral-200"
              } shadow-lg rounded-lg border`}
            >
              <div
                className={`p-4 border-b ${
                  isDarkMode ? "border-neutral-700" : "border-neutral-200"
                }`}
              >
                <p className="font-bold">{user.displayName}</p>
                <p className="text-sm">{user.emails[0].value}</p>
              </div>
              <DropdownMenuItem
                onClick={() =>
                  (window.location.href =
                    "http://localhost:5001/api/auth/logout")
                }
                className={`hover:bg-neutral-200 ${
                  isDarkMode
                    ? "dark:hover:bg-neutral-700"
                    : "dark:hover:bg-neutral-100"
                }`}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
