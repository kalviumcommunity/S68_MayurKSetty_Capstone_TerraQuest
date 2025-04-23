import React, { useState } from "react";
import axios from "axios";
import background from "../assets/Backgrounds/Login-signup-bg.png";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      !formdata.name ||
      !formdata.email ||
      !formdata.password ||
      !formdata.confirmPassword
    ) {
      alert("All the fields are required!");
      return;
    }
    if (formdata.password === formdata.confirmPassword) {
      const tosend = {
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
      };
      try {
        await axios.post("http://localhost:3000/api/signup", tosend);
        console.log("Data sent successfully using axios for signup!");
        setformdata({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } catch (err) {
        console.log(
          "There was an error while sending signup from frontend!",
          err,
        );
      }
    } else {
      console.log("The passwords don't match");
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
      localStorage.setItem("token", res.data.token); // Store token for authentication
    } catch (error) {
      console.error("Google OAuth Error:", error);
    }
  };

  const handleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center">
      <div
        className="w-full h-full bg-contain bg-center p-8"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="max-w-180 mx-auto mt-4 p-10 bg-[#94c864] shadow-lg rounded-2xl text-center">
          <h1 className="text-4xl font-bold text-black">Signup</h1>
          <form onSubmit={handlesubmit} className="space-y-4">
            <div className="text-left">
              <label className="text-black text-xl font-bold">Name</label>
              <input
                type="text"
                value={formdata.name}
                onChange={(e) =>
                  setformdata({ ...formdata, name: e.target.value })
                }
                className="w-full h-15 bg-white p-3 mt-1 border border-black rounded-4xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="text-left">
              <label className="text-black text-xl font-bold">Email</label>
              <input
                type="email"
                value={formdata.email}
                onChange={(e) =>
                  setformdata({ ...formdata, email: e.target.value })
                }
                className="w-full h-15 bg-white p-3 mt-1 border border-black rounded-4xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="text-left">
              <label className="text-black text-xl font-bold">Password</label>
              <input
                type={visible ? "text" : "password"}
                value={formdata.password}
                onChange={(e) =>
                  setformdata({ ...formdata, password: e.target.value })
                }
                className="w-full h-15 bg-white p-3 mt-1 border border-black rounded-4xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                className="absolute top-123 right-115"
              >
                {visible ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <div className="text-left">
              <label className="text-black text-xl font-bold">
                Confirm Password
              </label>
              <input
                type={visible ? "text" : "password"}
                value={formdata.confirmPassword}
                onChange={(e) =>
                  setformdata({ ...formdata, confirmPassword: e.target.value })
                }
                className="w-full h-15 bg-white p-3 mt-1 border border-black rounded-4xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                className="absolute top-150 right-115"
              >
                {visible ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition duration-300"
            >
              Signup
            </button>
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            <p>
              Already have an account?{" "}
              <a className="text-blue-800" href="/login">
                login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
