import React, { useState, useEffect } from 'react';
import { FaCommentDots, FaHeart, FaFilter } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const tagColors = ['bg-pink-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500'];

const dummyUsers = [
  {
    id: 1,
    name: 'Aarav',
    age: 28,
    location: 'Hyderabad',
    education: 'MBA',
    profession: 'Marketing Manager',
    about: 'Love long walks and good books.',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    verified: true,
    premium: true,
    trust: 92,
    tags: ['Reading', 'Running', 'Wine Tasting'],
  },
  {
    id: 2,
    name: 'Meera',
    age: 26,
    location: 'Delhi',
    education: 'M.Tech',
    profession: 'Software Engineer',
    about: 'Tech geek, coffee addict, and Netflix binger.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    verified: true,
    premium: false,
    trust: 88,
    tags: ['Cooking', 'Gaming', 'Dancing'],
  },
  {
    id: 3,
    name: 'Rohit',
    age: 30,
    location: 'Bangalore',
    education: 'B.Tech',
    profession: 'Product Manager',
    about: 'Dream big. Work smart.',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
    verified: false,
    premium: true,
    trust: 79,
    tags: ['Photography', 'Traveling', 'Cycling'],
  },
  {
    id: 4,
    name: 'Ananya',
    age: 24,
    location: 'Mumbai',
    education: 'BA',
    profession: 'Artist',
    about: 'Expressing life through colors.',
    image: 'https://randomuser.me/api/portraits/women/21.jpg',
    verified: true,
    premium: false,
    trust: 90,
    tags: ['Painting', 'Music', 'Yoga'],
  },
  {
    id: 5,
    name: 'Sneha',
    age: 27,
    location: 'Chennai',
    education: 'B.Sc',
    profession: 'Nutritionist',
    about: 'Passionate about wellness and food.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    verified: false,
    premium: true,
    trust: 86,
    tags: ['Fitness', 'Cooking', 'Gardening'],
  },
  {
    id: 6,
    name: 'Priya',
    age: 25,
    location: 'Pune',
    education: 'MA Psychology',
    profession: 'Counselor',
    about: 'Empathy and kindness are my strengths.',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    verified: true,
    premium: true,
    trust: 95,
    tags: ['Reading', 'Therapy', 'Nature Walks'],
  },
  {
    id: 7,
    name: 'Isha',
    age: 29,
    location: 'Kolkata',
    education: 'PhD Literature',
    profession: 'Professor',
    about: 'Poetry, prose, and people.',
    image: 'https://randomuser.me/api/portraits/women/15.jpg',
    verified: true,
    premium: false,
    trust: 89,
    tags: ['Writing', 'Travel', 'Debating'],
  },
  {
    id: 8,
    name: 'Ritika',
    age: 31,
    location: 'Ahmedabad',
    education: 'B.Arch',
    profession: 'Architect',
    about: 'Designing dreams into reality.',
    image: 'https://randomuser.me/api/portraits/women/29.jpg',
    verified: true,
    premium: true,
    trust: 91,
    tags: ['Sketching', 'Biking', 'Nature'],
  },
  {
    id: 9,
    name: 'Divya',
    age: 23,
    location: 'Lucknow',
    education: 'B.Ed',
    profession: 'Teacher',
    about: 'Learning and growing together.',
    image: 'https://randomuser.me/api/portraits/women/51.jpg',
    verified: false,
    premium: false,
    trust: 82,
    tags: ['Singing', 'Teaching', 'Volunteering'],
  },
  {
    id: 10,
    name: 'Arjun',
    age: 32,
    location: 'Gurgaon',
    education: 'MS Finance',
    profession: 'Investment Banker',
    about: 'Numbers by day, adventures by night.',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
    verified: true,
    premium: true,
    trust: 93,
    tags: ['Finance', 'Adventure Sports', 'Travel'],
  },
  {
    id: 11,
    name: 'Kavya',
    age: 23,
    location: 'Kochi',
    education: 'BDS',
    profession: 'Dentist',
    about: 'Spreading smiles, one tooth at a time.',
    image: 'https://randomuser.me/api/portraits/women/87.jpg',
    verified: true,
    premium: false,
    trust: 87,
    tags: ['Healthcare', 'Volunteering', 'Photography'],
  },
  {
    id: 12,
    name: 'Vikram',
    age: 35,
    location: 'Jaipur',
    education: 'MBA Marketing',
    profession: 'Brand Manager',
    about: 'Creating stories that resonate with hearts.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    verified: false,
    premium: true,
    trust: 84,
    tags: ['Marketing', 'Storytelling', 'Cricket'],
  },
  {
    id: 13,
    name: 'Naina',
    age: 28,
    location: 'Indore',
    education: 'MA English',
    profession: 'Content Writer',
    about: 'Weaving words into beautiful narratives.',
    image: 'https://randomuser.me/api/portraits/women/76.jpg',
    verified: true,
    premium: true,
    trust: 91,
    tags: ['Writing', 'Literature', 'Coffee'],
  },
];

const Discover = () => {
  const [search, setSearch] = useState('');
  //const [chatUser, setChatUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Filter states
  const [ageRange, setAgeRange] = useState([22, 35]);
  const [locationFilter, setLocationFilter] = useState('');
  const [educationFilter, setEducationFilter] = useState('');
  const [professionFilter, setProfessionFilter] = useState('');
  const [religionFilter, setReligionFilter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const clearFilters = () => {
    setSearch('');
    setAgeRange([22, 35]);
    setLocationFilter('');
    setEducationFilter('');
    setProfessionFilter('');
    setReligionFilter('');
  };

  const filteredUsers = dummyUsers.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(search.toLowerCase());
    const ageMatch = user.age >= ageRange[0] && user.age <= ageRange[1];
    const locationMatch = locationFilter === '' || user.location.toLowerCase().includes(locationFilter.toLowerCase());
    const educationMatch = educationFilter === '' || user.education.toLowerCase() === educationFilter.toLowerCase();
    const professionMatch = professionFilter === '' || user.profession.toLowerCase().includes(professionFilter.toLowerCase());
    const religionMatch = religionFilter === '' || user.about.toLowerCase().includes(religionFilter.toLowerCase());
    return nameMatch && ageMatch && locationMatch && educationMatch && professionMatch && religionMatch;
  });

  const handleChat = (userId) => {
    navigate(`/messages/${userId}`);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#182384] to-[#ce759a] text-white font-sans perspective-1000 overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-3d-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-3d-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-3d-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-60 right-1/3 w-28 h-28 bg-green-500/20 rounded-full blur-xl animate-3d-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-yellow-500/20 rounded-full blur-xl animate-3d-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div 
        className="fixed w-6 h-6 bg-pink-400/30 rounded-full pointer-events-none z-10 transition-all duration-200 ease-out blur-sm"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'scale(1.5)'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 py-8 text-center relative z-10 transform-gpu pt-24">
        <div className={`mb-8 transform transition-all duration-1000 ease-out ${
          isLoaded ? 'animate-fade-in opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-12 rotate-x-45'
        }`}>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent transform transition-all duration-700 hover:scale-110 hover:rotate-x-3 preserve-3d">
            ✨ Discover Amazing People ✨
          </h1>
          <p className="mb-6 text-xl text-pink-100 transform transition-all duration-500 hover:scale-105 hover:text-yellow-200">
            Find someone special with our advanced search and magical filtering options.
          </p>
        </div>

        <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 transform transition-all duration-1000 ease-out hover:scale-105 hover:rotate-x-3 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] preserve-3d group ${
          isLoaded ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ animationDelay: '300ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="relative flex-grow group/search">
              <input
                type="text"
                placeholder="🔍 Search by name, location, or profession..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none border-2 border-transparent focus:border-pink-400 transform transition-all duration-500 hover:scale-105 focus:scale-110 hover:bg-white/30 shadow-lg"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover/search:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-xl flex items-center gap-3 font-semibold transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:-translate-y-2 shadow-lg hover:shadow-2xl">
              <FaFilter className="animate-pulse" /> 
              <span>Filters</span>
            </button>
          </div>

          <hr className="border-white/30 mb-6 transform transition-all duration-500 group-hover:border-pink-300/50" />

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <label className="block text-white text-sm font-semibold mb-3 transform transition-all duration-300 hover:text-yellow-300">❤️ Age Range</label>
              <input 
                type="range" 
                min="18" 
                max="50" 
                value={ageRange[0]} 
                onChange={(e) => setAgeRange([+e.target.value, ageRange[1]])} 
                className="w-full accent-pink-500 transform transition-all duration-300 hover:scale-110" 
              />
              <div className="text-white text-sm mt-2 font-medium bg-black/30 rounded-full px-3 py-1 inline-block transform transition-all duration-300 hover:bg-pink-500/30">{ageRange[0]} - {ageRange[1]}</div>
            </div>
            
            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2" style={{transitionDelay: '100ms'}}>
              <label className="block text-white text-sm font-semibold mb-3 transform transition-all duration-300 hover:text-yellow-300">📍 Location</label>
              <input 
                type="text" 
                value={locationFilter} 
                onChange={(e) => setLocationFilter(e.target.value)} 
                placeholder="Enter city or country" 
                className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none border-2 border-transparent focus:border-blue-400 transform transition-all duration-300 hover:scale-105 focus:scale-110 hover:bg-white/30" 
              />
            </div>
            
            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2" style={{transitionDelay: '200ms'}}>
              <label className="block text-white text-sm font-semibold mb-3 transform transition-all duration-300 hover:text-yellow-300">🎓 Education</label>
              <select 
                value={educationFilter} 
                onChange={(e) => setEducationFilter(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md text-black focus:outline-none border-2 border-transparent focus:border-green-400 transform transition-all duration-300 hover:scale-105 focus:scale-110 hover:bg-white/30"
              >
                <option value="">Select education</option>
                <option>MBA</option>
                <option>M.Tech</option>
                <option>B.Tech</option>
                <option>BA</option>
                <option>B.Sc</option>
                <option>MA Psychology</option>
                <option>PhD Literature</option>
                <option>B.Arch</option>
                <option>B.Ed</option>
                <option>MS Finance</option>
                <option>BDS</option>
                <option>MBA Marketing</option>
                <option>MA English</option>
              </select>
            </div>
            
            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2" style={{transitionDelay: '300ms'}}>
              <label className="block text-white text-sm font-semibold mb-3 transform transition-all duration-300 hover:text-yellow-300">💼 Profession</label>
              <input 
                type="text" 
                value={professionFilter} 
                onChange={(e) => setProfessionFilter(e.target.value)} 
                placeholder="Enter profession" 
                className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none border-2 border-transparent focus:border-purple-400 transform transition-all duration-300 hover:scale-105 focus:scale-110 hover:bg-white/30" 
              />
            </div>
            
            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2" style={{transitionDelay: '400ms'}}>
              <label className="block text-white text-sm font-semibold mb-3 transform transition-all duration-300 hover:text-yellow-300">🙏 Religion</label>
              <select 
                value={religionFilter} 
                onChange={(e) => setReligionFilter(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md text-black focus:outline-none border-2 border-transparent focus:border-yellow-400 transform transition-all duration-300 hover:scale-105 focus:scale-110 hover:bg-white/30"
              >
                <option value="">Select religion</option>
                <option>Hindu</option>
                <option>Muslim</option>
                <option>Christian</option>
                <option>Sikh</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 text-right relative z-10">
            <button 
              onClick={clearFilters} 
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
            >
              🧹 Clear Filters
            </button>
          </div>
        </div>

        <div className={`mt-8 transform transition-all duration-1000 ease-out ${
          isLoaded ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ animationDelay: '600ms' }}>
          <p className="text-lg text-white opacity-90 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 inline-block transform transition-all duration-500 hover:scale-110 hover:bg-pink-500/30">
            ✨ Found {filteredUsers.length} magical matches ✨
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 pb-24 perspective-2000 relative z-10">
        {filteredUsers.map((user, idx) => (
          <div 
            key={user.id} 
            className={`h-[500px] bg-gradient-to-br from-[#7D3DEA] via-[#9B59B6] to-[#FA6DAA] text-white rounded-2xl shadow-2xl overflow-hidden transform-gpu transition-all duration-1000 ease-out hover:scale-110 hover:rotate-y-12 hover:rotate-x-6 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:-translate-y-8 hover:z-50 text-sm preserve-3d group cursor-pointer ${
              isLoaded ? 'animate-fade-in opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-12 rotate-x-45'
            }`}
            style={{
              animationDelay: `${idx * 150}ms`,
              transform: `translateZ(${idx * 10}px) rotateY(${Math.sin(idx) * 2}deg)`,
            }}
          >
            <div className="relative overflow-hidden">
              <img 
                src={user.image} 
                alt={user.name} 
                className="w-full h-56 object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-3 transform-gpu" 
                style={{ filter: 'brightness(0.9) contrast(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-700"></div>
              
              <div className="absolute top-3 left-3 flex gap-2 transform transition-all duration-700 group-hover:translate-x-3 group-hover:-translate-y-2 group-hover:rotate-3">
                {user.verified && (
                  <span className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full transform transition-all duration-500 hover:scale-125 hover:rotate-12 shadow-lg backdrop-blur-sm animate-pulse">
                    ✓ Verified
                  </span>
                )}
                {user.premium && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs px-3 py-1.5 rounded-full transform transition-all duration-500 hover:scale-125 hover:rotate-12 shadow-lg font-semibold">
                    💎 Premium
                  </span>
                )}
              </div>
              
              <div className="absolute top-3 right-3 bg-white/95 text-black text-xs px-3 py-1.5 rounded-full font-bold shadow-xl transform transition-all duration-700 group-hover:-translate-x-3 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] backdrop-blur-sm">
                {user.trust}% Trust ⭐
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                <div className="text-pink-300 text-2xl animate-pulse">💖</div>
              </div>
            </div>
            
            <div className="p-4 transform transition-all duration-700 group-hover:translate-y-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <h3 className="text-xl font-bold transform transition-all duration-500 group-hover:scale-105 group-hover:text-yellow-300 relative z-10">
                {user.name}, {user.age} ✨
              </h3>
              <p className="text-pink-100 transform transition-all duration-500 group-hover:translate-x-2 group-hover:text-pink-200 relative z-10">
                📍 {user.location}
              </p>
              <p className="transform transition-all duration-500 group-hover:translate-x-2 group-hover:text-purple-200 relative z-10">
                🎓 {user.education} | 💼 {user.profession}
              </p>
              <p className="italic text-pink-100 transform transition-all duration-500 group-hover:translate-x-2 group-hover:text-pink-200 mt-1 relative z-10">
                "{user.about}"
              </p>
              
              {/* Enhanced Tags with Wave Animation */}
              <div className="flex flex-wrap gap-2 mt-3 relative z-10">
                {user.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className={`${tagColors[idx % tagColors.length]} text-white text-xs px-3 py-1.5 rounded-full transform transition-all duration-500 hover:scale-125 hover:rotate-6 hover:-translate-y-2 shadow-lg cursor-pointer hover:shadow-xl`}
                    style={{
                      transitionDelay: `${i * 100}ms`,
                      animation: `pulse 2s infinite ${i * 0.5}s`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-4 gap-3 relative z-10">
                <button className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/80 transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/20 hover:border-red-400">
                  ❌ Pass
                </button>
                <button 
                  onClick={() => handleChat(user.id)}
                  className="bg-blue-500/80 backdrop-blur-md hover:bg-blue-600 px-4 py-2 rounded-full flex items-center gap-2 transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/20 hover:border-blue-300"
                >
                  <FaCommentDots className="transform transition-all duration-300 hover:rotate-12 hover:scale-125" /> 
                  💬 Chat
                </button>
                <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 px-4 py-2 rounded-full flex items-center gap-2 transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/20 hover:border-pink-300">
                  <FaHeart className="transform transition-all duration-300 hover:rotate-12 hover:scale-125 animate-pulse" /> 
                  💕 Like
                </button>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Hints */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium animate-bounce opacity-70 pointer-events-none z-20">
        ✨ Hover over cards for magical 3D effects! ✨
      </div>

      {/* Enhanced 3D Animations CSS */}
      <style>{`
        @keyframes 3d-float {
          0%, 100% { 
            transform: translateY(0px) rotateY(0deg) rotateX(0deg); 
            opacity: 0.7; 
          }
          25% { 
            transform: translateY(-10px) rotateY(90deg) rotateX(5deg); 
            opacity: 1; 
          }
          50% { 
            transform: translateY(-15px) rotateY(180deg) rotateX(-5deg); 
            opacity: 0.8; 
          }
          75% { 
            transform: translateY(-5px) rotateY(270deg) rotateX(3deg); 
            opacity: 1; 
          }
        }
        
        @keyframes fade-in {
          0% { 
            opacity: 0; 
            transform: translateY(30px) rotateX(45deg); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) rotateX(0deg); 
          }
        }
        
        .animate-3d-float {
          animation: 3d-float 4s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .perspective-2000 {
          perspective: 2000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
};

export default Discover;
