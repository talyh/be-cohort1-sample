const express = require("express");
const { check, body } = require("express-validator");

const {
  listCommunityGroups,
  getCommunityGroup,
  addCommunityGroup,
  deleteCommunityGroup
} = require("./community_groups.contoller");

const router = express.Router();

router.get("", listCommunityGroups);
router.get("/:id", getCommunityGroup);
router.post(
  "",
  [
    check("name", "Name is invalid")
      .notEmpty()
      .isString(),
    check("description", "Description is invalid")
      .if(body("description").exists())
      .notEmpty()
      .isString(),
    check("location", "Location is invalid")
      .notEmpty()
      .isString()
  ],
  addCommunityGroup
);
router.delete("/:id", deleteCommunityGroup);

module.exports = {
  communityGroups: router
};
