import React, { useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); 
  const [error, setError] = useState("");

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      alert("ゲストログイン成功！");
      navigate("/StudyRecord"); 
    } catch (error) {
      console.error("ゲストログイン失敗:", error.message);
      setError("ゲストログインに失敗しました: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">ログイン</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleGuestLogin}
        className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition"
      >
        ゲストログイン
      </button>
    </div>
  );
};

export default Login;
