import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TopPage from "./TopPage/TopPages";
import Record from "./Record/Main";
import Login from "./Components/Login";
import { auth } from "./firebase";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsGuest(user?.isAnonymous || false);
      setIsLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth); 
      alert("ゲストログイン成功！");
    } catch (err) {
      console.error("ゲストログイン失敗:", err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* デフォルトで / を Login に設定 */}
        <Route path="/" element={<Login onGuestLogin={handleGuestLogin} />} />
        <Route
          path="/record"
          element={isLoggedIn ? <Record isGuest={isGuest} /> : <Navigate to="/" />}
        />
        <Route
          path="/StudyRecord"
          element={isLoggedIn ? <TopPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
