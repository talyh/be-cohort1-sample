const express = require("express");

const { healthRouter } = require("../routes/health/health.router");
const {
  communityGroups
} = require("../routes/communityGroups/community_groups.router");

const router = express.Router();
router.use("/health", healthRouter);
router.use("/community_groups", communityGroups);

module.exports = router;
