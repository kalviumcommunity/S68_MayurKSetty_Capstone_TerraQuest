import axios from "axios";
import React, { useEffect, useState } from "react";

function Observation({ creatureGuess, photoURLs, createdAt, userId }) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const finduser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getOneUser/${userId}`,
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

  return (
    <div className="rounded-3xl w-100 bg-gray-300 mt-4 ml-4 flex flex-col">
      <h1 className="p-4">{creatureGuess}</h1>

      <img className="rounded-2xl h-50 w-80 m-6 " src={photoURLs[0]} alt="" />

      <div>
        {userData ? (
          <div className=" w-20 h-20 p-1.5 rounded-full bg-gradient-to-br from-[#7bff00] via-[#5f7a47] to-[#20321d]">
            <img
              src={userData.profilePic}
              alt="Profile"
              className="w-full h-full object-cover border-2 rounded-full"
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <p>{createdAt}</p>
      </div>
    </div>
  );
}

export default Observation;
