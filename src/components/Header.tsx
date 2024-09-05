import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useStore from "../store/store";
import { FaMoon, FaSun } from "react-icons/fa";

const Header: React.FC = () => {
  const { user, setShowModal, isDarkMode, setDarkMode } = useStore();

  return (
    <header
      className={`flex justify-between items-center p-4 sticky top-0 z-50 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Left Side: Pearl */}
      <div className="text-4xl font-bold">Pearl.</div>

      {/* Right Side: Dark Mode Toggle, Manage Widget, Profile Image */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        {/* <Switch
          checked={isDarkMode}
          onCheckedChange={() => setDarkMode(!isDarkMode)}
        /> */}
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

        {/* Manage Widgets Menu */}
        <button
          onClick={() => setShowModal(true)}
          className={`px-4 py-2 rounded-lg ${
            isDarkMode
              ? "text-gray-200 hover:bg-gray-700"
              : "text-gray-700 hover:bg-gray-200"
          } transition duration-150 ease-in-out`}
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
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2">
              <div className="p-4">
                <p className="font-bold">{user.displayName}</p>
                <p>{user.emails[0].value}</p>
              </div>
              <DropdownMenuItem
                onClick={() =>
                  (window.location.href =
                    "http://localhost:5001/api/auth/logout")
                }
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
