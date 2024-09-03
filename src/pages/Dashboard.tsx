import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { fetchUserData } from "../services/api";

const Dashboard: React.FC = () => {
  const { setUser, user } = useStore();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchUserData();
        console.log("data", data);

        if (data.message === "Not authenticated") {
          // Redirect to login if not authenticated
          window.location.href = "/";
        } else {
          setUser(data);
          setLoading(false); // Stop loading once user is authenticated
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        window.location.href = "/"; // Redirect in case of an error
      }
    };

    if (loading) {
      fetchUser();
    }
  }, [loading, setUser]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state until authentication is verified
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Header />
      <MainContent />
    </div>
  );
};

export default Dashboard;
