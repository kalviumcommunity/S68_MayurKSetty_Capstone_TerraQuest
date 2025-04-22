import React from "react";
import Dashboard from "../Components/HomeComponents/Dashboard";
import Notification from "../Components/HomeComponents/Notification";
import Schedule from "../Components/HomeComponents/Schedule";

function Home() {
  return (
    <>
      <Dashboard />
      <Notification />
      <Schedule />
    </>
  );
}

export default Home;
