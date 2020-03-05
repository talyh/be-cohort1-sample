const express = require("express");

const { healthRouter } = require("../routes/health/health.router");
const {
  communityGroups
} = require("../routes/communityGroups/communityGroups.router");

const router = express.Router();
router.use("/health", healthRouter);
router.use("/communityGroups", communityGroups);

module.exports = router;
