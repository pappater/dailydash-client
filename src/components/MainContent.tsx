import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Greeting from "./Greeting";
import Notes from "./Notes";
import CalendarView from "./CalendarView";
import useStore from "../store/store";
import { fetchUserDataFromDB } from "../services/api";
import AddWidgetModal from "./AddWidgetModal"; // Import the AddWidgetModal component
import DailyBriefing from "./DailyBriefing";

const MainContent: React.FC = () => {
  const { user, widgets, removeWidget } = useStore();
  const [showModal, setShowModal] = useState(false);

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

        {/* Render Widgets */}
        <div className="widgets-container">
          {widgets.map((widget) => (
            <Card key={widget.id} className="widget-card">
              {widget.type === "calendar" && <CalendarView />}
              <button
                className="close-btn"
                onClick={() => removeWidget(widget.id)}
              >
                x
              </button>
              <button className="options-btn">⋮</button>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Section (25% width) */}
      <div className="flex-[0.25] min-w-[25%]">
        <Card>
          <CardHeader>
            {" "}
            <h2 className="text-xl font-semibold mb-4">Daily Briefing</h2>
          </CardHeader>
          <CardContent>
            <DailyBriefing />
          </CardContent>
        </Card>
      </div>

      {/* Add Widget Button */}
      <button className="add-widget-btn" onClick={() => setShowModal(true)}>
        Add Widget
      </button>

      {/* Add Widget Modal */}
      <AddWidgetModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default MainContent;
