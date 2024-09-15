import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useStore from "@/store/store";

// Define the structure of news data
interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

interface NewsTabsProps {
  generalNews?: NewsArticle[];
  techNews?: NewsArticle[];
  businessNews?: NewsArticle[];
}

const tabNames = ["General", "Business", "Technology"];

const NewsTabs: React.FC<NewsTabsProps> = ({
  generalNews,
  techNews,
  businessNews,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>("General");
  const { isDarkMode } = useStore();

  const renderNewsContent = (newsData?: NewsArticle[]) => {
    return (
      <ul>
        {newsData?.map((newsItem) => (
          <li key={newsItem.title} className="mb-2">
            <a
              href={newsItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {newsItem.title}
            </a>
            <p>{newsItem.description}</p>
          </li>
        ))}
      </ul>
    );
  };

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
          {selectedTab === "General" && renderNewsContent(generalNews)}
          {selectedTab === "Business" && renderNewsContent(businessNews)}
          {selectedTab === "Technology" && renderNewsContent(techNews)}
        </div>
      </Tabs>
    </div>
  );
};

export default NewsTabs;
