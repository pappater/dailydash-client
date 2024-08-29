import React from "react";
import useStore from "../store/store";

const Login: React.FC = () => {
  const { isDarkMode } = useStore();

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Left Side - Image */}
      <div
        className={`w-1/2 bg-cover bg-center ${
          isDarkMode ? "bg-gray-800" : "bg-gray-200"
        }`}
        style={{ backgroundImage: 'url("/path-to-your-image.jpg")' }}
      >
        {/* You can add more content here if needed */}
      </div>

      {/* Right Side - Sign In Section */}
      <div
        className={`w-1/2 flex flex-col items-center justify-center p-4 ${
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
        {/* <button
          onClick={toggleDarkMode}
          className="mt-4 text-sm text-gray-600 dark:text-gray-300"
        >
          Toggle Dark Mode
        </button> */}
      </div>
    </div>
  );
};

export default Login;
