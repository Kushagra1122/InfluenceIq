import React from "react";

const SearchBar = ({ url, setUrl, fetchStats, loading }) => {
  return (
    <div className="w-full max-w-lg bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-700 mx-auto">
      <h2 className="text-xl font-bold text-yellow-400 text-center mb-4 drop-shadow-lg">
        🔎 Search YouTube Channel
      </h2>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter YouTube Channel URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-4 pr-12 border border-gray-600 rounded-lg w-full text-white bg-gray-900 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔗
        </span>
      </div>
      <button
        onClick={fetchStats}
        className="w-full mt-4 px-5 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={loading || !url.trim()}
      >
        {loading ? "Fetching..." : "🚀 Fetch Stats"}
      </button>
    </div>
  );
};

export default SearchBar;
