import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';

export default function Profile({ user, userProfile, setUserProfile }) {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    religion: '',
    hobbies: '',
    education: '',
    profession: '',
    partnerPreferences: {
      ageRange: '',
      location: '',
      religion: '',
      education: ''
    },
    profilePicUrl: '',
    profilePicPrivacy: 'public'
  });

  const [newPic, setNewPic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredField, setHoveredField] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    if (user) {
      const profileDoc = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(profileDoc, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({
            ...data,
            partnerPreferences: {
              ageRange: '',
              location: '',
              religion: '',
              education: '',
              ...(data.partnerPreferences || {})
            }
          });
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('partnerPreferences.')) {
      const key = name.split('.')[1];
      setProfileData((prev) => ({
        ...prev,
        partnerPreferences: {
          ...prev.partnerPreferences,
          [key]: value
        }
      }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setNewPic(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      if (newPic) {
        const picRef = storageRef(storage, `profilePics/${user.uid}/${newPic.name}`);
        await uploadBytes(picRef, newPic);
        const url = await getDownloadURL(picRef);
        profileData.profilePicUrl = url;
      }

      const profileDoc = doc(db, 'users', user.uid);
      await setDoc(profileDoc, profileData);
      setUserProfile(profileData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const inputStyles = "p-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white placeholder-white/70 transform transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/50 focus:scale-110 focus:bg-white/25 focus:border-white/70 focus:shadow-2xl focus:rotate-1";

  const fieldStyles = "p-4 border border-white/30 rounded-xl bg-white/10 backdrop-blur-md transform transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:border-white/50 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 cursor-pointer group";

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#182384] to-[#ce759a] perspective-1000">
        <p className="text-center text-xl text-white transform transition-all duration-700 animate-fade-in hover:scale-110 hover:rotate-3">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#182384] to-[#ce759a] perspective-1000 py-10 px-4">
      <div className={`max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl text-white transform-gpu transition-all duration-700 ${
        isLoaded ? 'animate-fade-in opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-12 rotate-x-45'
      } hover:scale-105 hover:shadow-2xl hover:rotate-x-3 preserve-3d`}>
        
        {/* Header with 3D Animation */}
        <h2 className="text-4xl font-bold text-center mb-8 transform transition-all duration-500 hover:scale-110 hover:text-pink-300 hover:rotate-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent animate-3d-float">
          My Profile
        </h2>

        {!isEditing ? (
          <div className="space-y-6 transform-gpu">
            {/* Profile Picture Section with 3D Effects */}
            <div className="flex flex-col items-center mb-8 transform transition-all duration-700 hover:scale-110">
              <div className="relative group">
                {profileData.profilePicUrl ? (
                  <img
                    src={profileData.profilePicUrl}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-white/30 shadow-2xl transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl animate-3d-float"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-6xl font-bold border-4 border-white/30 shadow-2xl transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 animate-3d-float">
                    {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
              <div className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform transition-all duration-500 hover:scale-110 hover:bg-white/30">
                <p className="text-sm text-white/90 font-medium">
                  Picture Privacy: <span className="text-pink-300">{profileData.profilePicPrivacy}</span>
                </p>
              </div>
            </div>

            {/* Personal Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['name', 'age', 'gender', 'location', 'religion', 'hobbies', 'education', 'profession'].map((field, index) => (
                <div 
                  key={field} 
                  className={fieldStyles}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    transform: `translateZ(${index * 5}px)` 
                  }}
                  onMouseEnter={() => setHoveredField(field)}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 transform transition-all duration-300 ${
                      hoveredField === field ? 'scale-150 rotate-180' : 'scale-100'
                    }`}></div>
                    <div>
                      <strong className="text-pink-300 text-sm font-semibold transform transition-all duration-300 group-hover:scale-110 block">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </strong>
                      <span className="text-white/90 transform transition-all duration-300 group-hover:translate-x-2">
                        {profileData[field] || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner Preferences Section */}
            <div className="mt-10 transform transition-all duration-700 hover:scale-105">
              <h3 className="text-2xl font-semibold text-pink-400 mb-6 text-center transform transition-all duration-500 hover:scale-110 hover:rotate-3 animate-3d-float">
                Partner Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['ageRange', 'location', 'religion', 'education'].map((pref, index) => (
                  <div 
                    key={pref} 
                    className={fieldStyles}
                    style={{ 
                      animationDelay: `${(index + 8) * 100}ms`,
                      transform: `translateZ(${(index + 8) * 5}px)` 
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 transform transition-all duration-300 hover:scale-150 hover:rotate-180"></div>
                      <div>
                        <strong className="text-purple-300 text-sm font-semibold transform transition-all duration-300 group-hover:scale-110 block">
                          {pref.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </strong>
                        <span className="text-white/90 transform transition-all duration-300 group-hover:translate-x-2">
                          {profileData.partnerPreferences[pref] || 'Not specified'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Button with 3D Animation */}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-full w-full transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:rotate-3 text-lg font-semibold"
            >
              ✨ Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-6 transform-gpu">
            {/* Edit Mode Profile Picture */}
            <div className="flex flex-col items-center mb-8 transform transition-all duration-700 hover:scale-105">
              <div className="relative group">
                {profileData.profilePicUrl ? (
                  <img
                    src={profileData.profilePicUrl}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-white/30 shadow-2xl transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 animate-3d-float"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-6xl font-bold border-4 border-white/30 shadow-2xl transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 animate-3d-float">
                    {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <input 
                type="file" 
                onChange={handleFileChange} 
                className={`${inputStyles} mt-4 w-full max-w-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600`} 
              />
              <select
                name="profilePicPrivacy"
                value={profileData.profilePicPrivacy}
                onChange={handleChange}
                className={`${inputStyles} mt-3 w-full max-w-sm`}
              >
                <option value="public">🌍 Public</option>
                <option value="private">🔒 Private</option>
                <option value="connections">👥 Connections Only</option>
              </select>
            </div>

            {/* Edit Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['name', 'age', 'gender', 'location', 'religion', 'hobbies', 'education', 'profession'].map((field, index) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={`✨ ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  value={profileData[field]}
                  onChange={handleChange}
                  className={inputStyles}
                  style={{ animationDelay: `${index * 50}ms` }}
                />
              ))}
            </div>

            {/* Partner Preferences Edit Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-pink-400 mb-6 text-center transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                💕 Partner Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['ageRange', 'location', 'religion', 'education'].map((pref, index) => (
                  <input
                    key={pref}
                    type="text"
                    name={`partnerPreferences.${pref}`}
                    placeholder={`💖 ${pref.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
                    value={profileData.partnerPreferences[pref]}
                    onChange={handleChange}
                    className={inputStyles}
                    style={{ animationDelay: `${(index + 8) * 50}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons with 3D Effects */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-8 rounded-full flex-1 transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:rotate-3 text-lg font-semibold"
              >
                💾 Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-4 px-8 rounded-full flex-1 transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:rotate-3 text-lg font-semibold"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}