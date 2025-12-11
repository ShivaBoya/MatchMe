import React, { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import {
  FaSearch,
  FaUserFriends,
  FaComments,
  FaStar,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

const TopNavBar = ({
  userProfile,
  user,
  handleLogout,
  showMenu,
  setShowMenu,
  profileMenu,
  setProfileMenu,
}) => {
  const navigate = useNavigate();
  const profileImage = userProfile?.photoURL || user?.photoURL;

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full flex items-center gap-2 transition-transform hover:scale-105 ${isActive ? "text-purple-700 font-semibold bg-white/20" : "text-white"
    }`;

  const mobileNavLinkClass = "flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-gray-700";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 shadow-md px-6 py-4">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between relative">
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-pink-300 cursor-pointer hover:scale-105 transition-transform"
        >
          💗Soul<span className="text-purple-300">Connect</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-3 ml-10">
          <NavLink to="/discover" className={navLinkClass}>
            <FaSearch />
            Discover
          </NavLink>

          <NavLink to="/matches" className={navLinkClass}>
            <FaUserFriends />
            Matches
          </NavLink>

          <NavLink to="/messages" className={navLinkClass}>
            <FaComments />
            Messages
          </NavLink>

          <NavLink
            to="/premium"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full flex items-center gap-2 transition-transform hover:scale-105 bg-white text-yellow-600 font-semibold ${isActive ? "ring-2 ring-yellow-400" : ""}`
            }
          >
            <FaStar />
            Premium
          </NavLink>
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-4 relative">
          <span className="text-sm hidden md:block">
            Welcome, {userProfile?.name || user?.email || "User"}
          </span>

          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer border-2 border-pink-300"
              onClick={() => setProfileMenu(!profileMenu)}
            />
          ) : (
            <FaUserCircle
              className="text-2xl cursor-pointer hover:text-pink-200"
              onClick={() => setProfileMenu(!profileMenu)}
            />
          )}

          {profileMenu && (
            <div className="absolute right-0 top-12 bg-white text-black w-40 rounded-md shadow-lg z-50">
              <Link
                to="/profile"
                onClick={() => setProfileMenu(false)}
                className="w-full block text-left px-4 py-2 hover:bg-gray-100"
              >
                My Profile
              </Link>

              <Link
                to="/settings"
                onClick={() => setProfileMenu(false)}
                className="w-full block text-left px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Mobile menu */}
        {showMenu && (
          <div className="absolute top-16 right-4 bg-white/90 backdrop-blur-md text-black rounded-lg shadow-md flex flex-col gap-2 p-4 z-50 w-52">
            <div className="text-sm text-gray-600 px-2">
              Welcome, {userProfile?.name || user?.email || "User"}
            </div>
            <hr className="border-gray-300 my-2" />

            <Link
              to="/discover"
              onClick={() => setShowMenu(false)}
              className={mobileNavLinkClass}
            >
              <FaSearch /> Discover
            </Link>

            <Link
              to="/matches"
              onClick={() => setShowMenu(false)}
              className={mobileNavLinkClass}
            >
              <FaUserFriends /> Matches
            </Link>

            <Link
              to="/messages"
              onClick={() => setShowMenu(false)}
              className={mobileNavLinkClass}
            >
              <FaComments /> Messages
            </Link>

            <Link
              to="/premium"
              onClick={() => setShowMenu(false)}
              className={mobileNavLinkClass + " w-full text-left text-yellow-600 font-bold"}
            >
              <FaStar /> Premium
            </Link>

            <button
              onClick={handleLogout}
              className={mobileNavLinkClass + " w-full text-left"}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavBar;
