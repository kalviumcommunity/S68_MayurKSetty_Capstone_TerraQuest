import React, { useEffect, useState } from "react";
import axios from "axios";
import Observation from "../Components/Explore/Observation";

function Explore() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/fetchsighting",
        );
        setData(response.data);
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //creatureGuess,photoURLs,createdAt,userId

  return (
    <>
      <div className="h-screen w-screen">
        {data.map((item) => {
          return (
            <Observation
              key={item._id}
              creatureGuess={item.creatureGuess}
              photoURLs={item.photoURLs}
              createdAt={item.createdAt}
              userId={item.userId}
            />
          );
        })}
      </div>
    </>
  );
}

export default Explore;
