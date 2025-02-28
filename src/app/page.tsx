"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";

interface Video {
  id: string;
  title: string;
  views: number; 
  rating: number; 
  publishedAt: string; 
}


export default function SealsPage() {
  const [isSearchActivated, setIsSearchActivated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [sortOption, setSortOption] = useState("Recommended");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load theme from localStorage
  useEffect(() => {
    handleSearch();
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");

      if (newTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newTheme;
    });
  };

  // Fetch search results
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearchActivated(true);
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch(
        `https://shivsri.pythonanywhere.com/search?query=${searchQuery}`
      );
  
      if (!response.ok) throw new Error("Failed to fetch search results");
  
      const data = await response.json();
  
      console.log("🔍 Full API Response:", JSON.stringify(data, null, 2)); // ✅ Log full response
  
      // Check if views, rating, and publishedAt exist in API response
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No videos found or incorrect response format");
      }
  
      const updatedVideos: Video[] = data.map((video: any) => ({

          id: video.id,
          title: video.title,
          views: video.views !== undefined ? Number(video.views) : 0, // Ensure number format
          rating: video.rating !== undefined ? Number(video.rating) : 0, // Ensure number format
          publishedAt: video.publishedAt ? new Date(video.publishedAt).toISOString() : "No date found", // Ensure correct date format
        }));
          console.log(updatedVideos);
      setVideos(updatedVideos);
    } catch (error) {
      console.error("❌ Error fetching videos:", error);
      setError("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSort = (option: string) => {
    setSortOption(option);

    if (!videos || videos.length === 0) return; // Prevent sorting empty/null arrays

    let sortedVideos = [...videos]; // Clone array to avoid mutating state

    console.log("Sorting by:", option); // Log selected sort option

    // Log the published dates before sorting
    console.log("Before sorting:", sortedVideos.map(v => v.publishedAt));

    switch (option) {
      case "Most Viewed":
        sortedVideos.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;

      case "Most Rated":
        sortedVideos.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;

      case "Newest":
        sortedVideos.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        break;

      case "Recommended":
      default:
        console.log("No sorting applied.");
        return; // No sorting needed
    }

    // Log the published dates after sorting
    console.log("After sorting:", sortedVideos.map(v => v.publishedAt));

    setVideos([...sortedVideos]); // Update state to trigger re-render
};



  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} transition-all duration-300`}>
      {/* Sidebar */}
      {isSearchActivated && (
        <aside className={`w-1/5 min-h-screen ${isDarkMode ? "bg-zinc-800 text-white" : "bg-zinc-300 text-black"} p-4 overflow-y-auto`}>
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <ul className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <li key={index} className="space-y-2">
                <p className="text-sm font-medium">{`Filter ${index + 1}`}</p>
                <input type="range" min="0" max="100" className="w-full cursor-pointer" />
              </li>
            ))}
          </ul>

          {/* Sorting Dropdown */}
          <div className="mt-6">
            <label className="block text-sm font-medium">Sort By:</label>
            <select
              className="mt-2 px-2 py-1 w-full rounded bg-gray-700 text-white"
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="Recommended">Recommended</option>
              <option value="Most Viewed">Most Viewed</option>
              <option value="Newest">Newest</option>
            </select>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Theme Toggle + Profile */}
        

            {/* Profile Icon */}
            {/* Profile Menu */}
            {/* Theme Toggle + Profile */}
          {isLoggedIn && (
            <div className="absolute top-4 right-4 flex items-center gap-4">
              {/* Theme Toggle Switch */}
              <div
                className="relative w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300"
                onClick={toggleTheme}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ${
                    isDarkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                >
                  {isDarkMode ? <FaMoon className="text-gray-800" /> : <FaSun className="text-yellow-400" />}
                </div>
              </div>

              {/* Profile Icon */}
              <div className="relative cursor-pointer" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-full font-bold">
                  A
                </div>
                {profileMenuOpen && (
                  <div className={`absolute top-12 right-0 bg-gray-300 text-black rounded shadow-lg p-4 w-64 z-10 ${isDarkMode ? "text-black bg-gray-300" : "text-white bg-black"} `}>
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
                      <li><Link href="./account-settings">Account Settings</Link></li>
                      <li><Link href="./switch-account">Switch Account</Link></li>
                      <li><Link href="./sign-out">Sign Out</Link></li>
                      <hr />
                      <li><Link href="./learning-history">Learning History</Link></li>
                      <li><Link href="./watchlists">Watchlists</Link></li>
                      <li><Link href="./learnability-statistics">Learnability Statistics</Link></li>
                      <hr />
                      <li><Link href="./help">Help</Link></li>
                      <li><Link href="./send-feedback">Send Feedback</Link></li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
     
       

        {/* Header */}
        <header className={`flex flex-col items-center justify-center transition-all duration-700 ${isSearchActivated ? "items-start" : "min-h-screen"}`}>
          {!isSearchActivated && (
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4">SEALS</h1>
              <p className={`text-lg max-w-xl transition-all duration-300 ${isDarkMode ? "text-gray-400" : "text-mb-4"}`}>
                Discover insights like never before! Search for videos, unlock detailed analyses, and explore smarter ways to understand your content.
              </p>
            </div>
          )}
          <div className={`flex items-center space-x-4 transition-all duration-700 ${isSearchActivated ? "self-start w-full max-w-4xl" : "self-center"}`}>
            <input
              type="text"
              placeholder="Type to search..."
              className={`px-4 py-3 ${isDarkMode ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black"} rounded outline-none focus:ring-2 focus:ring-white transition-all duration-700 ${isSearchActivated ? "w-72" : "w-full max-w-lg"}`}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className={`px-4 py-2 ${isDarkMode ? "text-black bg-white" : "text-white bg-black"} rounded hover:bg-zinc-200`} onClick={handleSearch}>
              Search
            </button>
          </div>
        </header>

        {/* Video Results */}
        {loading && <p className="mt-6 text-center">Loading...</p>}
        {error && <p className="mt-6 text-center text-red-500">{error}</p>}
        
        {isSearchActivated && !loading && (
          <div className="grid grid-cols-1 gap-6 mt-6">
            {videos.map((video, index) => (
              <div key={index} className={`relative flex items-start space-x-4 ${isDarkMode ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black"} p-4 rounded`}>
                <img src={`https://img.youtube.com/vi/${video.id}/default.jpg`} alt={video.title} className="w-32 h-32 rounded" />
                <p className="text-sm">{video.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
