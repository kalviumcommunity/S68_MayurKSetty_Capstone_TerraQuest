import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
