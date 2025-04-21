import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard({ name, message, streak, leaderboard, events }) {
  const [weather, setweather] = useState([]);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();
          // console.log('Weather data:', data);
          setweather(data);
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
      },
    );
  }, []);

  return (
    <div className="p-4 m-4 w-5xl h-60 bg-gray-200 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start gap-4">
      {/* Profile Section */}
      <div className="flex items-center gap-4 w-full md:w-1/2">
        {currentUser ? (
          <img
            src={currentUser.profilePic}
            alt="Profile"
            className="w-16 h-16 rounded-full border-5 border-gradient-to-r from-[#59B700] via-[#7a8a6b] to-[#838080]"
          />
        ) : (
          <img
            src="https://res.cloudinary.com/dh4zgual6/image/upload/v1743779736/user_1_vy5jcs.png"
            alt="Profile"
            className="w-16 h-16 rounded-full border-5 border-gradient-to-r from-[#59B700] via-[#7a8a6b] to-[#838080]"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">
            Good Morning, {currentUser ? currentUser.name : "unknown user"}
            {name}!
          </h1>
          <p className="text-sm text-gray-600">{message}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg">☀️</span>
            <h3 className="text-sm">
              {weather?.main
                ? `${weather.main.temp}°C, ${weather.weather[0].description}`
                : "Loading weather..."}
            </h3>
          </div>
        </div>
      </div>

      {/* Streak & Leaderboard */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <p>
          <strong>Streak:</strong> {streak} Days
        </p>
        <p>
          <strong>Leaderboard:</strong> {leaderboard} India
        </p>
        <div className="flex gap-4 mt-20">
          <button
            onClick={() => navigate("/submit")}
            className="bg-gradient-to-br from-[#59B700] via-[#6f964a] to-[#838080] hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Upload
          </button>
          <button className="border border-gray-500 text-gray-500 px-4 py-2 rounded-lg">
            Submissions
          </button>
        </div>
      </div>

      {/* Events */}
      <div className="bg-gradient-to-br from-[#59B700] via-[#6f964a] to-[#838080] p-4 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="font-bold underline">Events</h2>
        <p className="text-sm text-gray-700">
          {events}
          {"Nothing planned today"}
        </p>
      </div>

      {/* Impact */}
      <div className="bg-gradient-to-br from-[#59B700] via-[#6f964a] to-[#838080] p-4 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="font-bold underline">Impact</h2>
        <p>📸 1231 submissions</p>
        <p>🔊 10 Submissions</p>
        <button className="bg-black text-white px-4 py-2 rounded-lg mt-2">
          See more
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
