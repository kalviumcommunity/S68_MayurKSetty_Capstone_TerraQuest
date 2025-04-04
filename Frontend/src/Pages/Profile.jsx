import React, { useState } from "react";
import EditProfile from "../Components/Profile/EditProfile";
import ChangeProfilePic from "../Components/Profile/ChangeProfilePic";

function Profile() {
  const [showEdit, setShowEdit] = useState(null);
  const [showChangePic, setShowChangePic] = useState(false);

  const userData = {
    name: "Mayura Droid",
    email: "mayurDroid@example.com",
    password: "••••••••",
  };

  return (
    <>
      <div className="flex flex-col items-center m-8">
        {/* Profile Picture */}
        <div className="relative w-40 h-40">
          <img
            src="https://via.placeholder.com/150"
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
          {["name", "email", "password"].map((field) => (
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
