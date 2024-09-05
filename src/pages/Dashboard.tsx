import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { fetchUserData, fetchUserDataFromDB } from "../services/api";

const Dashboard: React.FC = () => {
  const { setUser, user, setDashboardData, isDarkMode, setDarkMode } =
    useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserData();
        if (userData.message === "Not authenticated") {
          window.location.href = "/";
        } else {
          setUser(userData);

          // Fetch and set dashboard data
          if (userData.id) {
            try {
              const dashboardData = await fetchUserDataFromDB(userData.id);
              setDashboardData(dashboardData);
              setDarkMode(dashboardData?.darkMode);
            } catch (error) {
              console.error("Failed to fetch dashboard data:", error);
            }
          }

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        window.location.href = "/";
      }
    };

    if (loading) {
      fetchUser();
    }
  }, [loading, setUser, setDashboardData, setDarkMode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flex flex-col h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Sticky Header */}
      <Header />

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
