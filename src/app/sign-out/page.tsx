"use client";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useEffect } from "react";

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear the user session or auth tokens here, for example:
    localStorage.removeItem("authToken"); // or whatever token you use
    sessionStorage.removeItem("authToken"); // or any other method used to store the token
    alert("Signing Out");

    // Redirect to the previous page or home page
    const previousPage = document.referrer || '/'; // Use document.referrer to get the previous page URL, fallback to '/' (home) if not available
    router.push(previousPage); // Navigate to the previous page or home
  }, [router]);

  return (
    <div className="loading-message">Signing out...</div>
  );
};

export default SignOut;
