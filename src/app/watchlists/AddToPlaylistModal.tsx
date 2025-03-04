"use client";

import { useState } from "react";

interface AddToPlaylistModalProps {
    video: any;
    onClose: () => void;
    onAdd: (video: any, playlistName: string) => void;
    isDarkMode: boolean;
}

const AddToPlaylistModal = ({ video, onClose, onAdd, isDarkMode }: AddToPlaylistModalProps) => {
    const [playlistName, setPlaylistName] = useState("");

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-black"}`}>
                <h2 className="text-lg font-bold mb-4">Add to Playlist</h2>

                <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter playlist name"
                />

                <div className="flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>Cancel</button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => {
                            if (playlistName.trim()) {
                                onAdd(video, playlistName.trim());
                                onClose();
                            }
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddToPlaylistModal;
