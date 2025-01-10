"use client";

import React, { useState } from "react";


interface Video {
  id: string;
  title: string;
}

export default function SealsPage() {
  const [isSearchActivated, setIsSearchActivated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [sortOption, setSortOption] = useState("Recommended");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearchActivated(true);

    try {
      const response = await fetch("https://shivsri.pythonanywhere.com/search?query="+searchQuery, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white relative">
      {/* Sidebar (Hidden Initially) */}
      {isSearchActivated && (
        <aside className="w-1/5 min-h-screen bg-zinc-900 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <ul className="space-y-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <li key={index} className="space-y-2">
                  <p className="text-sm font-medium">{`Filter ${index + 1}`}</p>
                  {/* Sliding bar */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full cursor-pointer"
                  />
                </li>
              ))}
          </ul>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Profile Icon (Only if Logged In) */}
        {isLoggedIn && (
          <div className="absolute top-4 right-4">
            <div
              className="relative cursor-pointer"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-full font-bold">
                A
              </div>
              {profileMenuOpen && (
                <div className="absolute top-12 right-0 bg-gray-300 text-black rounded shadow-lg p-4 w-64 z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full font-bold">
                      A
                    </div>
                    <div className="ml-3">
                      <p className="font-bold">Alice</p>
                      <p className="text-sm text-gray-600">alice123@gmail.com</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li>Account Settings</li>
                    <li>Switch Account</li>
                    <li>Sign Out</li>
                    <hr />
                    <li>Learning History</li>
                    <li>Watchlists</li>
                    <li>Learnability Statistics</li>
                    <hr />
                    <li>Themes (Light/Dark)</li>
                    <li>Help</li>
                    <li>Send Feedback</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        <header
          className={`flex flex-col items-center justify-center transition-all duration-700 ${
            isSearchActivated ? "items-start" : "min-h-screen"
          }`}
        >
          {!isSearchActivated && (
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4">SEALS</h1>
              <p className="text-lg text-zinc-400 max-w-xl">
                Discover insights like never before! Search for videos, unlock
                detailed analyses, and explore smarter ways to understand your
                content.
              </p>
            </div>
          )}
          <div
            className={`flex items-center space-x-4 transition-all duration-700 ${
              isSearchActivated ? "self-start w-full max-w-4xl" : "self-center"
            }`}
          >
            <input
              type="text"
              placeholder="Type to search..."
              className={`px-4 py-3 bg-zinc-800 text-white rounded outline-none focus:ring-2 focus:ring-white transition-all duration-700 ${
                isSearchActivated ? "w-72" : "w-full max-w-lg"
              }`}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="px-4 py-2 text-black bg-white rounded hover:bg-zinc-200"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </header>


        {/* Sort Options */}
        <div className="flex justify-between items-center mb-6">
              <div />
              <div>
                <label className="text-sm mr-2">Sort By:</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-black border border-zinc-700 text-white p-2 rounded"
                >
                  <option value="Recommended">Recommended</option>
                  <option value="Newest">Newest</option>
                  <option value="Popular">Popular</option>
                </select>
              </div>
            </div>

        {/* Video Results */}
        {isSearchActivated && (
          <div className="grid grid-cols-1 gap-6 mt-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-zinc-800 p-4 rounded"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                  alt={video.title}
                  className="w-32 h-32 rounded"
                />
                <p className="text-sm">{video.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
