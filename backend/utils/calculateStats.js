const googleTrends = require("google-trends-api");

const calculateStats = async (channelStats, videoStats, channelName) => {
    const totalViews = parseInt(channelStats.viewCount || 0);
    const totalSubscribers = parseInt(channelStats.subscriberCount || 0);
    const totalVideos = parseInt(channelStats.videoCount || 1);

    let totalLikes = 0, totalComments = 0, totalViews30d = 0;
    videoStats.forEach(video => {
        totalLikes += video.likes;
        totalComments += video.comments;
        totalViews30d += video.views;
    });

    const avgViews = videoStats.length ? totalViews30d / videoStats.length : 0;
    const avgLikes = videoStats.length ? totalLikes / videoStats.length : 0;
    const avgComments = videoStats.length ? totalComments / videoStats.length : 0;

    // **Google Trends Data**
    let searchTrendData = [], totalSearchVolume = 0, spikesCount = 0;
    try {
        const trendResponse = await googleTrends.interestOverTime({
            keyword: channelName,
            startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            geo: ""
        });

        const trendJSON = JSON.parse(trendResponse);
        searchTrendData = trendJSON.default.timelineData.map(d => ({
            date: d.formattedTime,
            searchVolume: d.value[0]
        }));


        for (let i = 1; i < searchTrendData.length; i++) {
            const prevVolume = searchTrendData[i - 1].searchVolume;
            const currVolume = searchTrendData[i].searchVolume;

            if (prevVolume > 0 && currVolume > prevVolume * 1.3) {
                spikesCount++;
            }
        }

        totalSearchVolume = searchTrendData.reduce((sum, d) => sum + d.searchVolume, 0);
    } catch (error) {
        console.error("Error fetching Google Trends:", error.message);
    }

    return {
        totalViews, totalSubscribers, totalVideos,
        totalLikes, totalComments, videoCount30d: videoStats.length, totalViews30d,
        avgViews, avgLikes, avgComments,
        totalSearchVolume, spikesCount 
    };
};
module.exports = calculateStats;