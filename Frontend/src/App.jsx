import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/userSlice";
import axios from "axios";

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
import Footer from "./Components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });
        console.log(res);

        dispatch(login(res.data.user));
      } catch (err) {
        console.log("User not logged in or token invalid.", err);
      }
    };

    fetchUser();
  }, [dispatch]);

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
      <Footer />
    </>
  );
}

export default App;
