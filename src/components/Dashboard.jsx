import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaUser, FaCamera, FaMusic, FaGamepad, FaBook, FaPlane, FaCoffee, FaPaw, FaFilm, FaDumbbell, FaPalette } from 'react-icons/fa';
import Footer from './Footer';

const Dashboard = ({ user }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [agePreference, setAgePreference] = useState([22, 32]);
  const [relationshipType, setRelationshipType] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [showMatchingModal, setShowMatchingModal] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  const navigate = useNavigate();

  const interests = [
    { name: 'Music', icon: <FaMusic />, color: 'bg-pink-500' },
    { name: 'Gaming', icon: <FaGamepad />, color: 'bg-blue-500' },
    { name: 'Reading', icon: <FaBook />, color: 'bg-green-500' },
    { name: 'Travel', icon: <FaPlane />, color: 'bg-purple-500' },
    { name: 'Coffee', icon: <FaCoffee />, color: 'bg-yellow-500' },
    { name: 'Pets', icon: <FaPaw />, color: 'bg-orange-500' },
    { name: 'Movies', icon: <FaFilm />, color: 'bg-red-500' },
    { name: 'Fitness', icon: <FaDumbbell />, color: 'bg-indigo-500' },
    { name: 'Art', icon: <FaPalette />, color: 'bg-teal-500' },
    { name: 'Photography', icon: <FaCamera />, color: 'bg-cyan-500' }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, [user]);

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleStartMatching = () => {
    setIsMatching(true);
    setShowMatchingModal(true);


    setTimeout(() => {
      setIsMatching(false);
      navigate('/discover');
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#182384] to-[#ce759a] text-white font-sans perspective-1000 overflow-hidden relative">

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 text-pink-500/30 text-6xl animate-3d-float flex items-center justify-center">💕</div>
        <div className="absolute top-40 right-20 w-24 h-24 text-purple-500/30 text-4xl animate-3d-float" style={{ animationDelay: '1.5s' }}>✨</div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 text-blue-500/30 text-3xl animate-3d-float" style={{ animationDelay: '2.5s' }}>💫</div>
        <div className="absolute bottom-60 right-1/3 w-28 h-28 text-green-500/30 text-5xl animate-3d-float" style={{ animationDelay: '3.5s' }}>🌟</div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 text-yellow-500/30 text-2xl animate-3d-float" style={{ animationDelay: '4s' }}>💖</div>
        <div className="absolute top-32 left-1/3 w-20 h-20 text-red-500/30 text-3xl animate-3d-float" style={{ animationDelay: '5s' }}>🎵</div>
        <div className="absolute bottom-32 right-1/4 w-24 h-24 text-cyan-500/30 text-4xl animate-3d-float" style={{ animationDelay: '6s' }}>🦋</div>
        <div className="absolute top-1/3 right-10 w-18 h-18 text-orange-500/30 text-3xl animate-3d-float" style={{ animationDelay: '7s' }}>🌸</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 text-center relative z-10 transform-gpu">

        <div className={`mb-12 transform transition-all duration-1000 ease-out ${isLoaded ? 'animate-fade-in opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-12 rotate-x-45'
          }`}>
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent transform transition-all duration-700 hover:scale-110 hover:rotate-x-3 preserve-3d">
            💕 Match Me 💕
          </h1>
          <p className="mb-8 text-2xl text-pink-100 transform transition-all duration-500 hover:scale-105 hover:text-yellow-200">
            Let's find your perfect match based on your preferences!
          </p>
        </div>


        <div className={`bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20 transform transition-all duration-1000 ease-out hover:scale-105 hover:rotate-x-3 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] preserve-3d group mb-12 ${isLoaded ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '300ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <h2 className="text-3xl font-bold mb-8 text-center transform transition-all duration-500 hover:scale-110 hover:text-yellow-300">
            🎯 What are you interested in?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
            {interests.map((interest, idx) => (
              <div
                key={interest.name}
                onClick={() => handleInterestToggle(interest.name)}
                className={`${interest.color} p-6 rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-2xl ${selectedInterests.includes(interest.name)
                  ? 'scale-110 rotate-6 shadow-2xl ring-4 ring-white/50'
                  : ''
                  }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-3xl mb-3 transform transition-all duration-300 hover:scale-150">
                  {interest.icon}
                </div>
                <p className="font-semibold text-sm">{interest.name}</p>
              </div>
            ))}
          </div>
        </div>


        <div className={`bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20 transform transition-all duration-1000 ease-out hover:scale-105 hover:rotate-x-3 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] preserve-3d group mb-12 ${isLoaded ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '600ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <h2 className="text-3xl font-bold mb-8 text-center transform transition-all duration-500 hover:scale-110 hover:text-yellow-300">
            ⚙️ Your Preferences
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">

            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <label className="block text-white text-lg font-semibold mb-4 transform transition-all duration-300 hover:text-yellow-300">
                💕 Age Range
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={agePreference[0]}
                  onChange={(e) => setAgePreference([+e.target.value, agePreference[1]])}
                  className="flex-1 accent-pink-500 transform transition-all duration-300 hover:scale-110"
                />
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={agePreference[1]}
                  onChange={(e) => setAgePreference([agePreference[0], +e.target.value])}
                  className="flex-1 accent-pink-500 transform transition-all duration-300 hover:scale-110"
                />
              </div>
              <div className="text-white text-lg mt-4 font-medium bg-black/30 rounded-full px-6 py-3 inline-block transform transition-all duration-300 hover:bg-pink-500/30">
                {agePreference[0]} - {agePreference[1]} years
              </div>
            </div>


            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2" style={{ transitionDelay: '100ms' }}>
              <label className="block text-white text-lg font-semibold mb-4 transform transition-all duration-300 hover:text-yellow-300">
                💍 Looking For
              </label>
              <select
                value={relationshipType}
                onChange={(e) => setRelationshipType(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white/20 backdrop-blur-md text-pink-400 text-lg focus:outline-none border-2 border-transparent focus:border-pink-400 transform transition-all duration-300 hover:scale-105 focus:scale-110 hover:bg-white/30"
              >
                <option value="">Select relationship type</option>
                <option value="casual">Casual Dating</option>
                <option value="serious">Serious Relationship</option>
                <option value="marriage">Marriage</option>
                <option value="friendship">Friendship</option>
              </select>
            </div>


            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2" style={{ transitionDelay: '200ms' }}>
              <label className="block text-white text-lg font-semibold mb-4 transform transition-all duration-300 hover:text-yellow-300">
                🌟 Lifestyle
              </label>
              <select
                value={lifestyle}
                onChange={(e) => setLifestyle(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white/20 backdrop-blur-md text-pink-400 text-lg focus:outline-none border-2 border-transparent focus:border-purple-400 transform transition-all duration-300 hover:scale-105 focus:scale-110 hover:bg-white/30"
              >
                <option value="">Select lifestyle</option>
                <option value="active">Active & Adventurous</option>
                <option value="relaxed">Relaxed & Peaceful</option>
                <option value="social">Social & Outgoing</option>
                <option value="creative">Creative & Artistic</option>
                <option value="intellectual">Intellectual & Deep</option>
              </select>
            </div>
          </div>
        </div>


        <div className={`bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20 transform transition-all duration-1000 ease-out hover:scale-105 hover:rotate-x-3 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] preserve-3d group mb-12 ${isLoaded ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '900ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <h2 className="text-3xl font-bold mb-8 text-center transform transition-all duration-500 hover:scale-110 hover:text-yellow-300">
            📊 Match Insights
          </h2>

          <div className="grid md:grid-cols-4 gap-6 relative z-10">
            <div className="text-center transform transition-all duration-500 hover:scale-125 hover:-translate-y-4">
              <div className="text-5xl font-bold text-pink-400 mb-2 animate-pulse">2,847</div>
              <p className="text-lg font-semibold">Potential Matches</p>
            </div>
            <div className="text-center transform transition-all duration-500 hover:scale-125 hover:-translate-y-4" style={{ transitionDelay: '100ms' }}>
              <div className="text-5xl font-bold text-green-400 mb-2 animate-pulse">96%</div>
              <p className="text-lg font-semibold">Compatibility Rate</p>
            </div>
            <div className="text-center transform transition-all duration-500 hover:scale-125 hover:-translate-y-4" style={{ transitionDelay: '200ms' }}>
              <div className="text-5xl font-bold text-blue-400 mb-2 animate-pulse">15</div>
              <p className="text-lg font-semibold">Daily New Matches</p>
            </div>
            <div className="text-center transform transition-all duration-500 hover:scale-125 hover:-translate-y-4" style={{ transitionDelay: '300ms' }}>
              <div className="text-5xl font-bold text-yellow-400 mb-2 animate-pulse">4.8</div>
              <p className="text-lg font-semibold">Your Match Score</p>
            </div>
          </div>
        </div>


        <div className={`transform transition-all duration-1000 ease-out ${isLoaded ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '1200ms' }}>
          <button
            onClick={handleStartMatching}
            disabled={selectedInterests.length === 0}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-16 py-6 rounded-full text-2xl font-bold transform transition-all duration-500 hover:scale-125 hover:rotate-3 hover:-translate-y-4 shadow-2xl hover:shadow-[0_0_50px_rgba(255,105,180,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0 disabled:hover:translate-y-0"
          >
            <FaHeart className="inline-block mr-4 animate-pulse" />
            Start Finding Matches
            <FaHeart className="inline-block ml-4 animate-pulse" />
          </button>
          {selectedInterests.length === 0 && (
            <p className="text-pink-300 mt-4 text-lg animate-bounce">
              Please select at least one interest to continue! 💕
            </p>
          )}
        </div>
      </div>

      {/* Matching Modal */}
      {showMatchingModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-black via-[#6C1BD5] to-[#FFD700] bg-opacity-95 flex flex-col items-center justify-center z-50 px-4 py-10 overflow-auto backdrop-blur-xl">
          <div className="w-full max-w-2xl bg-gradient-to-br from-black to-[#3c1361] text-white rounded-3xl p-12 shadow-2xl border border-yellow-400 relative transform transition-all duration-1000 scale-100 hover:scale-105 preserve-3d">
            <div className="text-center">
              <div className="text-8xl mb-8 animate-spin">💕</div>
              <h2 className="text-4xl font-extrabold mb-6 tracking-wide drop-shadow-lg text-yellow-300">
                {isMatching ? '🔍 Finding Your Perfect Match...' : '✨ Match Found!'}
              </h2>
              <p className="text-xl text-pink-200 mb-8">
                {isMatching
                  ? 'Analyzing your preferences and finding compatible matches...'
                  : 'Redirecting to your personalized matches...'}
              </p>
              {isMatching && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Hints */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-medium animate-bounce opacity-80 pointer-events-none z-20">
        ✨ Customize your preferences for better matches! ✨
      </div>

      {/* Footer */}
      <Footer />

      {/* Custom Styles */}
      <style>{`
        .animate-3d-float {
          animation: float3d 4s ease-in-out infinite;
        }
        
        @keyframes float3d {
          0%, 100% {
            transform: translateY(0px) rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: translateY(-20px) rotateY(90deg) rotateX(15deg);
          }
          50% {
            transform: translateY(-10px) rotateY(180deg) rotateX(0deg);
          }
          75% {
            transform: translateY(-30px) rotateY(270deg) rotateX(-15deg);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(45deg);
          }
          to {
            opacity: 1;
            transform: translateY(0px) rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
