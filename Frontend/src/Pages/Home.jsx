import React from "react";
import Dashboard from "../Components/HomeComponents/Dashboard";
import Notification from "../Components/HomeComponents/Notification";
import Schedule from "../Components/HomeComponents/Schedule";

function Home() {
  return (
    // <div className="flex items-center justify-center h-screen bg-gray-100">
    //   <div className="text-center p-8 bg-white shadow-lg rounded-xl">
    //     <h1 className="text-4xl font-bold text-gray-800">Welcome Home</h1>
    //     <p className="mt-2 text-gray-600">This is my home page.</p>
    //     <button className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-950 transition">
    //       Get Started
    //     </button>
    //   </div>
    // </div>
    <>
      <div className="h-screen w-screen">
        <Dashboard />
        <Notification />
        <Schedule />
      </div>
    </>
  );
}

export default Home;
