import React from "react";

const AverageStats = ({ videoStats }) => {
  if (!videoStats || videoStats.length === 0) return null;

  const totalVideos = videoStats.length;
  const totalViews = videoStats.reduce((sum, v) => sum + v.views, 0);
  const totalLikes = videoStats.reduce((sum, v) => sum + v.likes, 0);
  const totalComments = videoStats.reduce((sum, v) => sum + v.comments, 0);

  const avgViews = (totalViews / totalVideos).toFixed(2);
  const avgLikes = (totalLikes / totalVideos).toFixed(2);
  const avgComments = (totalComments / totalVideos).toFixed(2);

  return (
    <div className="bg-gray-900 bg-opacity-80 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mt-5 mb-8 sm:mb-10 text-[#85b50b] drop-shadow-lg">
        📈 Average Video Stats
      </h2>

      {/* Stats Container */}
      <div className="space-y-4 text-gray-300 text-lg sm:text-xl">
        {/* Average Views per Video */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="font-semibold">📺 Avg Views per Video:</span>
          <span className="text-purple-400 font-bold text-lg sm:text-xl">
            {avgViews}
          </span>
        </div>

        {/* Average Likes per Video */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="font-semibold">👍 Avg Likes per Video:</span>
          <span className="text-green-400 font-bold text-lg sm:text-xl">
            {avgLikes}
          </span>
        </div>

        {/* Average Comments per Video */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">💬 Avg Comments per Video:</span>
          <span className="text-blue-400 font-bold text-lg sm:text-xl">
            {avgComments}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AverageStats;
