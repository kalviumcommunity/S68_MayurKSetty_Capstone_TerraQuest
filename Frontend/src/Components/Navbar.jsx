import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

function Navbar() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/learn", label: "Learn" },
    { to: "/track", label: "Track" },
    { to: "/submit", label: "Submit" },
    { to: "/community", label: "Community" },
  ];

  return (
    <nav className="bg-black text-white p-4 w-full">
      <div className="flex items-center justify-between">
        <NavLink to="/">
          <h1 className="text-3xl font-jersey font-bold bg-gradient-to-r from-[#59B700] via-[#7a8a6b] to-[#838080] bg-clip-text text-transparent">
            TerraQuest
          </h1>
          <span className="text-sm text-gray-400">
            A quest to discover Earth's biodiversity.
          </span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex flex-1 justify-around space-x-6 text-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] bg-clip-text text-transparent font-extrabold"
                  : "hover:text-gray-400 font-extrabold"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search"
            className="bg-white text-black px-3 py-1 rounded-2xl w-60 h-10 focus:outline-none focus:ring focus:ring-green-500"
          />
          {currentUser ? (
            <NavLink to="/profile">
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
                className="bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] text-white px-4 py-1 rounded-full hover:brightness-110"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile level */}
      {menuOpen && (
        <div className="flex flex-col md:hidden mt-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] bg-clip-text text-transparent font-extrabold"
                  : "text-white hover:text-gray-400 font-extrabold"
              }
            >
              {link.label}
            </NavLink>
          ))}

          <input
            type="search"
            placeholder="Search"
            className="bg-white text-black px-3 py-1 rounded-2xl w-full h-10 focus:outline-none focus:ring focus:ring-green-500"
          />

          <div className="flex flex-col space-y-2">
            {currentUser ? (
              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                <img
                  src={currentUser.profilePic}
                  alt="Profile"
                  className="w-15 h-15 rounded-full object-cover absolute right-15 top-15"
                />
              </NavLink>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="bg-gradient-to-r from-[#59B700] via-[#79a94b] to-[#838080] text-white px-4 py-1 rounded-full hover:brightness-110"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
