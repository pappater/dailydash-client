import React, { useState, useEffect } from "react";
import useStore from "../store/store";
import { fetchWeatherByCoords, fetchWeatherByLocation } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GreetingProps {
  userName: string | undefined;
}

const Greeting: React.FC<GreetingProps> = ({ userName }) => {
  const { isDarkMode } = useStore();
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!manualInput) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                const weatherData = await fetchWeatherByCoords(
                  latitude,
                  longitude
                );
                setWeather(weatherData);
              },
              () => {
                setManualInput(true);
              }
            );
          } else {
            setManualInput(true);
          }
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [manualInput]);

  const handleManualSubmit = async () => {
    try {
      const weatherData = await fetchWeatherByLocation(location);
      setWeather(weatherData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeather(null);
    }
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const weatherDescription = weather?.weather[0].description || "Loading...";
  const temperature = weather?.main.temp ? `${weather.main.temp}°C` : "";
  const locationName = weather?.name ? `in ${weather.name}` : "";

  return (
    <div
      className={`px-1 rounded-lg ${
        isDarkMode
          ? "bg-neutral-900 text-neutral-200"
          : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-xl font-semibold">
        Hello,{" "}
        {userName
          ? userName.charAt(0).toUpperCase() + userName.slice(1)
          : "Guest"}
      </h2>
      <p className="mt-1 text-sm">
        Today is <span className="font-semibold">{formattedDate}</span>.
      </p>

      <div className="">
        {manualInput ? (
          <div className="flex flex-col items-center mb-4">
            <Input
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`mb-2 p-2 border rounded-md w-full ${
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-white"
                  : "border-gray-300 bg-white text-gray-800"
              }`}
            />
            <Button
              onClick={handleManualSubmit}
              className={`py-2 px-4 rounded-md w-full ${
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Get Weather
            </Button>
          </div>
        ) : (
          <div>
            {weather ? (
              <p
                className={`text-md ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                The weather is {weatherDescription} with a temperature of{" "}
                {temperature} {locationName}.
              </p>
            ) : (
              <p className="text-gray-500">Loading weather...</p>
            )}
          </div>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Greeting;
