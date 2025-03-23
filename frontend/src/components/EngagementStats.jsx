import React from "react";

const EngagementStats = ({ stats }) => {
  const totalViews = stats.channelStats?.viewCount || 1; // Avoid division by zero
  const totalLikes = stats.computedStats?.totalLikes || 0;
  const totalComments = stats.computedStats?.totalComments || 0;

  const likesToViewsRatio = ((totalLikes / totalViews) * 100).toFixed(4);
  const commentsToViewsRatio = ((totalComments / totalViews) * 100).toFixed(4);
  const totalEngagementToViewsRatio = (
    ((totalLikes + totalComments) / totalViews) *
    100
  ).toFixed(4);

  return (
    <div className="bg-gray-900 bg-opacity-80 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#85b50b] mt-5 mb-8 sm:mb-10 drop-shadow-lg">
        🔥 Engagement Stats
      </h2>

      {/* Stats Container */}
      <div className="space-y-4 text-gray-300 text-lg sm:text-xl">
        {/* Total Likes */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="font-semibold">👍 Total Likes:</span>
          <span className="text-green-400 font-bold text-lg sm:text-xl">
            {totalLikes.toLocaleString()}
          </span>
        </div>

        {/* Total Comments */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="font-semibold">💬 Total Comments:</span>
          <span className="text-blue-400 font-bold text-lg sm:text-xl">
            {totalComments.toLocaleString()}
          </span>
        </div>

        {/* Likes-to-Views Ratio */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="font-semibold">🔥 Likes-to-Views Ratio:</span>
          <span className="text-orange-400 font-bold text-lg sm:text-xl">
            {likesToViewsRatio}%
          </span>
        </div>

        {/* Comments-to-Views Ratio */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="font-semibold">💬 Comments-to-Views Ratio:</span>
          <span className="text-teal-400 font-bold text-lg sm:text-xl">
            {commentsToViewsRatio}%
          </span>
        </div>

        {/* Total Engagement */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">⚡ Total Engagement:</span>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text font-bold text-lg sm:text-xl">
            {totalEngagementToViewsRatio}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default EngagementStats;
