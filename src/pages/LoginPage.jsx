import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Please try again.");
      }

    //   if (!data.parId) {
    //     throw new Error("Partner ID is missing from response");
    //   }

      localStorage.setItem("adminToken", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 bg-black text-white placeholder-gray-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 bg-black text-white placeholder-gray-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right mb-4">
            <a href="/forget-password" className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
