import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Matches from "./pages/Matches";
import Messages from "./pages/Messages";
import PremiumPopup from "./pages/Premium";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Discover from "./pages/Discover";
function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPremium, setShowPremium] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Set user and stop loading immediately to show UI
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-[#182384] to-[#ce759a] text-white">
        {user && (
          <Navbar
            user={user}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            setShowPremium={setShowPremium}
            handleLogout={handleLogout}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            profileMenu={profileMenu}
            setProfileMenu={setProfileMenu}
          />
        )}

        {showPremium && <PremiumPopup onClose={() => setShowPremium(false)} />}

        <div className={user ? "pt-20" : ""}>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Signup />} />


            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/discover" element={user ? <Discover /> : <Navigate to="/login" />} />
            <Route path="/matches" element={user ? <Matches user={user} /> : <Navigate to="/login" />} />
            <Route path="/messages/:userId" element={user ? <Messages user={user} /> : <Navigate to="/login" />} />
            <Route path="/messages" element={user ? <Messages user={user} /> : <Navigate to="/login" />} />


            <Route
              path="/profile"
              element={
                user ? (
                  <Profile user={user} userProfile={userProfile} setUserProfile={setUserProfile} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/settings"
              element={user ? <Settings user={user} userProfile={userProfile} /> : <Navigate to="/login" />}
            />


            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
