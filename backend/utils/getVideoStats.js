const axios = require('axios');
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const getVideoStats = async (channelId) => {
    const today = new Date();
    const last30Days = new Date(today.setDate(today.getDate() - 30));

    let videos = [], nextPageToken = null;

    try {
        while (videos.length < 10) {
            const response = await axios.get(`${BASE_URL}/search`, {
                params: { key: API_KEY, channelId, part: 'id,snippet', maxResults: 50, order: 'date', pageToken: nextPageToken }
            });

            if (!response.data.items?.length) break;

            response.data.items.forEach(item => {
                if (item.id.videoId) {
                    let publishedAt = new Date(item.snippet.publishedAt);
                    if (publishedAt >= last30Days || videos.length < 10) {
                        videos.push({ videoId: item.id.videoId, publishedAt });
                    }
                }
            });

            nextPageToken = response.data.nextPageToken;
            if (!nextPageToken || videos.length >= 10) break;
        }

        if (!videos.length) return [];

        // Fetch video details
        const videoIds = videos.map(v => v.videoId).join(',');
        const videoData = await axios.get(`${BASE_URL}/videos`, {
            params: { key: API_KEY, id: videoIds, part: 'statistics,snippet,contentDetails' }
        });

        return videoData.data.items.map(video => {
            const duration = video.contentDetails.duration; // Format: PT#M#S
            const isShort = /^PT([0-5]?[0-9]S|[0-5]?[0-9]M[0-5]?[0-9]S)$/.test(duration);

            const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;

           
            return {
                title: video.snippet.title,
                isShort,
                views: parseInt(video.statistics.viewCount || 0),
                likes: parseInt(video.statistics.likeCount || 0),
                comments: parseInt(video.statistics.commentCount || 0),
                publishedAt: video.snippet.publishedAt,
                videoUrl
            };
        });
    } catch (error) {
        console.error("Error fetching video stats:", error.message);
        return [];
    }
};

module.exports = getVideoStats;
