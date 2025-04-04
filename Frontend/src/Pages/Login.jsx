import React, { useState } from "react";
import axios from "axios";
import background from "../assets/Backgrounds/Login-signup-bg.png";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      alert("All the fields are required!");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/login", formdata, {
        withCredentials: true,
      });
      console.log("Data sent successfully using axios for login!", formdata);
      setformdata({ email: "", password: "" });
    } catch (err) {
      console.log("There was an error while sending login from frontend!", err);
    }
  };

  //Google auth
  const handleSuccess = async (response) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/google/callback",
        {
          token: response.credential, // Google OAuth Token
        },
      );

      console.log("Login Successful:", res.data);
      // localStorage.setItem("token", res.data.token);
      document.cookie = `token=${res.data.token}`; // Store token for authentication
    } catch (error) {
      console.error("Google OAuth Error:", error);
    }
  };

  const handleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <div className="h-screen mt-0.8 bg-gray-100 flex flex-col items-center">
      {/* Background Pattern */}
      <div
        className="w-full h-full bg-contain bg-center p-8"
        style={{ backgroundImage: `url(${background})` }}
      >
        {" "}
        {/* still need to add the background image */}
        <div className="max-w-lg mx-auto mt-20 p-10 bg-[#94c864] shadow-lg rounded-2xl text-center">
          <h1 className="text-5xl font-bold text-black mb-6">Login</h1>
          <form onSubmit={handlesubmit} className="space-y-4">
            <div className="text-left">
              <label className="text-black text-2xl font-bold">Email</label>
              <input
                type="text"
                value={formdata.email}
                onChange={(e) =>
                  setformdata({ ...formdata, email: e.target.value })
                }
                className="w-full h-18 p-3 mt-1 border bg-white border-black rounded-4xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="text-left">
              <label className="text-black text-2xl font-bold">Password</label>
              <input
                type={visible ? "text" : "password"}
                value={formdata.password}
                onChange={(e) =>
                  setformdata({ ...formdata, password: e.target.value })
                }
                className="w-full h-18 bg-white p-3 mt-1 border border-black rounded-4xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                className="absolute top-126 right-140"
              >
                {visible ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <div className="flex items-center text-left">
              <input type="checkbox" className="mr-2 w-5 h-5" />
              <label className="text-black">Keep me signed in</label>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition duration-300"
            >
              Login
            </button>
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
