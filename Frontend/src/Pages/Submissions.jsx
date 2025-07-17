import React, { useEffect, useState } from "react";
import axios from "axios";
import Observation from "../Components/Explore/Observation";
import { useSelector } from "react-redux";

function Submissions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://terraquest-5ye5.onrender.com/api/fetchsighting",
        );
        setData(response.data);
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <div className="h-auto min-h-screen w-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {data
            .filter((item) => item.userId == currentUser._id)
            .map((item) => (
              <Observation
                key={item._id}
                creatureGuess={item.creatureGuess}
                photoURLs={item.photoURLs}
                createdAt={item.createdAt}
                userId={item.userId}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Submissions;
