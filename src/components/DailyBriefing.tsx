import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  fetchWeatherByCoords,
  fetchWeatherByLocation,
  fetchGoldRate,
} from "@/services/api";

const DailyBriefing: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [goldRate, setGoldRate] = useState<{
    price_gram_22k: number;
    price_gram_24k: number;
  } | null>(null);
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
              (err) => {
                console.error("Error getting location:", err);
                setManualInput(true);
              }
            );
          } else {
            setManualInput(true);
          }
        }
        const goldData = await fetchGoldRate();
        setGoldRate(goldData);
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

  const goldPrice22k = goldRate?.price_gram_22k
    ? `₹${goldRate.price_gram_22k.toLocaleString("en-IN")}`
    : "";
  const goldPrice24k = goldRate?.price_gram_24k
    ? `₹${goldRate.price_gram_24k.toLocaleString("en-IN")}`
    : "";

  return (
    <div className=" bg-white">
      {manualInput ? (
        <div className="flex flex-col items-center mb-4">
          <Input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <Button
            onClick={handleManualSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Get Weather
          </Button>
        </div>
      ) : (
        <div className="mb-4">
          {weather ? (
            <p className="text-md text-gray-800">
              Today is <span className="font-semibold ">{formattedDate}</span>.
              The weather is {weatherDescription} with a temperature of{" "}
              {temperature} {locationName}.
            </p>
          ) : (
            <p className="text-gray-500">Loading weather...</p>
          )}
        </div>
      )}
      <div className="mb-4">
        {goldRate ? (
          <p className="text-md text-gray-800">
            The gold price today is{" "}
            <span className="font-semibold">₹{goldPrice22k}</span> for 22k and{" "}
            <span className="font-semibold">₹{goldPrice24k}</span> for 24k.
          </p>
        ) : (
          <p className="text-gray-500">Loading gold rate...</p>
        )}
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default DailyBriefing;
