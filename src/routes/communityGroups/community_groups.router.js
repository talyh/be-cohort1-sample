const express = require("express");

const {
  listCommunityGroups,
  getCommunityGroup,
  addCommunityGroup
} = require("./community_groups.contoller");

const router = express.Router();

router.get("", listCommunityGroups);
router.get("/:id", getCommunityGroup);
router.post("", addCommunityGroup);

module.exports = {
  communityGroups: router
};
