const axios = require('axios');
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const getChannelIdFromUrl = async (channelUrl) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: { key: API_KEY, q: channelUrl, type: 'channel', part: 'id' }
        });
        return response.data.items?.[0]?.id?.channelId || null;
    } catch (error) {
        console.error("Error fetching Channel ID:", error.message);
        return null;
    }
};

module.exports = getChannelIdFromUrl;