import React from "react";
import background from "../assets/Backgrounds/Login-signup-bg.png";

function Mainpage() {
  return (
    <div className="h-screen mt-0.8 bg-gray-100 flex flex-col items-center">
      <div
        className="w-full h-full bg-contain bg-center p-8"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* {yet to be decided} */}
      </div>
    </div>
  );
}

export default Mainpage;
