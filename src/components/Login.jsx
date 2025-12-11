import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "../context/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user document exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Create new user profile for first-time Google login
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          bio: "Hey there! I'm using MatchMe. ✨",
          age: "",
          location: "",
          profession: "",
          hobbies: [],
          gender: "Not Specified",
          isOnline: true,
          role: "user",
          verified: false,
          premium: false,
          trust: 80,
          createdAt: serverTimestamp()
        });
      }

      // Auth listener in App.jsx will handle redirect
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError("Google Sign-In failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn(formData.email, formData.password);
    if (result.success) {
      // Login successful, auth listener in App.jsx will handle redirect
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#182384] to-[#ce759a] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">

        {/* Decorative Top Gradient Strip */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500" />

        <div className="text-center mb-6 z-10 relative">
          <Link to="/" className="inline-block text-5xl mb-2 hover:scale-110 transition-transform duration-200">
            💖
          </Link>
          <h2 className="text-4xl font-extrabold text-white drop-shadow-md">Welcome Back</h2>
          <p className="mt-2 text-sm text-white/70">Login to your SoulConnect account</p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-5 z-10 relative">
          {error && (
            <div className="bg-red-400/20 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="bg-white/5 p-4 rounded-2xl">
            <label htmlFor="email" className="block text-white text-sm font-semibold mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70"
              placeholder="Enter your email"
            />
          </div>

          <div className="bg-white/5 p-4 rounded-2xl">
            <label htmlFor="password" className="block text-white text-sm font-semibold mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="relative flex items-center justify-center my-4 opacity-70">
            <div className="border-t border-white/30 w-full"></div>
            <span className="bg-transparent px-3 text-white text-xs uppercase tracking-wide">Or</span>
            <div className="border-t border-white/30 w-full"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white hover:bg-white/90 text-gray-900 font-semibold shadow-md transition-all duration-200 flex items-center justify-center gap-3 transform hover:scale-[1.02]"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            ) : (
              <>
                <FaGoogle className="text-red-500 text-lg" />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <p className="text-center text-sm text-white mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-pink-200 hover:text-pink-100 font-medium underline"
            >
              Sign up here
            </Link>
          </p>
        </form>

        {/* Decorative Bottom Gradient Strip */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400" />
      </div>
    </div>
  );
};

export default Login;
