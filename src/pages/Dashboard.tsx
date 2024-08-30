import { useEffect } from "react";
import useStore from "../store/store";
import {
  fetchUserData,
  fetchUserDataFromDB,
  saveUserDataToDB,
} from "../services/api";
import WeatherReport from "../components/WetherReport";

function Dashboard() {
  const { user, text, setUser, setText } = useStore();

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchUserData();
        if (data.message !== "Not authenticated") {
          setUser(data);
        } else {
          // Redirect to login if not authenticated
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [setUser]);

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        try {
          const data = await fetchUserDataFromDB(user.id);
          setText(data.savedData);
        } catch (error) {
          console.error("Failed to fetch data from DB");
        }
      };
      fetchData();
    }
  }, [user?.id, setText]);

  const saveDataToDB = async () => {
    try {
      await saveUserDataToDB(user?.id, text);
    } catch (error) {
      console.error("Failed to save data to DB");
    }
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {user ? (
        <div>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.emails[0].value}</p>

          <input
            type="text"
            placeholder="Enter some text"
            value={text}
            onChange={handleInputChange}
          />
          <WeatherReport />
          <button onClick={saveDataToDB}>Save Data</button>
          <button
            onClick={() =>
              (window.location.href = "http://localhost:5001/api/auth/logout")
            }
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
