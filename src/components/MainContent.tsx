import React, { useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Greeting from "./Greeting";
import Notes from "./Notes";
import CalendarView from "./calendar/CalendarView";
import useStore from "../store/store";
import { fetchUserDataFromDB, fetchWidgetConfig } from "../services/api";
import AddWidgetModal from "./AddWidget";

const MainContent: React.FC = () => {
  const { user, widgets, setWidgets, showModal, setShowModal, isDarkMode } =
    useStore();

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
    <div
      className={`flex flex-wrap md:flex-nowrap gap-6 p-6 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className={`mb-4 h-[500px] w-full md:w-auto ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <CardHeader>
              <Greeting userName={user?.displayName} />
            </CardHeader>
            <CardContent>
              <Notes userId={user?.id ?? ""} />
            </CardContent>
          </Card>

          {widgets.map((widget) => (
            <Card
              key={widget.id}
              className={`h-[500px] w-full md:w-auto widget-card ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              {widget.type === "calendar" ? (
                <CalendarView googleId={user?.id ?? ""} />
              ) : (
                widget.type
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for managing widgets */}
      <AddWidgetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        userId={user?.id ?? ""}
      />
    </div>
  );
};

export default MainContent;
