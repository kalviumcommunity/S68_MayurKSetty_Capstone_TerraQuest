import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function EditProfile({ show, onClose, label, type = "text", currentValue }) {
  const [input, setInput] = useState(currentValue);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async () => {
    console.log(`${label} updated to:`, input);
    onClose(); // change this logic to work with real data!
  };

  if (!show) return null;

  // For password field to show the eye button
  const isPassword = type === "password";
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Edit {label}</h2>

        <div className="relative mb-4">
          <input
            type={inputType}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter new ${label.toLowerCase()}`}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="absolute right-3 top-2.5 text-gray-600 hover:text-black"
            >
              {visible ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#94c864] text-white rounded hover:bg-[#85f387]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
