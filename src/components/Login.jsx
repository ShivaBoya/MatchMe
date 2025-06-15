import { useState } from "react";
import { signIn } from "../context/auth";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn(formData.email, formData.password);
    if (result.success) {
      onLogin(result.user);
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
