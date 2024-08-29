import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

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

export default api;
