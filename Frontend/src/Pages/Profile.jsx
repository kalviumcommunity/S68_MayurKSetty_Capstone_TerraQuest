import React, { useEffect, useState } from "react";
import EditProfile from "../Components/Profile/EditProfile";
import ChangeProfilePic from "../Components/Profile/ChangeProfilePic";
import axios from "axios";

function Profile() {
  const [showEdit, setShowEdit] = useState(null);
  const [showChangePic, setShowChangePic] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getuser");

        if (!response.data) {
          return console.log("There was an error fetching the data");
        }

        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center m-8">
        {/* Profile Picture */}
        <div className="relative w-40 h-40">
          <img
            src={userData.profileImage}
            alt="Profile"
            className="w-full h-full object-cover border-4 rounded-full"
          />
          <button
            onClick={() => setShowChangePic(true)}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white border px-3 py-1 text-sm rounded-full shadow hover:bg-gray-100"
          >
            Change
          </button>
        </div>

        {/* Info Cards */}
        <div className="flex flex-col mt-20 gap-4 w-full max-w-md">
          {[userData.name, userData.email, userData.password].map((field) => (
            <div
              key={field}
              className="flex justify-between items-center bg-gray-100 border p-4 rounded"
            >
              <div>
                <p className="font-medium capitalize">{field}</p>
                <p>{userData[field]}</p>
              </div>
              <button
                onClick={() => setShowEdit(field)}
                className="bg-[#94c864] text-white px-3 py-1 rounded hover:bg-[#6fc870]"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Field Popup */}
      <EditProfile
        show={!!showEdit}
        onClose={() => setShowEdit(null)}
        label={showEdit || ""}
        type={showEdit === "password" ? "password" : "text"}
        currentValue={userData[showEdit]}
      />

      {/* Change Profile Picture Popup */}
      <ChangeProfilePic
        show={showChangePic}
        onClose={() => setShowChangePic(false)}
      />
    </>
  );
}

export default Profile;
