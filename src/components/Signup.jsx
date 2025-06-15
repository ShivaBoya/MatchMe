import { useState } from "react";
import { signUp } from "../context/auth";
import { Link } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    location: "",
    religion: "",
    hobbies: "",
    education: "",
    profession: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all required fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
    }
    setError("");
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userData = {
      ...formData,
      hobbies: formData.hobbies.split(",").map(hobby => hobby.trim()).filter(hobby => hobby)
    };

    const result = await signUp(formData.email, formData.password, userData);

    if (result.success) {
      onSignup(result.user);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#414fc9] to-[#a225d3] px-4 py-8 text-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block text-5xl mb-2 hover:scale-110 transition-transform duration-200">
          💖
          </Link>
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="mt-2 text-sm text-pink-100">Join us to find your perfect match</p>
        </div>

       <form className="mt-8 space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg text-white" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div>
                <label htmlFor="name">Full Name *</label>
                <input id="name" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg" placeholder="Enter your full name" />
              </div>
              <div>
                <label htmlFor="email">Email Address *</label>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                  className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70" placeholder="Enter your email" />
              </div>
              <div>
                <label htmlFor="password">Password *</label>
                <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange}
                  className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70" placeholder="Create a password" />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange}
                  className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70" placeholder="Confirm password" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" name="age" value={formData.age} onChange={handleChange}
                 className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70" placeholder="Age" />
                <select name="gender" value={formData.gender} onChange={handleChange}
                  className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <input name="location" value={formData.location} onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70" placeholder="Location" />
              <input name="religion" value={formData.religion} onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70" placeholder="Religion" />
              <input name="hobbies" value={formData.hobbies} onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70" placeholder="Hobbies (comma separated)" />
              <input name="education" value={formData.education} onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70" placeholder="Education" />
              <input name="profession" value={formData.profession} onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70" placeholder="Profession" />
            </div>
          )}

          <div className="flex space-x-4">
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)}
                className="flex-1 py-3 px-4 border rounded-lg bg-white text-gray-700 hover:bg-gray-100">
                Back
              </button>
            )}
            {step === 1 ? (
              <button type="button" onClick={handleNextStep}
                className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#414fc9] to-[#a225d3] text-white hover:from-[#2b38b0] hover:to-[#821aa5]">
                Next Step
              </button>
            ) : (
              <button type="submit" disabled={loading}
                className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#414fc9] to-[#a225d3] text-white hover:from-[#2b38b0] hover:to-[#821aa5] disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex justify-center items-center">
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            )}
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#a225d3] hover:text-purple-700">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
