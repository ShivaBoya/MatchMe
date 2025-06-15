import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const mockMatches = [
  {
    name: "Sarah ",
    age: 26,
    location: "Los Angeles, USA",
    trustScore: "92%",
    verified: true,
    premium: false,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    education: "Bachelors",
    profession: "Graphic Designer",
    bio: "Creative soul looking for someone to share life's beautiful moments with.",
    hobbies: ["Art", "Yoga", "Cooking", "+1 more"],
  },
  {
    name: "Emily Davis",
    age: 29,
    location: "Chicago, USA",
    trustScore: "88%",
    verified: true,
    premium: true,
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    education: "Masters",
    profession: "Marketing Manager",
    bio: "Ambitious professional seeking a partner who values both career and family.",
    hobbies: ["Reading", "Running", "Wine Tasting", "+1 more"],
  },
  {
    name: "Alex Chen",
    age: 31,
    location: "San Francisco, USA",
    trustScore: "94%",
    verified: true,
    premium: true,
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    education: "PhD",
    profession: "Data Scientist",
    bio: "Tech enthusiast who believes in mindful living and meaningful connections.",
    hobbies: ["Meditation", "Hiking", "Technology", "+1 more"],
  },
  {
    name: "Priya Sharma",
    age: 27,
    location: "Mumbai, India",
    trustScore: "90%",
    verified: true,
    premium: true,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    education: "Masters",
    profession: "Doctor",
    bio: "Passionate about healing and helping others. Looking for a life partner to share dreams with.",
    hobbies: ["Medicine", "Dancing", "Travel", "+2 more"],
  },
  {
    name: "James Wilson",
    age: 30,
    location: "London, UK",
    trustScore: "87%",
    verified: true,
    premium: false,
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    education: "Masters",
    profession: "Architect",
    bio: "Building dreams into reality. Seeking someone who appreciates art and architecture.",
    hobbies: ["Architecture", "Photography", "Coffee", "+1 more"],
  },
  {
    name: "Ananya Reddy",
    age: 25,
    location: "Bangalore, India",
    trustScore: "91%",
    verified: true,
    premium: true,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    education: "B.Tech",
    profession: "Software Engineer",
    bio: "Tech geek by day, artist by night. Looking for someone who can appreciate both sides.",
    hobbies: ["Coding", "Painting", "Gaming", "+1 more"],
  },
  {
    name: "Michael Brown",
    age: 28,
    location: "Toronto, Canada",
    trustScore: "89%",
    verified: false,
    premium: true,
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    education: "MBA",
    profession: "Business Analyst",
    bio: "Adventure seeker and business minded. Ready to explore life with the right person.",
    hobbies: ["Business", "Adventure", "Sports", "+2 more"],
  },
];

const recentActivity = [
  { name: "Sarah", action: "liked your profile", time: "2 hours ago", icon: "❤️" },
  { name: "Emily", action: "New message from", time: "5 hours ago", icon: "💬" },
  { name: "Alex", action: "viewed your profile", time: "1 day ago", icon: "👀" },
  { name: "Priya", action: "sent you a wink", time: "3 hours ago", icon: "😉" },
  { name: "James", action: "liked your photo", time: "6 hours ago", icon: "📸" },
];

export default function Matches() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || "User");
    }
    
    // Trigger animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#182384] to-[#ce759a] text-white perspective-1000">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        {/* Welcome section with 3D Animation */}
        <div className={`bg-gradient-to-r from-[#9d50bb] to-[#6e48aa] p-6 md:p-8 rounded-2xl mt-8 shadow-2xl transform-gpu transition-all duration-1000 ease-out ${
          isLoaded ? 'animate-fade-in translate-y-0 rotate-x-0' : 'opacity-0 translate-y-12 rotate-x-45'
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
            { value: "24", label: "Matches" },
            { value: "12", label: "Messages" },
            { value: "85%", label: "Trust Score" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-white/10 backdrop-blur-md p-5 rounded-2xl text-center transform-gpu transition-all duration-700 ease-out hover:scale-110 hover:rotate-y-6 hover:shadow-2xl hover:-translate-y-2 ${
                isLoaded ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
        <h2 className={`mt-10 text-2xl font-semibold transform transition-all duration-1000 ${
          isLoaded ? 'animate-fade-in translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Suggested Matches
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 perspective-1000">
          {mockMatches.map((match, i) => (
            <div
              key={i}
              className={`bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl relative transform-gpu transition-all duration-700 ease-out hover:scale-110 hover:rotate-y-12 hover:rotate-x-6 hover:shadow-2xl hover:-translate-y-4 preserve-3d group ${
                isLoaded ? 'animate-fade-in opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-12 rotate-x-45'
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
                  {match.trustScore} Trust
                </span>
              </div>

              {/* Image with 3D Hover Effect */}
              <div className="relative overflow-hidden">
                <img 
                  src={match.image} 
                  alt={match.name} 
                  className="w-full h-52 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-3" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
              </div>

              {/* Content with Staggered Animation */}
              <div className="p-4 transform transition-all duration-500 group-hover:translate-y-2">
                <h3 className="font-bold text-lg transform transition-all duration-300 group-hover:scale-105">
                  {match.name}, {match.age}
                </h3>
                <div className="flex items-center text-sm text-white/80 mt-1 transform transition-all duration-300 group-hover:translate-x-1">
                  <FaMapMarkerAlt className="mr-1 transform transition-all duration-300 group-hover:rotate-12" /> 
                  {match.location}
                </div>
                <div className="mt-1 text-sm text-white/70 transform transition-all duration-300 group-hover:translate-x-1">
                  {match.education} | {match.profession}
                </div>
                <p className="text-sm mt-2 text-white transform transition-all duration-300 group-hover:translate-x-1">
                  {match.bio}
                </p>

                {/* Hobbies with Individual 3D Animation */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {match.hobbies.map((hobby, idx) => (
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
                      navigate(`/messages/${match.name.toLowerCase().replace(/\s/g, "")}`)
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
          ))}
        </div>

        {/* Recent Activity with 3D Animation */}
        <h2 className={`mt-12 text-2xl font-semibold transform transition-all duration-1000 ${
          isLoaded ? 'animate-fade-in translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ animationDelay: '1s' }}>
          Recent Activity
        </h2>
        
        <div className={`mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-4 shadow-2xl transform transition-all duration-1000 ${
          isLoaded ? 'animate-fade-in translate-y-0' : 'opacity-0 translate-y-8'
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