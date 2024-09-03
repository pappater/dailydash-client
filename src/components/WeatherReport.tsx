// src/components/WeatherComponent.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchWeatherByCoords, fetchWeatherByLocation } from "@/services/api";

const WeatherReport: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState<boolean>(false);

  useEffect(() => {
    if (!manualInput) {
      // Attempt to get the user's geo-location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const weatherData = await fetchWeatherByCoords(
                latitude,
                longitude
              );
              setWeather(weatherData);
              setError(null);
            } catch (err) {
              setError("Failed to fetch weather data");
              setWeather(null);
            }
          },
          (err) => {
            console.error("Error getting location:", err);
            setManualInput(true); // Show manual input if location fetch fails
          }
        );
      } else {
        setManualInput(true); // Show manual input if geolocation is not supported
      }
    }
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

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {manualInput ? (
        <div>
          <Input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleManualSubmit}>Get Weather</Button>
        </div>
      ) : (
        <div>
          {weather ? (
            <div>
              <h2 className="text-xl font-bold">Weather</h2>
              <p>{weather.weather[0].description}</p>
              <p>{weather.main.temp}°C</p>
              <p>{weather.name}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default WeatherReport;
