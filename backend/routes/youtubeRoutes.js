const express = require("express");
const { stats } = require("../controllers/youtubeControllers");

const router = express.Router();

router.get("/channel-stats",stats);

module.exports = router;
