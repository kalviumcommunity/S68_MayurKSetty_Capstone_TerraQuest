import React from "react";
import background from "../assets/Backgrounds/Login-signup-bg.png";
import band from "../assets/Backgrounds/pagenotfound-bg.png";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="w-screen h-screen bg-contain bg-center p-8 flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="max-w-lg max-h-lg mx-auto p-10 bg-[#373837] shadow-lg rounded-2xl text-center ">
          <img
            className="w-2xl h-auto relative top-0 mb-4"
            src={band}
            alt="Page not Found!"
          />
          <p className="text-white text-xl font">
            The page you are trying to find doesn't exists!
          </p>
          <button
            className=" mt-10 bg-gradient-to-br from-[#59B700] via-[#6f964a] to-[#838080] hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/")}
          >
            Go back Home
          </button>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
