const axios = require('axios');
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const getLatestVideoStats = async (channelId) => {
    try {
        const searchResponse = await axios.get(`${BASE_URL}/search`, {
            params: { key: API_KEY, channelId, part: 'id', maxResults: 1, order: 'date' }
        });

        if (!searchResponse.data.items?.length) return null;

        const latestVideoId = searchResponse.data.items[0].id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${latestVideoId}`;

        const videoResponse = await axios.get(`${BASE_URL}/videos`, {
            params: { key: API_KEY, id: latestVideoId, part: 'statistics,snippet,contentDetails' }
        });

        const video = videoResponse.data.items?.[0];
        if (!video) return null;

        // Extract thumbnail URL (defaulting to high resolution)
        const thumbnailUrl = video.snippet.thumbnails?.high?.url ||
            video.snippet.thumbnails?.medium?.url ||
            video.snippet.thumbnails?.default?.url;

        // Check if the video is a Short (duration <= 60s and vertical)
        const duration = video.contentDetails.duration; // Format: PT#M#S
        const isShort = /^PT([0-5]?[0-9]S|[0-5]?[0-9]M[0-5]?[0-9]S)$/.test(duration);

        return {
            title: video.snippet.title,
            isShort: isShort ? true : false,
            views: parseInt(video.statistics.viewCount || 0),
            likes: parseInt(video.statistics.likeCount || 0),
            comments: parseInt(video.statistics.commentCount || 0),
            thumbnail: thumbnailUrl,
            url: videoUrl
        };
    } catch (error) {
        console.error("Error fetching latest video stats:", error.message);
        return null;
    }
};

module.exports = getLatestVideoStats;
