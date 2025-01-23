"use client";

import React, { useState, useEffect } from "react";

export default function ThemesPage() {
  // Initialize the theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check if the theme is already saved in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle theme between dark and light
  const toggleTheme = () => {
    setIsDarkMode((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="flex justify-center items-center min-h-screen">
        <button
          onClick={toggleTheme}
          className="px-6 py-3 bg-zinc-800 text-white rounded transition-all duration-300 hover:bg-zinc-600"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}
