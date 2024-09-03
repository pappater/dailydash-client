import React, { useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Greeting from "./Greeting";
import Notes from "./Notes";
import WeatherReport from "./WeatherReport";
import useStore from "../store/store";
import { fetchUserDataFromDB } from "../services/api";

const MainContent: React.FC = () => {
  const { user } = useStore();

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        try {
          const data = await fetchUserDataFromDB(user.id);
          // Set global state with fetched data if needed
        } catch (error) {
          console.error("Failed to fetch data from DB");
        }
      };
      fetchData();
    }
  }, [user?.id]);

  return (
    <div className="flex flex-wrap gap-[15px] p-4">
      {/* Left Section (75% width) */}
      <div className="flex-1 min-w-[70%]">
        <Card className="mb-4">
          <CardHeader>
            <Greeting userName={user?.displayName} />
          </CardHeader>
          <CardContent>
            <Notes userId={user?.id ?? ""} />
          </CardContent>
        </Card>
      </div>

      {/* Right Section (25% width) */}
      <div className="flex-[0.25] min-w-[25%]">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Current Weather</h2>
          </CardHeader>
          <CardContent>
            <WeatherReport />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainContent;
