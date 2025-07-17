import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Observation({ creatureGuess, photoURLs, createdAt, userId }) {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const finduser = async () => {
      try {
        const response = await axios.get(
          `https://terraquest-5ye5.onrender.com/api/getOneUser/${userId}`,
        );
        if (!response) {
          console.log("There is no data");
          return;
        }
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    finduser();
  }, []);

  const handleClick = () => {
    navigate("/"); // change this later to the preview page of the observation.
  };

  return (
    <div className="rounded-3xl bg-gray-300 flex flex-col shadow-md overflow-hidden">
      <h1 className="text-xl font-semibold p-4">{creatureGuess}</h1>

      <img
        className="rounded-4xl h-64 w-full object-cover px-4 pb-4"
        src={photoURLs[0]}
        alt="Observation"
      />

      <div className="flex items-center justify-between px-4 pb-4">
        <p className="text-sm text-gray-700">
          {new Date(createdAt).toDateString()}
        </p>

        {userData ? (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7bff00] via-[#5f7a47] to-[#20321d] p-[3px]">
            <img
              src={userData.profilePic}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-2 border-white"
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500">Loading...</p>
        )}
      </div>
      <div>
        <button
          onClick={() => handleClick()}
          className="bg-[#64a828] rounded-xl w-full h-xl"
        >
          See More
        </button>
      </div>
    </div>
  );
}

export default Observation;
