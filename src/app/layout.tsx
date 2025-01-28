/*import type { Metadata } from "next";*/
"use client";
import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

/*export const metadata: Metadata = {
  title: "SEALS",
  description: "The better way to learn",
};*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Hydration fix: Only run the theme effect on the client side
  useEffect(() => {
    setIsMounted(true); // Set to true after the component has mounted
  }, []);

  // Check saved theme preference in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Apply the theme to the entire HTML document
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);
  

  // Handle the theme toggle click event
  const handleThemeToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the link from redirecting
    setIsDarkMode((prev) => !prev); // Toggle theme
  };

  // Render nothing until the component is mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
