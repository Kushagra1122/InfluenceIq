import React from "react";

const LatestVideo = ({ video }) => {
  if (!video) return null;

  const handleThumbnailClick = () => {
    if (video.url) {
      window.open(video.url, "_blank");
    }
  };

  return (
    <div className="mt-6 bg-gray-900 bg-opacity-80 p-5 rounded-2xl shadow-xl border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-2xl max-w-lg mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-extrabold text-center mb-4 text-[#85b50b] drop-shadow-lg">
        🎥 Latest Video
      </h2>

      {/* Video Content */}
      <div className="flex flex-col items-center text-gray-300 gap-4">
        {/* Video Thumbnail */}
        {video.thumbnail && (
          <img
            src={video.thumbnail}
            alt="Latest Video Thumbnail"
            className="w-full max-w-sm h-auto rounded-lg shadow-lg border border-gray-700  hover:shadow-xl cursor-pointer"
            onClick={handleThumbnailClick}
          />
        )}

        {/* Video Title */}
        <p className="text-lg font-semibold text-gray-200 text-center px-3">
          📌 {video.title || "N/A"}
        </p>

        {/* Video Stats */}
        <div className="flex flex-wrap justify-between w-full text-center text-base bg-gray-800/70 p-3 rounded-lg border border-gray-700 shadow-md gap-2">
          <p className="w-full sm:w-auto">
            <strong className="text-yellow-400">📺 Views:</strong>{" "}
            {video.views.toLocaleString()}
          </p>
          <p className="w-full sm:w-auto">
            <strong className="text-green-400">👍 Likes:</strong>{" "}
            {video.likes.toLocaleString()}
          </p>
          <p className="w-full sm:w-auto">
            <strong className="text-red-400">💬 Comments:</strong>{" "}
            {video.comments.toLocaleString()}
          </p>
        </div>

        {/* Video Link Button */}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-base font-semibold transform hover:-translate-y-1 hover:shadow-2xl border border-transparent hover:border-blue-300"
        >
          🔗 Watch Video
        </a>
      </div>
    </div>
  );
};

export default LatestVideo;
