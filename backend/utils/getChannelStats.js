const axios = require('axios');
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const getChannelStats = async (channelId) => {
    try {
        const response = await axios.get(`${BASE_URL}/channels`, {
            params: {
                key: API_KEY,
                id: channelId,
                part: 'snippet,statistics'
            }
        });

        const channelData = response.data.items?.[0];

        if (!channelData) {
            return null;
        }

        // Extracting the channel creation year
        const createdAt = channelData.snippet?.publishedAt;
        const creationYear = createdAt ? new Date(createdAt).getFullYear() : "N/A";
        const currentYear = new Date().getFullYear();
        const yearsActive = createdAt ? currentYear - creationYear : "N/A";

        return {
            channelName: channelData.snippet?.title || "N/A",
            subscriberCount: channelData.statistics?.subscriberCount || "N/A",
            videoCount: channelData.statistics?.videoCount || "N/A",
            viewCount: channelData.statistics?.viewCount || "N/A",
            creationYear,
            yearsActive: `${yearsActive} years`
        };
    } catch (error) {
        console.error("Error fetching Channel Stats:", error.message);
        return null;
    }
};

module.exports = getChannelStats;
