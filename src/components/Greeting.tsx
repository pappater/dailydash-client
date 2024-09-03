import React from "react";

interface GreetingProps {
  userName: string | undefined;
}

const Greeting: React.FC<GreetingProps> = ({ userName }) => {
  return (
    <div className="p-4 bg-neutral-100 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800">
        Hello,{" "}
        {userName
          ? userName.charAt(0).toUpperCase() + userName.slice(1)
          : "Guest"}
      </h2>
      <p className="mt-2 text-gray-600">
        Welcome to your dashboard. Manage your data, view your content, and
        start by jotting down your thoughts.
      </p>
    </div>
  );
};

export default Greeting;
