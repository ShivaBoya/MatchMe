import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";

const recentActivity = [
  { name: "Sarah", action: "liked your profile", time: "2 hours ago", icon: "❤️" },
  { name: "Emily", action: "New message from", time: "5 hours ago", icon: "💬" },
  { name: "Alex", action: "viewed your profile", time: "1 day ago", icon: "👀" },
  { name: "Priya", action: "sent you a wink", time: "3 hours ago", icon: "😉" },
  { name: "James", action: "liked your photo", time: "6 hours ago", icon: "📸" },
];

const mockMatches = [
  {
    id: 101,
    name: "Sophia",
    age: 24,
    location: "Mumbai",
    education: "Fashion Design",
    profession: "Designer",
    about: "Designing my own path.",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    verified: true,
    premium: true,
    trustScore: 95,
    hobbies: ["Fashion", "Travel", "Art"],
  },
  {
    id: 102,
    name: "Rohan",
    age: 29,
    location: "Bangalore",
    education: "MBA",
    profession: "Entrepreneur",
    about: "Building the future.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
    premium: false,
    trustScore: 88,
    hobbies: ["Startup", "Tech", "Gym"],
  },
  {
    id: 103,
    name: "Zara",
    age: 26,
    location: "Delhi",
    education: "Masters in Psychology",
    profession: "Psychologist",
    about: "Understanding minds, healing hearts.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    verified: false,
    premium: true,
    trustScore: 92,
    hobbies: ["Reading", "Yoga", "Coffee"],
  }
];

export default function Matches() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [matches, setMatches] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserName(user.displayName || "User");
        }

        const usersRef = collection(db, 'users');

        // Create a timeout promise to prevent slow loading
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 1500)
        );

        // Race fetching against timeout
        const querySnapshot = await Promise.race([
          getDocs(usersRef),
          timeoutPromise
        ]);

        const usersList = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(u => u.id !== user?.uid); // Exclude current user

        if (usersList.length === 0) {
          console.log("No matches found in DB, using mock data");
          setMatches(mockMatches);
        } else {
          setMatches(usersList);
        }
      } catch (error) {
        console.warn("Network slow or data missing, switching to offline mode:", error.message);
        setMatches(mockMatches); // Safe fallback
      } finally {
        // Trigger animation
        setTimeout(() => setIsLoaded(true), 100);
      }
    };

    fetchMatches();
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#182384] to-[#ce759a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mx-auto mb-4"></div>
          <h2 className="text-2xl text-white font-bold animate-pulse">Finding your perfect matches...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#182384] to-[#ce759a] text-white perspective-1000">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        {/* Welcome section with 3D Animation */}
        <div className={`bg-gradient-to-r from-[#9d50bb] to-[#6e48aa] p-6 md:p-8 rounded-2xl mt-8 shadow-2xl transform-gpu transition-all duration-1000 ease-out ${isLoaded ? 'animate-fade-in translate-y-0 rotate-x-0' : 'opacity-0 translate-y-12 rotate-x-45'
          } hover:scale-105 hover:rotate-x-3 hover:shadow-2xl`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="transform transition-all duration-500 hover:translate-x-2">
              <h1 className="text-3xl font-bold animate-3d-float">Welcome back, {userName} 👋</h1>
              <p className="text-white/80 text-sm mt-1 transform transition-all duration-300 hover:scale-105">
                You have 7 new matches waiting for you.
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:-translate-y-1 shadow-lg">
                💎 Premium
              </span>
              <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:-translate-y-1 shadow-lg">
                Trust Score: 85%
              </span>
            </div>
          </div>
        </div>

        {/* Stats section with Staggered 3D Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { value: "156", label: "Profile Views" },
            { value: matches.length, label: "Matches" },
            { value: "12", label: "Messages" },
            { value: "85%", label: "Trust Score" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-white/10 backdrop-blur-md p-5 rounded-2xl text-center transform-gpu transition-all duration-700 ease-out hover:scale-110 hover:rotate-y-6 hover:shadow-2xl hover:-translate-y-2 ${isLoaded ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{
                animationDelay: `${idx * 200}ms`,
                transformStyle: 'preserve-3d'
              }}
            >
              <p className="text-3xl font-bold text-white animate-3d-float">{stat.value}</p>
              <p className="text-sm text-white/80 mt-1 transform transition-all duration-300 hover:scale-105">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Suggested Matches with 3D Card Effects */}
        <h2 className={`mt-10 text-2xl font-semibold transform transition-all duration-1000 ${isLoaded ? 'animate-fade-in translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          Suggested Matches
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 perspective-1000">
          {matches.length === 0 && isLoaded ? (
            <div className="col-span-full text-center py-20 animate-fade-in bg-white/5 rounded-2xl border border-white/10">
              <div className="text-6xl mb-4">👀</div>
              <h2 className="text-3xl font-bold text-white mb-2">No matches found yet</h2>
              <p className="text-pink-100 text-lg max-w-md mx-auto mb-6">
                Don't worry, your perfect match is just around the corner!
                Try updating your profile to attract more people.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-lg transition-all hover:scale-105"
              >
                Update Profile
              </button>
            </div>
          ) : (
            matches.map((match, i) => (
              <div
                key={match.id}
                className={`bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl relative transform-gpu transition-all duration-700 ease-out hover:scale-110 hover:rotate-y-12 hover:rotate-x-6 hover:shadow-2xl hover:-translate-y-4 preserve-3d group ${isLoaded ? 'animate-fade-in opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-12 rotate-x-45'
                  }`}
                style={{
                  animationDelay: `${i * 150}ms`,
                  transform: `translateZ(${i * 5}px)`,
                }}
              >
                {/* Badges with 3D Animation */}
                <div className="absolute top-3 left-3 flex gap-2 z-20 transform transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-1">
                  {match.verified && (
                    <span className="bg-green-500 text-xs px-2 py-0.5 rounded-full transform transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg">
                      Verified
                    </span>
                  )}
                  {match.premium && (
                    <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full transform transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg">
                      Premium
                    </span>
                  )}
                </div>

                {/* Trust Score with 3D Effect */}
                <div className="absolute top-3 right-3 z-20 transform transition-all duration-500 group-hover:-translate-x-2 group-hover:-translate-y-1">
                  <span className="bg-white text-black text-xs font-semibold px-2 py-0.5 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-6">
                    {match.trustScore || '80%'} Trust
                  </span>
                </div>

                {/* Image with 3D Hover Effect */}
                <div className="relative overflow-hidden">
                  <img
                    src={match.profilePicUrl || match.image || "https://randomuser.me/api/portraits/lego/1.jpg"}
                    alt={match.name}
                    className="w-full h-52 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                </div>

                {/* Content with Staggered Animation */}
                <div className="p-4 transform transition-all duration-500 group-hover:translate-y-2">
                  <h3 className="font-bold text-lg transform transition-all duration-300 group-hover:scale-105">
                    {match.name}, {match.age || '?'}
                  </h3>
                  <div className="flex items-center text-sm text-white/80 mt-1 transform transition-all duration-300 group-hover:translate-x-1">
                    <FaMapMarkerAlt className="mr-1 transform transition-all duration-300 group-hover:rotate-12" />
                    {match.location || 'Unknown'}
                  </div>
                  <div className="mt-1 text-sm text-white/70 transform transition-all duration-300 group-hover:translate-x-1">
                    {match.education || '-'} | {match.profession || '-'}
                  </div>
                  <p className="text-sm mt-2 text-white transform transition-all duration-300 group-hover:translate-x-1 truncate">
                    {match.bio || match.about || 'No bio available'}
                  </p>

                  {/* Hobbies with Individual 3D Animation */}
                  <div className="flex flex-wrap gap-2 mt-3 h-16 overflow-hidden">
                    {(Array.isArray(match.hobbies) ? match.hobbies : (match.tags || [])).map((hobby, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full transform transition-all duration-300 hover:scale-110 hover:rotate-6 hover:-translate-y-1 shadow-md"
                        style={{
                          transitionDelay: `${idx * 100}ms`
                        }}
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons with 3D Effects */}
                  <div className="mt-4 flex justify-between gap-2">
                    <button className="bg-black/80 hover:bg-black px-4 py-1 text-sm rounded-full transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:-translate-y-1 shadow-lg">
                      Pass
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/messages/${match.id}`)
                      }
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-1 text-sm rounded-full flex items-center gap-1 transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:-translate-y-1 shadow-lg"
                    >
                      <FaComments className="transform transition-all duration-300 hover:rotate-12" /> Chat
                    </button>
                    <button className="bg-pink-500 hover:bg-pink-600 px-4 py-1 text-sm rounded-full transform transition-all duration-300 hover:scale-110 hover:rotate-3 hover:-translate-y-1 shadow-lg">
                      ❤️ Like
                    </button>
                  </div>
                </div>
              </div>
            )))
          }
        </div>

        {/* Recent Activity with 3D Animation */}
        <h2 className={`mt-12 text-2xl font-semibold transform transition-all duration-1000 ${isLoaded ? 'animate-fade-in translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ animationDelay: '1s' }}>
          Recent Activity
        </h2>

        <div className={`mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-4 shadow-2xl transform transition-all duration-1000 ${isLoaded ? 'animate-fade-in translate-y-0' : 'opacity-0 translate-y-8'
          } hover:scale-105 hover:shadow-2xl`} style={{ animationDelay: '1.2s' }}>
          {recentActivity.map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white/10 backdrop-blur-md p-3 rounded-lg transform transition-all duration-500 hover:scale-105 hover:translate-x-2 hover:shadow-lg"
              style={{
                animationDelay: `${1.4 + i * 0.1}s`
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg transform transition-all duration-300 hover:rotate-y-45 hover:scale-125">
                  {activity.icon}
                </div>
                <div className="transform transition-all duration-300 hover:translate-x-1">
                  <p className="text-white text-sm font-medium">
                    {activity.name} {activity.action}
                  </p>
                  <p className="text-white/70 text-xs">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}