const axios = require("axios");
const getChannelIdFromUrl = require("../utils/getChannelIdFromUrl");
const getChannelStats = require("../utils/getChannelStats");
const getVideoStats = require("../utils/getVideoStats");
const getLatestVideoStats = require("../utils/getLatestVideoStats");
const calculateStats = require("../utils/calculateStats");
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const stats =  async (req, res) => {
    const { channelUrl } = req.query;
    if (!channelUrl) return res.status(400).json({ error: 'Channel URL is required' });

    try {
        const channelId = await getChannelIdFromUrl(channelUrl);
        if (!channelId) return res.status(404).json({ error: 'Channel not found' });

        const [channelStats, videoStats, latestVideo] = await Promise.all([
            getChannelStats(channelId),
            getVideoStats(channelId),
            getLatestVideoStats(channelId)
        ]);

        if (!channelStats) return res.status(404).json({ error: 'Channel stats not found' });

        const channelInfo = await axios.get(`${BASE_URL}/channels`, {
            params: { key: API_KEY, id: channelId, part: 'snippet' }
        });
        const channelName = channelInfo.data.items?.[0]?.snippet?.title || "Unknown Channel";

        const computedStats = await calculateStats(channelStats, videoStats, channelName);
        console.log({ channelStats, computedStats, videoStats, latestVideo });
        res.json({ channelStats, computedStats, videoStats, latestVideo });

    } catch (error) {
        console.error("Backend error:", error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
module.exports = { stats };