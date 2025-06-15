import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaRobot, FaCheckCircle, FaComments, FaCrown } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      icon: <FaRobot className="text-4xl text-pink-400 mb-4 mx-auto transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />,
      title: "AI-Powered Matching",
      desc: "Our advanced algorithm finds your perfect match based on deep compatibility analysis.",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-green-400 mb-4 mx-auto transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />,
      title: "Verified Profiles",
      desc: "All profiles are verified to ensure authentic connections and build trust.",
    },
    {
      icon: <FaComments className="text-4xl text-yellow-400 mb-4 mx-auto transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />,
      title: "Smart Chat System",
      desc: "Intelligent chat features with sentiment analysis and privacy controls.",
    },
    {
      icon: <FaCrown className="text-4xl text-orange-400 mb-4 mx-auto transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />,
      title: "Premium Features",
      desc: "Unlock advanced matching, unlimited messages, and exclusive features.",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#182384] to-[#ce759a] text-[#333] font-sans overflow-hidden relative perspective-1000">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400/20 rounded-full animate-3d-float blur-sm"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-3d-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full animate-3d-float blur-sm" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-yellow-400/20 rounded-full animate-3d-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-green-400/20 rounded-full animate-3d-float blur-sm" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Interactive Cursor Follow Effect */}
      <div 
        className="fixed w-6 h-6 bg-pink-400/30 rounded-full pointer-events-none z-10 transition-all duration-200 ease-out blur-sm"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'scale(1.5)'
        }}
      ></div>

      {/* Overlay when menu open */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-[#182384] to-[#ce759a] px-8 py-4 text-[#d66efb] flex justify-between items-center backdrop-blur-md bg-opacity-90 transform-gpu">
        <div className="text-xl font-bold flex items-center gap-2 ml-4 md:ml-12 transform hover:scale-105 transition-all duration-300">
          <span className="text-lg animate-heartbeat drop-shadow-[0_0_15px_#ff6aa4cc] transform hover:rotate-y-12 transition-all duration-500">💗SoulConnect</span>
        </div>

        {/* Desktop Buttons */}
       <div className="hidden md:flex gap-5 mr-12 transform hover:scale-105 transition-transform duration-300">
  <button 
    onClick={() => navigate("/login")} 
    className="bg-[#ff6aa4] text-[#6236ff] px-4 py-2 rounded-full font-medium hover:bg-[#eee] hover:scale-110 transition-all duration-300 transform hover:rotate-y-6 hover:shadow-2xl"
  >
    Login
  </button>
  <button 
    onClick={() => navigate("/register")} 
    className="bg-[#ff6aa4] text-[#6236ff] px-4 py-2 rounded-full font-medium hover:bg-[#eee] hover:scale-110 transition-all duration-300 transform hover:rotate-y-6 hover:shadow-2xl"
  >
    Sign Up
  </button>
</div>


        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center mr-4 z-50">
          <button 
            onClick={() => setMobileMenu(!mobileMenu)}
            className="transform hover:scale-110 transition-all duration-300 hover:rotate-180"
          >
            {mobileMenu ? (
              <FaTimes className="text-2xl text-pink-300 animate-rotate-y" />
            ) : (
              <FaBars className="text-2xl text-pink-300 hover:animate-pulse" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="fixed top-16 right-4 bg-white text-black rounded-lg shadow-lg z-50 flex flex-col p-4 w-40 md:hidden animate-fade-in transform scale-100 hover:scale-105 transition-all duration-300">
  <button 
    onClick={() => { 
      navigate("/login"); 
      setMobileMenu(false); 
    }} 
    className="mb-2 bg-pink-200 text-[#6236ff] px-4 py-2 rounded font-medium hover:bg-pink-300 transform hover:scale-105 hover:rotate-x-3 transition-all duration-300"
  >
    Login
  </button>
  <button 
    onClick={() => { 
      navigate("/register"); 
      setMobileMenu(false); 
    }} 
    className="bg-pink-200 text-[#6236ff] px-4 py-2 rounded font-medium hover:bg-pink-300 transform hover:scale-105 hover:rotate-x-3 transition-all duration-300"
  >
    Sign Up
  </button>
</div>
      )}

      {/* HERO SECTION */}
      <header className="hero text-center pt-52 pb-24 px-4 bg-gradient-to-br from-[#182384] to-[#ce759a] text-white relative min-h-[80vh] preserve-3d">
        <div className="text-5xl md:text-6xl font-bold leading-tight mb-6 transform hover:scale-105 transition-all duration-500 animate-fade-in">
          Find Your <br />
          <span className="text-[#ce759a] animate-heartbeat transform hover:rotate-y-12 transition-all duration-500 inline-block">Perfect Match </span>
        </div>
        <p className="text-lg mb-8 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
          Join millions of people finding meaningful relationships through <br /> our AI-powered matching system.
        </p>
        <div className="flex justify-center gap-4 flex-wrap animate-fade-in" style={{animationDelay: '0.4s'}}>
          <a 
            href="/register" 
            className="bg-[#eb709f] text-[#6236ff] px-6 py-3 rounded-lg font-bold hover:bg-[#e0e0ff] hover:scale-110 transition-all duration-300 transform hover:rotate-y-6 hover:shadow-2xl"
          >
            Start Your Journey ⟶
          </a>
          <a 
            href="#why" 
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 hover:scale-110 transition-all duration-300 transform hover:rotate-y-6 hover:shadow-2xl"
          >
            Learn More
          </a>
        </div>

        {/* 3D Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 text-6xl text-pink-400/50 animate-3d-float transform hover:scale-125 transition-all duration-300">💝</div>
          <div className="absolute bottom-32 left-10 text-4xl text-purple-400/50 animate-3d-float transform hover:scale-125 transition-all duration-300" style={{animationDelay: '1s'}}>💕</div>
          <div className="absolute top-1/2 right-1/4 text-5xl text-yellow-400/50 animate-3d-float transform hover:scale-125 transition-all duration-300" style={{animationDelay: '2s'}}>💖</div>
          <div className="absolute bottom-20 right-20 text-3xl text-green-400/50 animate-3d-float transform hover:scale-125 transition-all duration-300" style={{animationDelay: '0.5s'}}>💗</div>
        </div>
      </header>

      {/* WHY SECTION */}
      <section id="why" className="py-24 text-center bg-gradient-to-br from-[#182384] to-[#ad738b] text-white px-4 relative">
        <h2 className="text-3xl font-semibold transform hover:scale-105 transition-all duration-300 animate-fade-in">Why Choose SoulConnect?</h2>
        <p className="mt-2 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
          Experience the future of online dating with our <br /> innovative features designed to help you find lasting love.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-4/5 mx-auto">
          {features.map((item, idx) => (
            <div 
              key={idx} 
              className="group p-6 rounded-lg shadow-md bg-white/10 transition-all duration-500 hover:scale-110 hover:rotate-y-6 text-center transform hover:shadow-2xl hover:bg-white/20 backdrop-blur-sm animate-fade-in"
              style={{animationDelay: `${0.2 + idx * 0.1}s`}}
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2 transform group-hover:scale-105 transition-all duration-300">{item.title}</h3>
              <p className="transform group-hover:scale-105 transition-all duration-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="py-24 text-center bg-gradient-to-br from-[#182384] to-[#ad738b] text-white px-4 relative">
        <h2 className="text-3xl font-semibold transform hover:scale-105 transition-all duration-300 animate-fade-in">Success Stories</h2>
        <p className="mt-2 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
          Real couples who found love through SoulConnect.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-10 w-4/5 mx-auto">
          {[
            {
              img: "https://randomuser.me/api/portraits/women/79.jpg",
              name: "Sarah & John",
              quote: "We found each other through SoulConnect and it was love at first chat! The compatibility score was 98%.",
            },
            {
              img: "https://randomuser.me/api/portraits/women/65.jpg",
              name: "Emily & Alex",
              quote: "The AI matching is incredible. We have so much in common and the trust score feature gave us confidence.",
            },
            {
              img: "https://randomuser.me/api/portraits/women/50.jpg",
              name: "Maria & David",
              quote: "Premium features helped us connect deeper. Now we're planning our wedding!",
            },
          ].map((story, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-lg shadow-md bg-white/10 transition-all duration-500 hover:scale-110 hover:rotate-y-6 transform hover:shadow-2xl hover:bg-white/20 backdrop-blur-sm animate-fade-in"
              style={{animationDelay: `${0.2 + idx * 0.1}s`}}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <img
                  src={story.img}
                  alt={story.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-pink-300 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"
                />
                <h4 className="text-xl font-semibold transform group-hover:scale-105 transition-all duration-300">{story.name}</h4>
              </div>
              <p className="transform group-hover:scale-105 transition-all duration-300">{story.quote}</p>
              <div className="text-yellow-400 mt-2 transform group-hover:scale-125 transition-all duration-300">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-24 bg-gradient-to-br from-[#182384] to-[#ad738b] text-white px-4 relative">
        <h2 className="text-3xl font-semibold transform hover:scale-105 transition-all duration-300 animate-fade-in">Ready to Find Love?</h2>
        <p className="mt-2 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
          Join thousands of successful couples who found their soulmate on SoulConnect.
        </p>
        <a 
          href="/register" 
          className="inline-block mt-6 bg-[#eb709f] text-[#6236ff] px-6 py-3 rounded-lg font-bold hover:bg-[#e0e0ff] hover:scale-110 transition-all duration-300 transform hover:rotate-y-6 hover:shadow-2xl animate-fade-in"
          style={{animationDelay: '0.2s'}}
        >
          Get Started Today ⟶
        </a>
      </section>

      {/* FOOTER */}
      <footer className="w-full text-center py-6 bg-gradient-to-br from-[#182384] to-[#ce759a] text-[#d66efb] mt-auto relative">
        <div className="flex justify-center gap-6 text-2xl">
          <a href="#" className="text-[#eb709f] hover:text-[#ff91b8] transform transition-all duration-300 hover:scale-125 hover:rotate-12"><i className='bx bxl-github'></i></a>
          <a href="#" className="text-[#eb709f] hover:text-[#ff91b8] transform transition-all duration-300 hover:scale-125 hover:rotate-12"><i className='bx bxl-linkedin'></i></a>
          <a href="#" className="text-[#eb709f] hover:text-[#ff91b8] transform transition-all duration-300 hover:scale-125 hover:rotate-12"><i className='bx bxl-whatsapp'></i></a>
        </div>
      </footer>

      {/* Enhanced Animations */}
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1) rotateY(0deg); }
          25% { transform: scale(1.1) rotateY(5deg); }
          50% { transform: scale(0.95) rotateY(-5deg); }
          75% { transform: scale(1.05) rotateY(3deg); }
        }
        
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
        
        @keyframes rotate-y {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        
        .animate-heartbeat {
          animation: heartbeat 3s infinite;
          display: inline-block;
        }
        
        .animate-3d-float {
          animation: 3d-float 4s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-rotate-y {
          animation: rotate-y 0.5s ease-in-out;
        }
        
        .hero::before,
        .hero::after {
          content: "♥";
          position: absolute;
          color: #ff6aa4;
          opacity: 0.3;
          animation: 3d-float 6s infinite ease-in-out;
          pointer-events: none;
        }
        
        .hero::before {
          bottom: 40px;
          right: 10%;
          font-size: 8rem;
          animation-delay: 1s;
        }
        
        .hero::after {
          top: 40%;
          left: 20%;
          animation-delay: 3s;
          font-size: 6rem;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Backdrop blur effect */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
}
