import React, { useState, useEffect } from "react";
import useStore from "@/store/store"; // Import your store or context for theme
import Map from "./Map";
import { getRandomLocation } from "@/utils/helpers";

const RandomLocationMap = () => {
  const { isDarkMode } = useStore(); // Access dark mode from store or context
  const [radius, setRadius] = useState<number>(5);
  const [customRadius, setCustomRadius] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [randomLocation, setRandomLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false); // Toggle for optional sections

  // Get user location from browser
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Generate random location when userLocation and radius are set
  useEffect(() => {
    if (userLocation && (customRadius || radius)) {
      const randomLoc = getRandomLocation(
        userLocation.lat,
        userLocation.lng,
        customRadius || radius
      );
      setRandomLocation(randomLoc);
    }
  }, [userLocation, radius, customRadius]);

  return (
    <div
      className={`w-full h-[500px] p-6 rounded-xl shadow-lg ${
        isDarkMode ? "bg-neutral-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Random Location Map</h2>

      <div className="mb-4">
        <label htmlFor="radius" className="block mb-2 text-lg font-medium">
          Select Radius (km)
        </label>
        <select
          id="radius"
          className={`block w-full p-2.5 border rounded-lg ${
            isDarkMode ? "bg-neutral-800 text-white" : "bg-white text-black"
          }`}
          value={radius}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "custom") {
              setCustomRadius(5); // Default custom radius
            } else {
              setRadius(parseInt(value));
              setCustomRadius(null); // Reset custom radius when a predefined value is selected
            }
          }}
        >
          {Array.from({ length: 100 }, (_, i) => (i + 1) * 5).map((r) => (
            <option key={r} value={r}>
              {r} km
            </option>
          ))}
          <option value="custom">Custom Radius</option>
        </select>
        {customRadius !== null && (
          <input
            type="number"
            placeholder="Enter custom radius (km)"
            value={customRadius || ""}
            onChange={(e) => setCustomRadius(Number(e.target.value))}
            className={`block w-full mt-2 p-2.5 border rounded-lg ${
              isDarkMode ? "bg-neutral-800 text-white" : "bg-white text-black"
            }`}
          />
        )}
      </div>

      <button
        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        className="text-blue-500 underline mb-4"
      >
        {showAdvancedOptions
          ? "Hide Advanced Options"
          : "Show Advanced Options"}
      </button>

      {showAdvancedOptions && (
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2 text-lg font-medium">
            Enter Location (optional)
          </label>
          <input
            id="location"
            type="text"
            placeholder="Latitude, Longitude"
            className={`block w-full p-2.5 border rounded-lg ${
              isDarkMode ? "bg-neutral-800 text-white" : "bg-white text-black"
            }`}
            onChange={(e) => {
              const [lat, lng] = e.target.value.split(",").map(Number);
              setUserLocation({ lat, lng });
            }}
          />
        </div>
      )}

      {randomLocation && showAdvancedOptions && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Random Location:</h3>
          <p>
            Latitude: {randomLocation.lat.toFixed(6)}, Longitude:{" "}
            {randomLocation.lng.toFixed(6)}
          </p>
        </div>
      )}

      <div className="w-full h-[250px] mt-4 ">
        <Map lat={randomLocation?.lat || 0} lng={randomLocation?.lng || 0} />
      </div>
    </div>
  );
};

export default RandomLocationMap;
