import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import useStore from "./store/store";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons from react-icons
import DarkModeToggle from "./components/darkMode/DarkModeToggle";

const App: React.FC = () => {
  const { user, setUser, isDarkMode, setDarkMode } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);
  }, [setDarkMode]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          credentials: "include",
        });
        const data = await response.json();

        if (data.message !== "Not authenticated") {
          setUser(data);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthStatus();
  }, [setUser, navigate]);
  return (
    <div
      className={`App ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen transition-colors duration-300`}
    >
      {!user && <Login />}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {/* <FaSun
          onClick={() => !isDarkMode && toggleDarkMode()}
          className={`text-yellow-500 cursor-pointer transition-opacity duration-300 ${
            isDarkMode ? "opacity-50" : "opacity-100"
          }`}
        /> */}
        {/* <button
          onClick={toggleDarkMode}
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
        </button> */}
        <DarkModeToggle />
        {/* <FaMoon
          onClick={() => isDarkMode && toggleDarkMode()}
          className={`text-yellow-500 cursor-pointer transition-opacity duration-300 ${
            isDarkMode ? "opacity-100" : "opacity-50"
          }`}
        /> */}
      </div>
    </div>
  );
};

export default App;
