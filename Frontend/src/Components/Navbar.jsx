import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <nav className="bg-black text-white p-4 flex items-center justify-between w-full">
      <div className="flex items-center justify-between w-full">
        <div>
          <NavLink to="/">
            <h1 className="text-3xl font-jersey font-bold bg-gradient-to-r from-[#59B700] via-[#7a8a6b] to-[#838080] bg-clip-text text-transparent">
              TerraQuest
            </h1>
            <span className="text-sm text-gray-400">
              A quest to discover Earth's biodiversity.
            </span>
          </NavLink>
        </div>
        <div className="flex-1 flex justify-around space-x-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] bg-clip-text text-transparent font-extrabold"
                : "hover:text-gray-400 font-extrabold"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive
                ? "bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] bg-clip-text text-transparent font-extrabold"
                : "hover:text-gray-400 font-extrabold"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/learn"
            className={({ isActive }) =>
              isActive
                ? "bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] bg-clip-text text-transparent font-extrabold"
                : "hover:text-gray-400 font-extrabold"
            }
          >
            Learn
          </NavLink>
          <NavLink
            to="track"
            className={({ isActive }) =>
              isActive
                ? "bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] bg-clip-text text-transparent font-extrabold"
                : "hover:text-gray-400 font-extrabold"
            }
          >
            Track
          </NavLink>
          <NavLink
            to="/submit"
            className={({ isActive }) =>
              isActive
                ? "bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] bg-clip-text text-transparent font-extrabold"
                : "hover:text-gray-400 font-extrabold"
            }
          >
            Submit
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive
                ? "bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] bg-clip-text text-transparent font-extrabold"
                : "hover:text-gray-400 font-extrabold"
            }
          >
            Community
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search"
            className="bg-white text-black px-3 py-1 rounded-2xl w-60 h-10 focus:outline-none focus:ring focus:ring-green-500"
          />
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <NavLink to="/profile" className="flex items-center space-x-2">
                <img
                  src={currentUser.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </NavLink>
            ) : (
              <>
                <NavLink to="/login" className="text-gray-400 hover:text-white">
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] text-white px-4 py-1 rounded-full hover:bg-gradient-to-r hover:from-[#59B700] hover:via-[#71c225] hover:to-[#838080]"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
