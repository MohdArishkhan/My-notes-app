import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import MusicPlayer from "./musicPlayer";

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
    <nav className="bg-gray-900 px-4 py-3 text-white shadow-lg w-full">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* Left - App Title */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <Link to="/" className="text-xl font-semibold">Notes App</Link>
        </div>

        {/* Middle - Music + Search */}
        {user && (
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 flex-grow">
            {/* Music Player
            <div className="w-full sm:w-40">
              <MusicPlayer />
            </div> */}

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Right - Username + Logout */}
        {user ? (
          <div className="flex items-center gap-3 justify-end w-full sm:w-auto">
            <span className="text-sm sm:text-base font-medium break-words">{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
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

  )
};


export default Navbar;
