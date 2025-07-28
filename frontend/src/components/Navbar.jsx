import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MusicPlayer from "./musicPlayer";

const Navbar = ({ user, setUser }) => {
  const [search, setSearch] = useState("");  
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const delay = setTimeout(() => {
      navigate(search.trim() ? `/?search=${encodeURIComponent(search)}` : "/");
    }, 500);

    return () => clearTimeout(delay);
  }, [search, navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 p-4 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">Notes App</Link>

        {user ? (
          <div className="flex items-center space-x-4">
            
            {/* ✅ Music Player on Left */}
            <div className="w-40">
              <MusicPlayer />
            </div>

            {/* ✅ Search Bar */}
            <div className="relative w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder=" Search notes..."
                className="w-full px-5 py-2 pl-10 bg-gray-800 text-white placeholder-gray-400 
                           border border-gray-600 rounded-xl shadow-sm 
                           outline-none focus:ring-2 focus:ring-blue-500 
                           transition-all duration-200 ease-in-out"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
                </svg>
              </div>
            </div>

            {/* ✅ Username and Logout */}
            <span>{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
