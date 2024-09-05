// src/components/TabsComponent.tsx

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Adjust import if necessary
import useStore from "@/store/store";
import LineChartComponent from "./LineChart"; // Import the LineChartComponent

const tabNames = ["Tab 1", "Tab 2", "Tab 3"]; // Dummy tab names

const StockTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Tab 1");
  const { isDarkMode } = useStore();

  // Dummy chart data
  const chartData = [
    { x: 1, y: 65 },
    { x: 2, y: 59 },
    { x: 3, y: 80 },
    { x: 4, y: 81 },
    { x: 5, y: 56 },
    { x: 6, y: 55 },
    { x: 7, y: 40 },
  ];

  return (
    <div
      className={`p-4 rounded-2xl ${
        isDarkMode ? "bg-neutral-900 text-white" : "bg-neutral-100 text-black"
      }`}
    >
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList
          className={`flex justify-start space-x-2 mb-4 ${
            isDarkMode ? "bg-neutral-900" : "bg-neutral-200"
          }`}
        >
          {tabNames.map((tabName) => (
            <TabsTrigger
              key={tabName}
              value={tabName}
              className={`p-2 cursor-pointer ${
                selectedTab === tabName
                  ? "bg-blue-500 text-white"
                  : isDarkMode
                  ? "bg-neutral-900 text-white hover:bg-neutral-500"
                  : "bg-neutral-300 text-black hover:bg-neutral-400"
              }`}
            >
              {tabName}
            </TabsTrigger>
          ))}
        </TabsList>
        <div
          className={`p-4 border rounded ${
            isDarkMode
              ? "bg-neutral-800 text-white"
              : "bg-neutral-50 text-black"
          }`}
        >
          {tabNames.map((tabName) => (
            <TabsContent key={tabName} value={tabName}>
              <p>Content for {tabName}</p>
              <LineChartComponent data={chartData} />{" "}
              {/* Render the LineChartComponent */}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default StockTabs;
