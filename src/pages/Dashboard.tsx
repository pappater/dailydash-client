import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { fetchUserData } from "../services/api";

const Dashboard: React.FC = () => {
  const { setUser, user, isDarkMode, setDarkMode } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchUserData();
        console.log("data", data);

        if (data.message === "Not authenticated") {
          window.location.href = "/";
        } else {
          setUser(data);
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
  }, [loading, setUser]);

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
