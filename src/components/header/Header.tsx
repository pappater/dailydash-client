import React from "react";
import ManageWidgetsButton from "./ManageWidgets";
import ProfileDropdown from "./ProfileDropdown";
import useStore from "../../store/store";
import DarkModeToggle from "../darkMode/DarkModeToggle";

const Header: React.FC = () => {
  const { isDarkMode } = useStore();
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
        <DarkModeToggle />
        <ManageWidgetsButton />
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
