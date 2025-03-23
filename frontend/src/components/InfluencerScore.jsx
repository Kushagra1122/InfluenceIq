import React from "react";

const calculateInfluencerScore = (data) => {
  if (!data || !data.channelStats || !data.computedStats || !data.latestVideo) {
    return { finalScore: "N/A", rating: "No Data" };
  }

  const logBase10 = (num) => Math.log10(Math.max(num, 1));

  const subscriberScore = Math.min(
    (logBase10(data.channelStats.subscriberCount + 1) / logBase10(10_000_000)) *
      40,
    40
  );
  const totalVideosScore = Math.min(
    (data.channelStats.videoCount / 1200) * 20,
    20
  );
  const totalViewsScore = Math.min(
    (logBase10(data.channelStats.viewCount + 1) / logBase10(1_000_000_000)) *
      20,
    20
  );
  const searchVolumeScore = Math.min(
    (data.computedStats.totalSearchVolume / 2000) * 20,
    20
  );

  const C =
    0.4 *
    (subscriberScore + totalVideosScore + totalViewsScore + searchVolumeScore);

  const videoUploadScore = Math.min(
    (data.channelStats.videoCount / 2000) * 40,
    40
  );
  const engagementOverTimeScore = Math.min(
    (logBase10(data.computedStats.avgViews + 1) / logBase10(500_000)) * 40,
    40
  );
  const spikesScore = Math.min((data.computedStats.spikesCount / 10) * 20, 20);

  const F = 0.3 * (videoUploadScore + engagementOverTimeScore + spikesScore);

  const engagementRate =
    data.computedStats.avgViews > 0
      ? data.computedStats.avgLikes / data.computedStats.avgViews
      : 0;
  const normalizedEngagementRate = Math.min((engagementRate / 0.02) * 50, 50);
  const avgCommentsScore = Math.min(
    (data.computedStats.avgComments / 700) * 30,
    30
  );
  const latestLikesScore = Math.min((data.latestVideo.likes / 15_000) * 20, 20);

  const M =
    0.3 * (normalizedEngagementRate + avgCommentsScore + latestLikesScore);

  const finalScore = parseFloat((C + F + M).toFixed(2));

  let rating = "🚫 (Very Low Influence)";
  if (finalScore >= 90) rating = "⭐⭐⭐⭐⭐ (Outstanding)";
  else if (finalScore >= 75) rating = "⭐⭐⭐⭐ (Excellent)";
  else if (finalScore >= 60) rating = "⭐⭐⭐ (Good)";
  else if (finalScore >= 40) rating = "⭐⭐ (Average)";
  else if (finalScore >= 20) rating = "⭐ (Below Average)";

  return { finalScore, rating };
};

import { useState } from "react";

const InfluencerScore = ({ stats }) => {
  const { finalScore, rating } = calculateInfluencerScore(stats);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 m-10">
      {/* Left Side: Score Display */}
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-2xl shadow-xl border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-2xl w-full md:w-1/2 text-center relative">
        <h2 className="text-3xl font-extrabold text-[#85b50b] mb-6 drop-shadow-lg">
          Influencer Score
        </h2>
        <p className="text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          {finalScore}
        </p>
        <p className="text-xl font-semibold text-yellow-400">{rating}</p>
      </div>

      <div className="bg-gray-900 bg-opacity-80 p-6 rounded-2xl shadow-xl border  border-gray-700 hover:shadow-2xl w-full md:w-1/2">
        <h2 className="text-2xl font-extrabold text-[#85b50b] mb-4 drop-shadow-lg text-center">
          Score Interpretation
        </h2>
        <table className="w-full text-sm text-gray-300 border-separate border-spacing-y-1">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-2 text-center">Score Range</th>
              <th className="p-2 text-center">Rating</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                range: "90 - 100",
                label: "⭐⭐⭐⭐⭐ Outstanding",
                color: "text-green-400",
              },
              {
                range: "75 - 89",
                label: "⭐⭐⭐⭐ Excellent",
                color: "text-blue-400",
              },
              {
                range: "60 - 74",
                label: "⭐⭐⭐ Good",
                color: "text-teal-400",
              },
              {
                range: "40 - 59",
                label: "⭐⭐ Average",
                color: "text-yellow-400",
              },
              {
                range: "20 - 39",
                label: "⭐ Below Average",
                color: "text-orange-400",
              },
              {
                range: "0 - 19",
                label: "🚫 Very Low Influence",
                color: "text-red-400",
              },
            ].map((row, index) => (
              <tr
                key={index}
                className="transition duration-300 hover:bg-gray-700 hover:shadow-md"
              >
                <td className="p-2 text-center">{row.range}</td>
                <td className={`p-2 text-center font-semibold ${row.color}`}>
                  {row.label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfluencerScore;
