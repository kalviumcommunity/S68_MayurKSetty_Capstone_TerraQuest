import React, { useEffect, useState } from "react";
import EditProfile from "../Components/Profile/EditProfile";
import ChangeProfilePic from "../Components/Profile/ChangeProfilePic";
import background from "../assets/Backgrounds/Login-signup-bg.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice"; // adjust path

function Profile() {
  const [showEdit, setShowEdit] = useState(null);
  const [showChangePic, setShowChangePic] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getuser", {
          withCredentials: true,
        });
        console.log(response);

        if (!response.data) {
          return console.log("There was an error fetching the data");
        }

        setUserData(response.data.Userdata);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true },
      );
      dispatch(logout());
      navigate("/");
    } catch (err) {
      alert("There was an error logging out!", err);
    }
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-contain bg-center p-8"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex flex-col items-center m-8">
          {/* Profile Picture */}
          <div className="relative w-40 h-40">
            <div className="p-2 rounded-full bg-gradient-to-br from-[#7bff00] via-[#5f7a47] to-[#20321d]">
              <img
                src={userData.profilePic}
                alt="Profile"
                className="w-full h-full object-cover border-4 rounded-full"
              />
            </div>
            <button
              onClick={() => setShowChangePic(true)}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white border px-3 py-1 text-sm rounded-full shadow hover:bg-gray-100"
            >
              Change
            </button>
          </div>

          {/* Info Cards */}
          <div className="flex flex-col mt-20 gap-4 w-full max-w-md">
            {["name", "email", "password"].map((field) => (
              <div
                key={field}
                className="flex justify-between items-center bg-gray-100 border p-4 rounded"
              >
                <div>
                  <p className="font-medium capitalize">{field}</p>
                  <p>{field != "password" ? userData[field] : ""}</p>
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
        <div className="flex flex-row justify-center items-center">
          <button
            onClick={() => {
              handleLogout();
            }}
            className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white text-3xl px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-red-800 hover:via-red-700 hover:to-red-800"
          >
            Logout
          </button>
        </div>

        {/* Edit Field Popup */}
        <EditProfile
          key={showEdit}
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
      </div>
    </>
  );
}

export default Profile;
