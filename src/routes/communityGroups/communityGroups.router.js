const express = require("express");

const {
  listCommunityGroups,
  getCommunityGroup
} = require("./communityGroups.contoller");

const router = express.Router();

router.get("", listCommunityGroups);
router.get("/:id", getCommunityGroup);

module.exports = {
  communityGroups: router
};
