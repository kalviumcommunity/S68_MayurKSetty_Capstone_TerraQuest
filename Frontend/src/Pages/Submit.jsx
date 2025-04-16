import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import background from "../assets/Backgrounds/Login-signup-bg.png";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// default location that is chosen
const defaultCenter = {
  lat: 12.9234996,
  lng: 77.4959894, //coordinates pointing to RV University
};

const libraries = ["places"]; // Places Library... this is used for the for autocomplete

const Submit = () => {
  // States for form data
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [locationVisibility, setLocationVisibility] = useState("visible");
  const [photoFiles, setPhotoFiles] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [creatureGuess, setCreatureGuess] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);

  // console.log(apiKey);

  // got from documentation... the below part

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  // Save the autocomplete instance
  const onLoadAutocomplete = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  // Handle place selection from autocomplete
  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      // Center map on selected place if geometry is available.
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMapCenter({ lat, lng });
        setSelectedPosition({ lat, lng });
      }
    }
  };

  // Handle clicking on the map (allow users to click to select)
  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPosition({ lat, lng });
  }, []);

  // Photo file input change handler to set previews to be able to see
  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files);
    setPhotoFiles(files);

    // Generate preview URLs...
    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews(previews);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    setPhotoFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews(previews);
  };

  // Submit the upload form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a form data object for file uploads.
    const formData = new FormData();
    formData.append("locationVisibility", locationVisibility);
    if (selectedPosition) {
      formData.append("latitude", selectedPosition.lat);
      formData.append("longitude", selectedPosition.lng);
    } else {
      alert("all fields are required!");
      return;
    }
    formData.append("timeOfDay", timeOfDay);
    formData.append("creatureGuess", creatureGuess);

    photoFiles.forEach((file) => {
      formData.append("image", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/submit",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  if (loadError) return <div>Error loading maps.</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div
      className="w-full h-full bg-contain bg-center p-2"
      style={{ backgroundImage: `url(${background})` }}
    >
      <form onSubmit={handleSubmit}>
        {/* Google Maps and Autocomplete */}
        <div className="bg-[rgba(148,200,100,0.7)] rounded-2xl p-4 m-2 flex flex-col gap-4">
          <div className="flex flex-col justify-center items-center mt-0">
            <h1 className="text-4xl font-bold text-black mb-3">
              Upload Your Sighting
            </h1>
          </div>
          <div className=" flex flex-col gap-4">
            <Autocomplete
              onLoad={onLoadAutocomplete}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                placeholder="Search for a location"
                className="w-full h-10 p-3 rounded-xl bg-white"
              />
            </Autocomplete>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={12}
              onClick={onMapClick}
            >
              {selectedPosition && <Marker position={selectedPosition} />}
            </GoogleMap>

            <div className="bg-white w-xs flex flex-row items-center justify-around p-2 rounded-2xl">
              <label htmlFor="locationVisibility">Location Privacy: </label>
              <select
                id="locationVisibility"
                value={locationVisibility}
                onChange={(e) => setLocationVisibility(e.target.value)}
              >
                <option value="visible">Visible</option>
                <option value="obscured">Obscured</option>
                <option value="not_visible">Not Visible</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row items-start justify-around p-10 rounded-2xl bg-[rgba(224,165,86,0.7)]">
            {/* Creature Identification */}
            <div className="creature-section">
              <label htmlFor="creatureGuess">What did you think it was?</label>
              <input
                type="text"
                id="creatureGuess"
                placeholder="e.g., Monarch Butterfly"
                value={creatureGuess}
                onChange={(e) => setCreatureGuess(e.target.value)}
                className="w-full h-10 bg-white rounded-xl p-4"
              />
            </div>

            <div className=" h-full flex flex-col justify-around gap-4">
              {/* Photo Upload with teh Preview */}
              <div
                className="h-full flex flex-col justify-around gap-10"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {/* Photo Upload with the Preview */}
                <div className="photo-upload-section">
                  <label htmlFor="photos">Upload Photos:</label>

                  {/* Drag-and-Drop Box */}
                  <div
                    onClick={() => document.getElementById("photos").click()}
                    className="border-2 border-dashed border-gray-400 rounded-xl p-6 text-center cursor-pointer bg-white hover:bg-gray-100 transition"
                  >
                    <p className="text-gray-500">
                      Drag & drop images here, or click to select
                    </p>
                    <input
                      type="file"
                      id="photos"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>

                  {/* Photo Previews */}
                  <div className="photo-previews mt-4 flex flex-wrap gap-4">
                    {photoPreviews.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`preview-${index}`}
                        className="h-[100px] rounded-md shadow"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* choose the time of observation */}
              <div className="bg-white rounded-xl p-6 flex flex-row justify-around items-center">
                <label htmlFor="timeOfDay">Time of Sighting:</label>
                <input
                  type="time"
                  id="timeOfDay"
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            className="bg-black text-white text-xl rounded-2xl h-10 hover:bg-gray-900 transition duration-300"
            type="submit"
          >
            Submit Sighting
          </button>
        </div>
      </form>
    </div>
  );
};

export default Submit;
