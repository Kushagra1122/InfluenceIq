import React, { useState, useMemo } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ChannelOverview from "../components/ChannelOverview";
import EngagementStats from "../components/EngagementStats";
import AverageStats from "../components/AverageStats";
import LatestVideo from "../components/LatestVideo";
import VideoCharts from "../components/VideoCharts";
import InfluencerScore from "../components/InfluencerScore";

const Datas = () => {
  const [url, setUrl] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      let cleanedUrl = url.trim().split("?")[0]; // Remove query params
      const encodedUrl = encodeURIComponent(cleanedUrl);
      const finalUrl = `http://localhost:9000/api/youtube/channel-stats?channelUrl=${encodedUrl}`;

      const response = await axios.get(finalUrl);
      setStats(response.data);
    } catch (error) {
      setStats(null);
      setError("⚠️ Failed to fetch data. Please check the URL and try again.");
    }
    setLoading(false);
  };

  const formattedStats = useMemo(() => {
    if (!stats || !stats.videoStats) return null;
    return {
      ...stats,
      videoStats: stats.videoStats.map((v) => ({
        ...v,
        publishedAt: new Date(v.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      })),
    };
  }, [stats]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 text-white">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-[#85b50b] drop-shadow-lg">
        📊 YouTube Channel Stats
      </h1>

      {/* Search Bar Container */}
      <div className="w-full max-w-2xl flex justify-center items-center mb-8">
        <SearchBar
          url={url}
          setUrl={setUrl}
          fetchStats={fetchStats}
          loading={loading}
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-400 mt-4 font-semibold">{error}</p>}

      {/* Data Display */}
      {formattedStats && (
        <div className="mt-8 w-full max-w-7xl bg-gray-800 bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700">
          {/* Stats Grid */}
          <InfluencerScore stats={formattedStats} />

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChannelOverview stats={formattedStats} />
            <EngagementStats stats={formattedStats} />
            <AverageStats videoStats={formattedStats.videoStats} />
          </div>

          {/* Latest Video Section */}
          {formattedStats.latestVideo && (
            <div className="mt-8">
              <LatestVideo video={formattedStats.latestVideo} />
            </div>
          )}

          {/* Video Charts Section */}
          {formattedStats.videoStats?.length > 0 && (
            <div className="mt-8">
              <VideoCharts videoStats={formattedStats.videoStats} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Datas;
