import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Greeting from "../components/notes/Greeting";
import Notes from "../components/notes/Notes";
import CalendarView from "../components/calendar/CalendarView";
import useStore from "../store/store";
import AddWidgetModal from "../components/addwidget/AddWidget";
import StockComponent from "@/components/stocks/StockComponent";
import RandomQuote from "@/components/randomquote/RandomQuote";
import RandomLocationMap from "@/components/randomlocation/RandomLocationMap";

const MainContent: React.FC = () => {
  const {
    user,
    showModal,
    setShowModal,
    isDarkMode,
    widgets,
  } = useStore();

  if (!user) return null;

  return (
    <div
      className={`flex flex-wrap md:flex-nowrap gap-6 p-6 min-h-screen ${
        isDarkMode
          ? "bg-neutral-900 text-white"
          : "bg-neutral-100 text-gray-900"
      }`}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className={`mb-4 w-full md:w-auto ${
              isDarkMode
                ? "bg-neutral-900 text-white border-neutral-500"
                : "bg-white text-gray-900"
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
              className={` w-full md:w-auto ${
                isDarkMode
                  ? "bg-neutral-900 border-neutral-500  text-white"
                  : "bg-white text-gray-900"
              }`}
              style={{ minHeight: "200px" }}
            >
              {widget.type === "calendar" && (
                <CalendarView googleId={user?.id ?? ""} />
              )}
              {widget.type === "stocks" && <StockComponent />}
              {widget.type === "random_location" && <RandomLocationMap />}
              {widget.type === "quotes" && <RandomQuote />}
            </Card>
          ))}
        </div>

        {widgets.length <= 1 && (
          <button
            onClick={() => setShowModal(true)}
            className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
              isDarkMode
                ? "bg-neutral-800 text-white hover:bg-neutral-600"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <span className="text-xl">+</span> Add Widget
          </button>
        )}
      </div>

      <AddWidgetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        userId={user?.id ?? ""}
      />
    </div>
  );
};

export default MainContent;
