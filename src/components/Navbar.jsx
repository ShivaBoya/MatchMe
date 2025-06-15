import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaUserFriends,
  FaComments,
  FaStar,
  FaBars,
  FaUserCircle,
} from 'react-icons/fa';

const TopNavBar = ({
  userProfile,
  user,
  activeTab,
  setActiveTab,
  setShowPremium,
  handleLogout,
  showMenu,
  setShowMenu,
  profileMenu,
  setProfileMenu,
}) => {
    const navigate = useNavigate();
  const profileImage = userProfile?.photoURL || user?.photoURL;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 shadow-md px-6 py-4">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between relative">
        <h2
  onClick={() => {
    setActiveTab("Discover"); // optional: set the active tab
    navigate("/dashboard");
  }}
  className="text-2xl font-bold text-pink-300 cursor-pointer hover:scale-105 transition-transform"
>
  💗Soul<span className="text-purple-300">Connect</span>
</h2>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-3 ml-10">
          <button
  onClick={() => {
    setActiveTab('Discover');
    navigate('/discover');
  }}
  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-transform hover:scale-105 ${
    activeTab === 'Discover' ? ' text-purple-700 font-semibold' : ''
  }`}
>
  <FaSearch />
  Discover
</button>

         <button
  onClick={() => {
    setActiveTab('Matches');
    navigate('/matches');
  }}
  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-transform hover:scale-105 ${
    activeTab === 'Matches' ? ' text-purple-700 font-semibold' : ''
  }`}
>
  <FaUserFriends />
  Matches
</button>

          <button
  onClick={() => {
    setActiveTab('Messages');
    navigate('/messages');
  }}
  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-transform hover:scale-105 ${
    activeTab === 'Messages' ? ' text-purple-700 font-semibold' : ''
  }`}
>
  <FaComments />
  Messages
</button>

          <button
            onClick={() => setShowPremium(true)}
            className="px-4 py-2 rounded-full flex items-center gap-2 transition-transform hover:scale-105 bg-white text-yellow-600 font-semibold"
          >
            <FaStar />
            Premium
          </button>
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-4 relative">
          <span className="text-sm hidden md:block">
            Welcome, {userProfile?.name || user?.email || 'User'}
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
              <button
  onClick={() => {
    navigate('/profile');
    setProfileMenu(false);
    setActiveTab('Profile'); // optional: only if you're using this tab for styling elsewhere
  }}
  className="w-full text-left px-4 py-2 hover:bg-gray-100"
>
  My Profile
</button>

              <button
  onClick={() => {
    navigate('/settings');
    setProfileMenu(false);
  }}
  className="w-full text-left px-4 py-2 hover:bg-gray-100"
>
  Settings
</button>

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
              Welcome, {userProfile?.name || user?.email || 'User'}
            </div>
            <hr className="border-gray-300 my-2" />

            <button
              onClick={() => {
                setActiveTab('Discover');
                setShowMenu(false);
                navigate('/discover');
              }}
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded"
            >
              <FaSearch /> Discover
            </button>
           <button
  onClick={() => {
    setActiveTab('Matches');
    setShowMenu(false);
    navigate('/matches');
  }}
  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded"
>
  <FaUserFriends /> Matches
</button>

            <button
              onClick={() => {
                setActiveTab('Messages');
                setShowMenu(false);
                navigate('/messages');
              }}
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded"
            >
              <FaComments /> Messages
            </button>
            <button
              onClick={() => {
                setShowPremium(true);
                setShowMenu(false);
              }}
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded"
            >
              <FaStar /> Premium
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded"
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