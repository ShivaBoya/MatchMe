import React from "react";

export default function Premium() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#182384] to-[#ce759a] flex flex-col items-center py-10 overflow-auto animate-fade-in relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      <div className="w-full max-w-6xl z-10 px-4">


        <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide drop-shadow-lg text-white animate-fade-in transform transition-all duration-1000 hover:scale-105">
          ✨ Unlock <span className="text-yellow-300">Premium</span> Features ✨
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* 1 Month Plan */}
          <div className="h-96 bg-white/10 backdrop-blur-md transition-all duration-500 p-6 rounded-3xl shadow-xl border border-white/20 flex flex-col justify-between transform-gpu hover:scale-105 hover:shadow-2xl hover:bg-white/15 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>

            <div className="transform transition-all duration-300 group-hover:translate-y-[-2px]">
              <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs px-3 py-1 rounded-full font-bold">
                BASIC
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center mt-8 text-white">
                1 Month
              </h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-white">₹299</span>
                <span className="text-white/60 text-sm">/mo</span>
              </div>

              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-2"><span className="text-blue-300">✓</span> Unlimited Likes</li>
                <li className="flex items-center gap-2"><span className="text-blue-300">✓</span> See Who Liked You</li>
                <li className="flex items-center gap-2"><span className="text-blue-300">✓</span> Priority Visibility</li>
              </ul>
            </div>
            <button className="mt-4 bg-white/20 hover:bg-white/30 border border-white/40 text-white font-semibold py-3 px-4 rounded-xl w-full transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:scale-105">
              Choose Basic
            </button>
          </div>

          {/* 3 Months Plan - Most Popular */}
          <div className="h-[26rem] bg-gradient-to-b from-pink-500/20 to-purple-600/20 backdrop-blur-xl transition-all duration-500 p-6 rounded-3xl shadow-2xl border-2 border-pink-400/50 flex flex-col justify-between transform-gpu hover:scale-110 hover:shadow-pink-500/20 z-10 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-pink-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>

            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-4 py-1.5 rounded-b-xl font-bold tracking-wider shadow-lg">
              MOST POPULAR
            </div>

            <div className="transform transition-all duration-300 mt-6 text-center">
              <h3 className="text-2xl font-bold mb-2 text-white">
                3 Months
              </h3>
              <div className="mb-6 flex flex-col items-center">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 drop-shadow-sm">₹699</span>
                <span className="text-white/70 text-sm mt-1">₹233/mo • Save 22%</span>
              </div>

              <ul className="space-y-3 text-left text-white/95 px-2">
                <li className="flex items-center gap-2"><span className="text-pink-300">✓</span> All Basic Features</li>
                <li className="flex items-center gap-2"><span className="text-pink-300">✓</span> AI Match Suggestions</li>
                <li className="flex items-center gap-2"><span className="text-pink-300">✓</span> 5 Super Likes/week</li>
                <li className="flex items-center gap-2"><span className="text-pink-300">✓</span> Read Receipts</li>
              </ul>
            </div>
            <button className="mt-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3.5 px-4 rounded-xl w-full shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95">
              Get 3 Months
            </button>
          </div>

          {/* 1 Year Plan */}
          <div className="h-96 bg-white/10 backdrop-blur-md transition-all duration-500 p-6 rounded-3xl shadow-xl border border-yellow-400/30 flex flex-col justify-between transform-gpu hover:scale-105 hover:shadow-yellow-500/10 hover:bg-white/15 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-yellow-400 to-transparent opacity-50"></div>

            <div className="transform transition-all duration-300 group-hover:translate-y-[-2px]">
              <div className="absolute top-4 right-4 bg-yellow-400/20 text-yellow-200 border border-yellow-400/30 text-xs px-3 py-1 rounded-full font-bold">
                PREMIUM
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center mt-8 text-white">
                1 Year
              </h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-white">₹1299</span>
                <span className="text-white/60 text-sm">₹108/mo</span>
              </div>

              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-2"><span className="text-yellow-300">✓</span> All Features Unlocked</li>
                <li className="flex items-center gap-2"><span className="text-yellow-300">✓</span> VIP Profile Badge</li>
                <li className="flex items-center gap-2"><span className="text-yellow-300">✓</span> Priority Support</li>
              </ul>
            </div>
            <button className="mt-4 bg-gradient-to-r from-yellow-600/80 to-yellow-500/80 hover:from-yellow-500 hover:to-yellow-400 border border-yellow-400/50 text-white font-semibold py-3 px-4 rounded-xl w-full transition-all duration-300 shadow-lg hover:shadow-yellow-400/20 hover:scale-105">
              Choose Premium
            </button>
          </div>
        </div>

        {/* Premium benefits footer */}
        <div className="mt-12 text-center pb-8">
          <p className="text-white/80 text-sm animate-fade-in font-medium">
            ⭐ Join 50,000+ happy couples who met on SoulConnect Premium! ⭐
          </p>
          <div className="flex justify-center gap-6 mt-6 text-xs text-white/60">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
              Secure Payment
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)]"></span>
              Cancel Anytime
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(192,132,252,0.5)]"></span>
              24/7 Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
