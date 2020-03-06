const express = require("express");
const { check, body } = require("express-validator");

const {
  listCommunityGroups,
  getCommunityGroup,
  addCommunityGroup,
  updateCommunityGroup,
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
router.put(
  "/:id",
  [
    check("name", "Name is invalid")
      .if(body("name").exists())
      .notEmpty()
      .isString(),
    check("description", "Description is invalid")
      .if(body("description").exists())
      .notEmpty()
      .isString(),
    check("location", "Location is invalid")
      .if(body("location").exists())
      .notEmpty()
      .isString()
  ],
  updateCommunityGroup
);
router.delete("/:id", deleteCommunityGroup);

module.exports = {
  communityGroups: router
};
