import React from "react";

export default function PremiumPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-[#6C1BD5] to-[#FFD700] bg-opacity-95 flex flex-col items-center justify-center z-50 px-4 py-10 overflow-auto animate-fade-in">
      <div className="w-full max-w-5xl bg-gradient-to-br from-black to-[#3c1361] text-white rounded-2xl p-8 shadow-2xl border border-yellow-400 relative perspective-1000 animate-scale-in transform-gpu">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl hover:text-yellow-200 transition-all duration-300 hover:scale-125 hover:rotate-90 z-10"
        >
          ✕
        </button>

        <h2 className="text-3xl font-extrabold text-center mb-10 tracking-wide drop-shadow-lg text-yellow-300 animate-fade-in transform transition-all duration-1000 hover:scale-105">
          ✨ Unlock Premium Features ✨
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* 1 Month Plan */}
          <div className="h-80 bg-gradient-to-br from-black via-[#8B2AE0] to-[#FFD700] transition-all duration-500 p-6 rounded-2xl shadow-lg border border-yellow-300 flex flex-col justify-between transform-gpu hover:scale-105 hover:rotate-y-3 hover:shadow-2xl perspective-1000 animate-fade-in group cursor-pointer hover:brightness-110">
            <div className="transform transition-all duration-300 group-hover:translate-y-[-2px]">
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                💰 BASIC
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center transform transition-all duration-300 group-hover:scale-110">
                1 Month - ₹299
              </h3>
              <ul className="list-disc ml-4 space-y-2 text-white/90 transform transition-all duration-300 group-hover:translate-x-2">
                <li className="transform transition-all duration-300 hover:scale-105">💝 Unlimited Likes</li>
                <li className="transform transition-all duration-300 hover:scale-105">👀 See Who Liked You</li>
                <li className="transform transition-all duration-300 hover:scale-105">🔍 Priority Search Visibility</li>
              </ul>
            </div>
            <button className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
              🚀 Upgrade ₹299
            </button>
          </div>

          {/* 3 Months Plan - Most Popular */}
          <div className="h-80 bg-gradient-to-br from-black via-[#e94f87] to-[#FFD700] transition-all duration-500 p-6 rounded-2xl shadow-lg border-2 border-yellow-300 flex flex-col justify-between transform-gpu hover:scale-110 hover:rotate-y-6 hover:shadow-2xl perspective-1000 animate-fade-in group cursor-pointer hover:brightness-110 relative overflow-hidden">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-3 py-1 rounded-full font-bold animate-bounce z-10">
              🔥 MOST POPULAR
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <div className="transform transition-all duration-300 group-hover:translate-y-[-4px] relative z-10">
              <h3 className="text-xl font-semibold mb-3 text-center transform transition-all duration-300 group-hover:scale-110 mt-2">
                3 Months - ₹699
              </h3>
              <ul className="list-disc ml-4 space-y-2 text-white/90 transform transition-all duration-300 group-hover:translate-x-2">
                <li className="transform transition-all duration-300 hover:scale-105">✨ All 1-Month Features</li>
                <li className="transform transition-all duration-300 hover:scale-105">🤖 AI Match Suggestions</li>
                <li className="transform transition-all duration-300 hover:scale-105">📊 Detailed Profile Insights</li>
              </ul>
            </div>
            <button className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-semibold py-2 px-4 rounded-lg w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 relative z-10">
              🔥 Upgrade ₹699
            </button>
          </div>

          {/* 1 Year Plan */}
          <div className="h-80 bg-gradient-to-br from-black via-[#f857a6] to-[#FFD700] transition-all duration-500 p-6 rounded-2xl shadow-lg border border-yellow-300 flex flex-col justify-between transform-gpu hover:scale-105 hover:rotate-y-3 hover:shadow-2xl perspective-1000 animate-fade-in group cursor-pointer hover:brightness-110 relative overflow-hidden">
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
              👑 PREMIUM
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500"></div>
            <div className="transform transition-all duration-300 group-hover:translate-y-[-2px] relative z-10">
              <h3 className="text-xl font-semibold mb-3 text-center transform transition-all duration-300 group-hover:scale-110">
                1 Year - ₹1299
              </h3>
              <ul className="list-disc ml-4 space-y-2 text-white/90 transform transition-all duration-300 group-hover:translate-x-2">
                <li className="transform transition-all duration-300 hover:scale-105">💎 All 3-Month Features</li>
                <li className="transform transition-all duration-300 hover:scale-105">🏆 Premium Badge & Boost</li>
                <li className="transform transition-all duration-300 hover:scale-105">💬 Exclusive Chat Access</li>
              </ul>
            </div>
            <button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-2 px-4 rounded-lg w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 relative z-10">
              👑 Upgrade ₹1299
            </button>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-pink-500 rounded-full animate-bounce opacity-70" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/4 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-bounce opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 -right-2 w-5 h-5 bg-blue-500 rounded-full animate-bounce opacity-60" style={{animationDelay: '1.5s'}}></div>

        {/* Premium benefits footer */}
        <div className="mt-8 text-center">
          <p className="text-yellow-300 text-sm animate-fade-in">
            ⭐ Join thousands of premium members finding love every day! ⭐
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Safe & Secure
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              24/7 Support
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              Money Back Guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
