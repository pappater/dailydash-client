import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";

const WeatherReport: React.FC = () => {
  interface WeatherData {
    Temperature: { Metric: { Value: number } };
    WeatherText: string;
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>("");
  const [manualEntry, setManualEntry] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const API_KEY = "Q7GXYyGZp4i4bAtwTFI1ADu2CdtXF0oE"; // Replace with your AccuWeather API key

  const getLocationKey = async (city: string): Promise<string> => {
    try {
      const response = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/search`,
        {
          params: {
            q: city,
            apikey: API_KEY,
          },
        }
      );
      console.log("Location Key Response:", response.data); // Log response data
      const key = response.data[0]?.Key;
      if (!key) {
        throw new Error("No location key found for the given city.");
      }
      return key;
    } catch (err) {
      console.error("Error fetching location key:", err);
      throw new Error("Failed to fetch location key.");
    }
  };

  const getLocationKeyByCoordinates = async (
    lat: number,
    lon: number
  ): Promise<string> => {
    try {
      const response = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/geoposition/search`,
        {
          params: {
            q: `${lat},${lon}`,
            apikey: API_KEY,
          },
        }
      );
      console.log("Location Key by Coordinates Response:", response.data); // Log response data
      const key = response.data.Key;
      if (!key) {
        throw new Error("No location key found for the given coordinates.");
      }
      return key;
    } catch (err) {
      console.error("Error fetching location key by coordinates:", err);
      throw new Error("Failed to fetch location key by coordinates.");
    }
  };

  const fetchWeather = async (locationKey: string): Promise<void> => {
    try {
      const response = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
        {
          params: {
            apikey: API_KEY,
          },
        }
      );
      console.log("Weather Data Response:", response.data); // Log response data
      setWeather(response.data[0]);
      setError("");
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const locationKey = await getLocationKeyByCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          fetchWeather(locationKey);
        },
        () => setManualEntry(true) // Enable manual entry if location access is denied
      );
    } else {
      setManualEntry(true); // Enable manual entry if geolocation is not supported
    }
  }, []);

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const locationKey = await getLocationKey(location);
      fetchWeather(locationKey);
    } catch (err) {
      setError("Failed to fetch weather data.");
    }
  };

  return (
    <div>
      {manualEntry ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={handleLocationChange}
          />
          <button type="submit">Get Weather</button>
        </form>
      ) : (
        weather && (
          <div>
            <h2>Weather Report</h2>
            <p>{weather.WeatherText}</p>
            <p>{weather.Temperature.Metric.Value}°C</p>
          </div>
        )
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherReport;
