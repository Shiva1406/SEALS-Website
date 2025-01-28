"use client"; // Mark the component as a client component

import { useState } from "react";

const SendFeedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Feedback submitted! Thank you for your input.");
    setFeedback(""); // Optional: Clear the feedback after submission
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Send Feedback</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)} // Bind the feedback value to the textarea
          rows={4} // rows as a number
          cols={50} // cols as a number
          placeholder="Write your feedback..."
          className="border border-gray-300 p-2 w-full rounded-lg"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendFeedback;
