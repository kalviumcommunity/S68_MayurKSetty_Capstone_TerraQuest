import React, { useState } from "react";
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
import Submissions from "./Pages/Submissions";
import PrivateRoute from "./Components/Private/PrivateRoute";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Mainpage from "./Pages/Mainpage";
import Contribute from "./Pages/Contribute";
import Uptime from "./Pages/Uptime";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true); // fixes the reload issue

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });
        dispatch(login(res.data.user));
      } catch (err) {
        console.log("User not logged in or token invalid.", err);
      } finally {
        setCheckingAuth(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <Explore />
            </PrivateRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <PrivateRoute>
              <Learn />
            </PrivateRoute>
          }
        />
        <Route
          path="/track"
          element={
            <PrivateRoute>
              <Track />
            </PrivateRoute>
          }
        />
        <Route
          path="/submit"
          element={
            <PrivateRoute>
              <Submit />
            </PrivateRoute>
          }
        />
        <Route path="/community" element={<Community />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/submissions"
          element={
            <PrivateRoute>
              <Submissions />
            </PrivateRoute>
          }
        />
        <Route path="/pay" element={<Contribute />} />
        <Route path="/uptime" element={<Uptime />} />
        <Route path="*" element={<PageNotFound />} />{" "}
        {/* if page does not exist! */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
