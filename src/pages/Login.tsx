// Login.tsx

import React from "react";
import useStore from "../store/store";
import QuoteDisplay from "../components/login/QuoteDisplay"; // Adjust the path if needed

const Login: React.FC = () => {
  const { isDarkMode } = useStore();

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  return (
    <div
      className={`flex min-h-screen min-w-screen ${
        isDarkMode ? "bg-dark" : "bg-gray-50"
      } overflow-hidden`}
    >
      {/* Left Side - Image and Quote */}
      <div
        className={`w-1/2 h-screen flex items-center justify-center ${
          isDarkMode ? "bg-dark" : "bg-gray-200"
        }`}
      >
        <QuoteDisplay />
      </div>

      {/* Right Side - Sign In Section */}
      <div
        className={`w-1/2 h-screen flex flex-col items-center justify-center p-4 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <h1
          className={`text-4xl font-bold mb-8 text-center ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          DailyDash
        </h1>
        <button
          onClick={handleGoogleSignIn}
          className={`bg-white text-gray-700 py-3 px-4 rounded-lg border ${
            isDarkMode
              ? "border-gray-700 hover:bg-gray-700"
              : "border-gray-300 hover:bg-gray-50"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out flex items-center justify-center`}
        >
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
