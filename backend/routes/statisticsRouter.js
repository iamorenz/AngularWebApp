const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");

router.get("/statistics", statisticsController.getAppStatistics);

module.exports = router;
