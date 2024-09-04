import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Constants
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GOLD_API_KEY = import.meta.env.VITE_GOLD_API;

// Create an instance of axios
const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // To include cookies in requests
});

// Start NProgress before request is made
api.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

// Stop NProgress when the response is received
api.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

// Fetch weather data by coordinates
export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric", // Use 'imperial' for Fahrenheit
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error);
    throw error;
  }
};

// Fetch weather data by location name
export const fetchWeatherByLocation = async (location: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: location,
          appid: API_KEY,
          units: "metric", // Use 'imperial' for Fahrenheit
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather by location:", error);
    throw error;
  }
};

// Fetch user data from the auth endpoint
export const fetchUserData = async () => {
  try {
    const response = await api.get("/auth/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Fetch user-specific data from the database
export const fetchUserDataFromDB = async (userId: string) => {
  try {
    const response = await api.get(`/users/getData/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from DB:", error);
    throw error;
  }
};

// Save user-specific data to the database
export const saveUserDataToDB = async (userId: string, savedData: string) => {
  try {
    const response = await api.post("/users/saveData", {
      googleId: userId,
      savedData: savedData,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving data to DB:", error);
    throw error;
  }
};

// Fetch the gold rate in INR
export const fetchGoldRate = async (): Promise<number> => {
  try {
    const response = await axios.get("https://www.goldapi.io/api/XAU/INR", {
      headers: {
        "x-access-token": GOLD_API_KEY,
        "Content-Type": "application/json",
      },
    });
    // Assuming the API returns data in a format like { price: number }
    return response.data; // Adjust based on the actual response structure
  } catch (error) {
    console.error("Error fetching gold rate:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

// Fetch widget configuration from the server
export const fetchWidgetConfig = async (googleId: string) => {
  try {
    const response = await api.get(`/users/widgetConfig/${googleId}`);
    console.log("Fetched widget config:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching widget configuration:", error);
    throw error;
  }
};

// Save widget configuration to the server
export const saveWidgetConfig = async (googleId: string, widgetConfig: any) => {
  try {
    const response = await api.post("/users/widgetConfig", {
      googleId,
      widgetConfig,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving widget configuration:", error);
    throw error;
  }
};

export default api;
