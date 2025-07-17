import { useEffect, useState } from "react";
import axios from "axios";
import background from "../assets/Backgrounds/Login-signup-bg.png";

const Uptime = () => {
  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/health")
      .then((res) => setMonitors(res.data.monitors))
      .catch((err) => console.error("Failed to fetch health:", err));
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case 2:
        return "Up ✅";
      case 9:
        return "Paused ⏸️";
      case 0:
        return "Down ❌";
      default:
        return "Unknown ❓";
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center">
      <div
        className="w-full h-full bg-contain bg-center p-8"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="max-w-4xl mx-auto mt-6 p-10 bg-[#94c864] shadow-lg rounded-2xl text-center">
          <h2 className="text-4xl font-bold text-black mb-6">Uptime Monitor</h2>
          {monitors.length > 0 ? (
            <div className="space-y-6">
              {monitors.map((monitor, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 text-left"
                >
                  {/* <h3 className="text-2xl font-bold text-black mb-2">
                    {monitor.name.split("/")[0]}
                  </h3> */}
                  <div className="text-md text-gray-800 space-y-1">
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`font-bold ${
                          monitor.status === 2
                            ? "text-green-600"
                            : monitor.status === 9
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {getStatusText(monitor.status)}
                      </span>
                    </p>
                    <p>
                      <strong>Uptime:</strong> {monitor.uptime}%
                    </p>
                    <p>
                      <strong>Type:</strong> {monitor.type}
                    </p>
                    <p>
                      <strong>Interval:</strong> {monitor.interval}
                    </p>
                    <p>
                      <strong>Created At:</strong> {monitor.createdAt}
                    </p>
                    <p>
                      <strong>Response Time:</strong>{" "}
                      {monitor.responseTime || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black text-lg">Fetching monitor data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Uptime;
