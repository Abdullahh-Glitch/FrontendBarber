import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({setAuth, setRole}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // demo behaviour — replace with real auth call
    if (username === "admin" && password === "password123") {
        setAuth(true);
        setRole("manager");
      console.log("Welcome");
      Navigate("/manager")
      
      
    } else {
        setAuth(false);
      console.log("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600 font-sans">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gradient-to-br from-white to-sky-50 p-8 rounded-2xl shadow-2xl transform transition-transform hover:-translate-y-1"
      >
        <h2 className="text-center text-2xl font-semibold text-blue-600 mb-6">Login Form</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow-md hover:opacity-95 transition-colors"
        >
          Login
        </button>

      </form>
    </div>
  );
}