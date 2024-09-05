import React from "react";
import useStore from "../store/store"; // Import useStore to access isDarkMode

interface GreetingProps {
  userName: string | undefined;
}

const Greeting: React.FC<GreetingProps> = ({ userName }) => {
  const { isDarkMode } = useStore(); // Get isDarkMode from Zustand store

  return (
    <div
      className={`p-4 rounded-lg shadow-sm ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-neutral-100 text-gray-800"
      }`}
    >
      <h2 className="text-2xl font-semibold">
        Hello,{" "}
        {userName
          ? userName.charAt(0).toUpperCase() + userName.slice(1)
          : "Guest"}
      </h2>
      <p className="mt-2">
        Welcome to your dashboard. Manage your data, view your content, and
        start by jotting down your thoughts.
      </p>
    </div>
  );
};

export default Greeting;
