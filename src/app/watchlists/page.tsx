"use client";
import { useState, useEffect } from "react";

const Watchlists = () => {
  const [playlists, setPlaylists] = useState<{ [key: string]: any[] }>({});
  const [showMoveToPlaylistModal, setShowMoveToPlaylistModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null); // Define the state for selected video
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [newPlaylist, setNewPlaylist] = useState("");

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem("playlists") || "{}");
    setPlaylists(storedPlaylists);
  }, []);

  const removeFromPlaylist = (playlistName: string, videoId: string) => {
    const updatedPlaylists = { ...playlists };
    updatedPlaylists[playlistName] = updatedPlaylists[playlistName].filter(
      (video) => video.id !== videoId
    );

    if (updatedPlaylists[playlistName].length === 0) {
      delete updatedPlaylists[playlistName]; // Remove empty playlists
    }

    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
  };

  const handleMoveToPlaylist = () => {
    if (!selectedVideo) {
      console.log("No video selected");
      return;
    }
  
    if (!selectedPlaylist && !newPlaylist) {
      alert("Please select or create a playlist.");
      return;
    
    }
  
    const existingPlaylists = JSON.parse(localStorage.getItem("playlists") || "{}");
  
    // Step 1: Remove the video from the original playlist
    let removed = false; // To track if video is removed from any playlist
    for (const playlistName in existingPlaylists) {
      const playlist = existingPlaylists[playlistName];
      const videoIndex = playlist.findIndex((video) => video.id === selectedVideo.id);
      
      if (videoIndex !== -1) {
        // Remove the video from this playlist
        existingPlaylists[playlistName].splice(videoIndex, 1);
        // If the playlist becomes empty after removing the video, delete it from the object
        if (existingPlaylists[playlistName].length === 0) {
          delete existingPlaylists[playlistName];
        }
        removed = true; // Video removed
        break; // Exit loop once the video is found and removed
      }
    }
  
    // Step 2: Add the video to the selected or new playlist
    if (selectedPlaylist) {
      existingPlaylists[selectedPlaylist] = existingPlaylists[selectedPlaylist] || [];
      existingPlaylists[selectedPlaylist].push(selectedVideo);
    }
  
    if (newPlaylist) {
      if (!existingPlaylists[newPlaylist]) {
        existingPlaylists[newPlaylist] = [];
      }
      existingPlaylists[newPlaylist].push(selectedVideo);
    }
  
    // Step 3: Save the updated playlists to localStorage
    localStorage.setItem("playlists", JSON.stringify(existingPlaylists));
  
    // Update state immediately so the UI reflects the changes without a refresh
    setPlaylists(existingPlaylists);
  
    // Close the modal and show a success message
    setShowMoveToPlaylistModal(false);
    alert("Video moved to playlist successfully!");
  };
  
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Watchlists</h1>

      {Object.keys(playlists).length === 0 ? (
        <p>No saved videos found.</p>
      ) : (
        Object.entries(playlists).map(([playlistName, videos]) => (
          <div key={playlistName} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{playlistName}</h2>

            <table className="min-w-full border-collapse border text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 w-32">Thumbnail</th>
                  <th className="border p-2 w-64">Title</th>
                  <th className="border p-2 w-48">Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video.id}>
                    <td className="border p-2 w-32">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </td>

                    <td className="border p-2 w-64">{video.title}</td>
                    <td className="border p-2 w-48">
                      <div className="flex justify-center gap-3">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank")}
                        >
                          Watch
                        </button>
                        <button
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 ml-2"
                          onClick={() => {
                            setSelectedVideo(video); // Set the selected video for moving
                            setShowMoveToPlaylistModal(true); // Show the modal
                          }}
                        >
                          Move to Playlist
                        </button>

                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          onClick={() => removeFromPlaylist(playlistName, video.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      {/* Modal for moving video to playlist */}
      {showMoveToPlaylistModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Move Video to Playlist</h2>
            <div className="mb-4">
              <label className="block text-sm">Select Playlist</label>
              <select
                className="w-full p-2 border border-gray-300 rounded mt-1"
                onChange={(e) => setSelectedPlaylist(e.target.value)}
                value={selectedPlaylist}
              >
                <option value="">Select an existing playlist</option>
                {Object.keys(playlists).map((playlist) => (
                  <option key={playlist} value={playlist}>
                    {playlist}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm">Or Create a New Playlist</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="New Playlist Name"
                value={newPlaylist}
                onChange={(e) => setNewPlaylist(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-black py-1 px-3 rounded"
                onClick={() => setShowMoveToPlaylistModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                onClick={handleMoveToPlaylist}
              >
                Move
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlists;
