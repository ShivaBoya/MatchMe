import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../context/auth'; // Adjust this path if needed
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const result = await getUserProfile(user.uid);
          if (result.success) {
            setProfile(result.data);
          } else {
            console.error(result.error);
          }
          setLoading(false);
          setTimeout(() => setIsLoaded(true), 100);
        }
      });
    };
    fetchProfile();
  }, []);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#182384] to-[#ce759a] perspective-1000">
        <div className="text-center text-white transform-gpu animate-pulse">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4 transform-gpu"></div>
          <p className="text-xl font-semibold animate-fade-in">Loading user settings...</p>
        </div>
      </div>
    );
  }

  const profileFields = [
    { label: 'Name', value: profile.name || '-', icon: '👤' },
    { label: 'Age', value: profile.age || '-', icon: '🎂' },
    { label: 'Gender', value: profile.gender || '-', icon: '⚧️' },
    { label: 'Location', value: profile.location || '-', icon: '📍' },
    { label: 'Religion', value: profile.religion || '-', icon: '🕊️' },
    { 
      label: 'Hobbies', 
      value: typeof profile.hobbies === 'string'
        ? profile.hobbies
        : Array.isArray(profile.hobbies)
        ? profile.hobbies.join(', ')
        : '-',
      icon: '🎨'
    },
    { label: 'Education', value: profile.education || '-', icon: '🎓' },
    { label: 'Profession', value: profile.profession || '-', icon: '💼' },
    { label: 'Email', value: profile.email || '-', icon: '📧' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#182384] via-[#4c1d95] to-[#ce759a] p-6 perspective-1000 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse transform-gpu"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000 transform-gpu"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500 transform-gpu"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12">
        <div className={`max-w-4xl w-full transform-gpu transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-12 rotate-x-45'
        }`}>
          
          {/* Main Container with 3D Effects */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden transform-gpu transition-all duration-700 hover:scale-[1.02] hover:rotate-y-2 hover:shadow-4xl group preserve-3d">
            
            {/* Floating Header */}
            <div className="text-center mb-12 transform transition-all duration-500 group-hover:translate-y-1">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 transform transition-all duration-300 hover:scale-110 animate-fade-in">
                User Settings
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full transform transition-all duration-500 group-hover:w-32"></div>
            </div>

            {/* Profile Grid with Staggered Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {profileFields.map((field, index) => (
                <div
                  key={field.label}
                  className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transform-gpu transition-all duration-500 hover:scale-105 hover:rotate-y-6 hover:bg-white/10 hover:border-white/20 hover:shadow-xl group/item preserve-3d ${
                    isLoaded ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: `translateZ(${index * 5}px)`,
                  }}
                >
                  <div className="flex items-center space-x-4 transform transition-all duration-300 group-hover/item:translate-x-2">
                    <div className="text-3xl transform transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12">
                      {field.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-pink-300 mb-1 transform transition-all duration-300 group-hover/item:text-pink-200">
                        {field.label}
                      </p>
                      <p className="text-white font-semibold text-lg break-words transform transition-all duration-300 group-hover/item:scale-105">
                        {field.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Email Verification Status with Special Animation */}
            <div className={`bg-gradient-to-r ${profile.emailVerified ? 'from-green-500/20 to-emerald-500/20 border-green-400/30' : 'from-red-500/20 to-rose-500/20 border-red-400/30'} border backdrop-blur-md rounded-2xl p-6 transform-gpu transition-all duration-700 hover:scale-105 hover:rotate-x-3 hover:shadow-2xl group/verify preserve-3d ${
              isLoaded ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: '900ms' }}>
              <div className="flex items-center justify-center space-x-4 transform transition-all duration-500 group-hover/verify:translate-y-1">
                <div className={`text-4xl transform transition-all duration-300 group-hover/verify:scale-125 ${profile.emailVerified ? 'group-hover/verify:rotate-12' : 'group-hover/verify:-rotate-12'}`}>
                  {profile.emailVerified ? '✅' : '❌'}
                </div>
                <div className="text-center">
                  <p className="text-white font-medium text-sm mb-1">Email Verification Status</p>
                  <p className={`font-bold text-xl transform transition-all duration-300 group-hover/verify:scale-110 ${
                    profile.emailVerified ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {profile.emailVerified ? 'Verified' : 'Not Verified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse transform-gpu"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse transform-gpu delay-1000"></div>
            
            {/* Interactive Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;