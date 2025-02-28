"use client";
import { useState, useEffect } from "react";

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState(() => localStorage.getItem("name") || "User");
  const [emailNotifications, setEmailNotifications] = useState(() => localStorage.getItem("emailNotifications") === "true");
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  // Apply theme on page load
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`flex h-screen transition-all ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300`}
      >
        {/* Close Button */}
        <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white text-2xl font-bold">
          ✖
        </button>
        <h2 className="text-xl font-bold mb-6">Settings</h2>
        <nav className="flex flex-col space-y-2">
          {["profile", "security", "notifications", "appearance", "account"].map((section) => (
            <button key={section} onClick={() => setActiveSection(section)} className="text-left px-4 py-2 rounded hover:bg-gray-700 transition">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Sidebar Toggle + Title */}
      <div
        className={`fixed top-4 flex items-center transition-all duration-300 ${
          sidebarOpen ? "left-72" : "left-6"
        }`}
      >
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className={`text-3xl font-bold mr-4 transition-all ${
              isDarkMode ? "text-white" : "text-black"
            }`} 
          >
            ☰
          </button>
        )}
        <h1 className="text-2xl font-bold transition-all duration-300">Account Settings</h1>
      </div>

      {/* Main Content */}
      <main className={`p-6 transition-all duration-300 mt-12 ${sidebarOpen ? "ml-72 w-[calc(100%-18rem)]" : "w-full"}`}>
        {activeSection === "profile" && (
          <div>
            <h2 className="text-xl font-bold">Profile</h2>
            <label className="block mt-4">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded w-full bg-transparent text-inherit" />
          </div>
        )}

        {activeSection === "security" && (
          <div>
            <h2 className="text-xl font-bold">Security</h2>
            <button className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg">Reset Password</button>
          </div>
        )}

        {activeSection === "notifications" && (
          <div>
            <h2 className="text-xl font-bold">Notifications</h2>
            <label className="flex items-center mt-4">
              <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} className="mr-2" />
              Email Notifications
            </label>
          </div>
        )}

        {activeSection === "appearance" && (
          <div>
            <h2 className="text-xl font-bold">Appearance</h2>
            <button onClick={toggleTheme} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg">
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        )}

        {activeSection === "account" && (
          <div>
            <h2 className="text-xl font-bold text-red-600">Account Actions</h2>
            <button className="mt-2 px-4 py-2 bg-red-700 text-white rounded-lg">Delete Account</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccountSettings;
