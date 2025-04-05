import React, { useState, useRef } from "react";
import axios from "axios";

function ChangeProfilePic({ show, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const dropRef = useRef(null);
  const [sending, setsending] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    console.log("Upload image:", selectedFile);
    // TODO: send file to server or Cloudinary
    try {
      setsending(true);
      const sendProfile = await axios.post(
        "http://localhost:3000/api/upload",
        selectedFile,
      );
      console.log(sendProfile);
      setsending(false);
    } catch (err) {
      console.log("There was an error while uploading the image:", err);
    }
    onClose();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("border-blue-400");
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove("border-blue-400");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("border-blue-400");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Change Profile Picture</h2>

        {/* Drop zone */}
        <div
          ref={dropRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
          className="w-full h-28 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer text-gray-500 text-center transition-colors"
        >
          {previewUrl
            ? "Drop another image or click to replace"
            : "Drag & drop or click to upload an image"}
        </div>

        {/* File input */}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Preview */}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover mb-4 mx-auto border"
          />
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || sending}
            className="px-4 py-2 bg-[#94c864] text-white rounded hover:bg-[#85f387] disabled:opacity-50"
          >
            {sending ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfilePic;
