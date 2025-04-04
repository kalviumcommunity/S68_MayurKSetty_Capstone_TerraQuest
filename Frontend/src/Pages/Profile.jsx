import React, { useState } from 'react';
import EditProfile from '../Components/Profile/EditProfile';

function Profile() {
  const [showEdit, setShowEdit] = useState(null); // need to update the state when importing using axios

  const userData = { // hardcoded test data
    name: 'Mayura Droid',
    email: 'mayurDroid@example.com',
    password: '••••••••'
  };

  return (
    <>
      <div className="flex flex-col items-center m-8">
        <div>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="border-4 w-40 h-40 rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col mt-20 gap-4 w-full max-w-md">
          {['name', 'email', 'password'].map((field) => (
            <div key={field} className="flex justify-between items-center bg-gray-100 border p-4 rounded">
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

      <EditProfile
        show={!!showEdit}
        onClose={() => setShowEdit(null)}
        label={showEdit || ""}
        type={showEdit === 'password' ? 'password' : 'text'}
        currentValue={userData[showEdit]}
      />
    </>
  );
}

export default Profile;
