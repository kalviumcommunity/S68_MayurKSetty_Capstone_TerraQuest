import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import Learn from "./Pages/Learn";
import Explore from "./Pages/Explore";
import Track from "./Pages/Track";
import Submit from "./Pages/Submit";
import Community from "./Pages/Community";
import Profile from "./Pages/Profile";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/track" element={<Track />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />{" "}
        {/* if page does not exist! */}
      </Routes>
    </>
  );
}

export default App;
