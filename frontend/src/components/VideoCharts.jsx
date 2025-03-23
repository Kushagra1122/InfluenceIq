import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const VideoCharts = ({ videoStats }) => {
  const formattedVideos = videoStats.map((video) => ({
    ...video,
    formattedDate: new Date(video.publishedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  const longVideos = formattedVideos.filter((v) => !v.isShort).slice(0, 10);
  const shortVideos = formattedVideos.filter((v) => v.isShort).slice(0, 10);

  const handleBarClick = (data) => {
    if (data.videoUrl) {
      window.open(data.videoUrl, "_blank");
    }
  };

  return (
    <div className="mt-8 p-6 rounded-xl shadow-xl border border-gray-700 bg-gray-900/90 backdrop-blur-lg">
      <h2 className="text-3xl font-bold text-center text-[#85b50b] drop-shadow-lg mb-5">
        📊 Video Performance
      </h2>
      <p className="text-center text-gray-300 text-sm  font-medium italic mb-5 px-4 py-2 bg-gray-800/60 rounded-lg shadow-md border border-gray-700">
        🎯 Click on a bar to watch the video!
      </p>

      {longVideos.length > 0 && (
        <div className="mt-6 p-6 bg-gray-800/90 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center text-yellow-400 mb-4">
            🎥 Long-Form Videos{" "}
            <span className="text-gray-400">(Views vs Date)</span>
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={longVideos} className="mt-2">
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis
                dataKey="formattedDate"
                tick={{ fill: "#ddd", fontSize: 12 }}
                tickLine={{ stroke: "#666" }}
                interval={0}
              />
              <YAxis
                tick={{ fill: "#ddd", fontSize: 12 }}
                tickLine={{ stroke: "#666" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#222",
                  borderColor: "#555",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff", fontWeight: "bold" }}
                itemStyle={{ color: "#ddd" }}
              />
              <Bar
                dataKey="views"
                fill="#facc15"
                radius={[8, 8, 0, 0]}
                barSize={38}
                onClick={handleBarClick}
                cursor="pointer"
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {shortVideos.length > 0 && (
        <div className="mt-6 p-6 bg-gray-800/90 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center text-blue-400 mb-4">
            📱 YouTube Shorts{" "}
            <span className="text-gray-400">(Views vs Date)</span>
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={shortVideos} className="mt-2">
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis
                dataKey="formattedDate"
                tick={{ fill: "#ddd", fontSize: 12 }}
                tickLine={{ stroke: "#666" }}
                interval={0}
              />
              <YAxis
                tick={{ fill: "#ddd", fontSize: 12 }}
                tickLine={{ stroke: "#666" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#222",
                  borderColor: "#555",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff", fontWeight: "bold" }}
                itemStyle={{ color: "#ddd" }}
              />
              <Bar
                dataKey="views"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
                barSize={38}
                onClick={handleBarClick}
                cursor="pointer"
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default VideoCharts;
