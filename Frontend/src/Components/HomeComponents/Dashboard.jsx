import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({
  img,
  name,
  message,
  weather,
  streak,
  leaderboard,
  events,
}) 
{
  const navigate = useNavigate();

  return (
    <div className="p-4 m-4 w-5xl h-60 bg-gray-200 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start gap-4">
      {/* Profile Section */}
      <div className="flex items-center gap-4 w-full md:w-1/2">
        <img
          src={img}
          alt="Profile"
          className="w-16 h-16 rounded-full border-5 border-gradient-to-r from-[#59B700] via-[#7a8a6b] to-[#838080]"
        />
        <div>
          <h1 className="text-2xl font-bold">
            Good Morning, {"Mayur"}
            {name}!
          </h1>
          <p className="text-sm text-gray-600">{message}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg">☀️</span>
            <h3 className="text-sm">
              {weather}
              {"31 degrees celcius"}
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
          <button onClick={()=>navigate('/submit')} className="bg-gradient-to-br from-[#59B700] via-[#6f964a] to-[#838080] hover:bg-green-600 text-white px-4 py-2 rounded-lg">
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
