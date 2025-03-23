import React from "react";

const ChannelOverview = ({ stats }) => {
  return (
    <div className="bg-gray-900 bg-opacity-80 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mt-5 mb-8 sm:mb-10 text-[#85b50b] drop-shadow-lg">
        📌 Channel Overview
      </h2>

      {/* Stats Container */}
      <div className="space-y-4 text-gray-300 text-lg sm:text-xl">
        {/* Channel Name */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="font-semibold">👥 Channel Name:</span>
          <span className="text-white font-medium">
            {stats.channelStats?.channelName || "N/A"}
          </span>
        </div>

        {/* Creation Date */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="font-semibold">📅 Years Active:</span>
          <span className="text-white font-medium">
            {stats.channelStats?.yearsActive || "N/A"}
          </span>
        </div>

        {/* Subscribers */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="font-semibold">👥 Subscribers:</span>
          <span className="text-green-400 font-bold text-lg sm:text-xl">
            {stats.channelStats?.subscriberCount?.toLocaleString() || "N/A"}
          </span>
        </div>

        {/* Total Videos */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <span className="font-semibold">🎥 Total Videos:</span>
          <span className="text-blue-400 font-bold text-lg sm:text-xl">
            {stats.channelStats?.videoCount?.toLocaleString() || "N/A"}
          </span>
        </div>

        {/* Total Views */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">📈 Total Views:</span>
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text font-bold text-lg sm:text-xl">
            {stats.channelStats?.viewCount?.toLocaleString() || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChannelOverview;
