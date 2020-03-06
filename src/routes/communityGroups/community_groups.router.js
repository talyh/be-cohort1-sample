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
  // validate the community group information, providing messages with enough information for the requester,
  // without overexposing our internal structure
  //  name -> mandatory string
  //  description -> optional string
  //  location -> mandatory string
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
  // validate the community group information, providing messages with enough information for the requester,
  // without overexposing our internal structure
  //  name -> optional string
  //  description -> optional string
  //  location -> optional string
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
