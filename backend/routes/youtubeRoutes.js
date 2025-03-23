const express = require("express");
const { stats } = require("../controllers/youtubeControllers");

const router = express.Router();

router.get("/find-channel-id",stats);

module.exports = router;
