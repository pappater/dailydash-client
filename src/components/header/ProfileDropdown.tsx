import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useStore from "../../store/store";

const ProfileDropdown: React.FC = () => {
  const { user, isDarkMode } = useStore();

  return user ? (
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
        className={`mt-2 w-64 right-0 ${
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
          <p className="text-sm break-words">{user.emails[0].value}</p>
        </div>
        <DropdownMenuItem
          onClick={() =>
            (window.location.href = "http://localhost:5001/api/auth/logout")
          }
          className={`px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors duration-150 ${
            isDarkMode
              ? "dark:hover:bg-neutral-700"
              : "dark:hover:bg-neutral-100"
          }`}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};

export default ProfileDropdown;
