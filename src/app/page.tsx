"use client";

import React, { useState } from "react";

export default function Home() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchActivated, setIsSearchActivated] = useState(false);

  const handleSearch = () => {
    setIsSearchActivated(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-black text-white font-[family-name:var(--font-geist-sans)]">
      {/* Main Content */}
      <div
        className={`flex flex-col items-center w-full ${
          isSearchActivated ? "mt-12" : "justify-center min-h-screen"
        } transition-all duration-700`}
      >
        {/* Header Section */}
        {!isSearchActivated && (
          <div className="w-full max-w-lg mb-8">
            <h1 className="text-4xl font-bold mb-2 text-left">SEALS</h1>
            <p className="text-sm text-zinc-400 text-left">
              Discover insights like never before! Search for videos, unlock detailed analyses, and explore smarter ways to understand your content.
            </p>
          </div>
        )}
        {/* Search Bar with "SEALS" Text in Black Background */}
        <div
          className={`flex items-center w-full ${
            isSearchActivated ? "max-w-4xl" : "max-w-xl"
          } border border-black rounded shadow-md bg-black px-6 py-3 transition-all duration-500`}
        >
          {isSearchActivated && (
            <h1 className="text-4xl font-bold text-white mr-4">
              SEALS
            </h1>
          )}
          <input
            type="text"
            className={`flex-grow px-4 py-3 bg-zinc-800 text-white placeholder-zinc-400 outline-none transition-all duration-300 ${
              isSearchFocused ? "border-2 border-white" : ""
            }`}
            placeholder="Type to search..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="ml-2 px-4 py-3 text-black bg-white rounded hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}