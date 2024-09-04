import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Greeting from "./Greeting";
import Notes from "./Notes";
import CalendarView from "./CalendarView";
import useStore from "../store/store";
import { fetchUserDataFromDB, fetchWidgetConfig } from "../services/api";
import AddWidgetModal from "./AddWidget";
import DailyBriefing from "./DailyBriefing";

const MainContent: React.FC = () => {
  const { user, widgets, addWidget, removeWidget, setWidgets } = useStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        try {
          const userData = await fetchUserDataFromDB(user.id);
          const widgetConfig = await fetchWidgetConfig(user.id);

          if (widgetConfig.widgets) {
            setWidgets(widgetConfig.widgets);
          }
        } catch (error) {
          console.error("Failed to fetch data from DB", error);
        }
      };
      fetchData();
    }
  }, [user?.id, setWidgets]);

  return (
    <div className="flex flex-wrap gap-[15px] p-4">
      <div className="flex-1 min-w-[70%]">
        <Card className="mb-4">
          <CardHeader>
            <Greeting userName={user?.displayName} />
          </CardHeader>
          <CardContent>
            <Notes userId={user?.id ?? ""} />
          </CardContent>
        </Card>

        <div className="widgets-container">
          {widgets.map((widget) => (
            <Card key={widget.id} className="widget-card">
              {widget.type === "calendar" ? (
                <CalendarView googleId={user?.id ?? ""} />
              ) : (
                widget.type
              )}
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

      <div className="flex-[0.25] min-w-[25%]">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold mb-4">Daily Briefing</h2>
          </CardHeader>
          <CardContent>
            <DailyBriefing />
          </CardContent>
        </Card>
      </div>

      <button className="add-widget-btn" onClick={() => setShowModal(true)}>
        Manage Widget
      </button>

      <AddWidgetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        userId={user?.id ?? ""}
      />
    </div>
  );
};

export default MainContent;
