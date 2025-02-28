"use client";
import { useState, useEffect } from "react";

const LearningHistory = ({ handleSearch }: { handleSearch: (query: string) => void }) => {
    const [history, setHistory] = useState<{ query: string; results: any[] }[]>([]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("learningHistory") || "[]");
        setHistory(storedHistory);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Learning History</h1>

            {history.length === 0 ? (
                <p>No recent searches found.</p>
            ) : (
                <div className="space-y-6">
                    {history.map((entry, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-lg">
                            <h2 
                                className="text-xl font-semibold cursor-pointer text-blue-500 hover:underline" 
                                onClick={() => handleSearch(entry.query)}
                            >
                                🔍 {entry.query}
                            </h2>
                            
                            <table className="w-full border-collapse border mt-2">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border p-2">Title</th>
                                        <th className="border p-2">Views</th>
                                        <th className="border p-2">Rating</th>
                                        <th className="border p-2">Published Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entry.results.map((video, vidIndex) => (
                                        <tr key={vidIndex} className="text-center border">
                                            <td className="border p-2">{video.title}</td>
                                            <td className="border p-2">{video.views}</td>
                                            <td className="border p-2">{video.rating}</td>
                                            <td className="border p-2">{video.publishedAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LearningHistory;

