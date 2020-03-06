const fs = require("fs");
const { promisify } = require("util");
const { validationResult } = require("express-validator");

const data = require("../../../db/communityGtoups.data.json");

const writeFile = promisify(fs.writeFile);

const listCommunityGroups = (req, res) => {
  return res.json(data);
};

const getCommunityGroup = (req, res) => {
  const record = data.filter(record => record.id === parseInt(req.params.id));
  res.send(record);
};

const addCommunityGroup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = data.length + 1;
  const newCommunityGroupsData = [...data, { id, ...req.body }];
  await writeFile(
    "db/communityGtoups.data.json",
    JSON.stringify(newCommunityGroupsData)
  );
  res.status(201);
  return res.json({
    id,
    ...req.body
  });
};

const updateCommunityGroup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let groupData;

  const newCommunityGroupsData = data.map(group => {
    if (group.id === parseInt(req.params.id)) {
      groupData = { ...group, ...req.body };
      return groupData;
    }

    return group;
  });

  await writeFile(
    "db/communityGtoups.data.json",
    JSON.stringify(newCommunityGroupsData)
  );
  res.status(200);
  return res.json(groupData);
};

const deleteCommunityGroup = async (req, res) => {
  const newCommunityGroupsData = data.filter(
    group => group.id !== parseInt(req.params.id)
  );
  await writeFile(
    "db/communityGtoups.data.json",
    JSON.stringify(newCommunityGroupsData)
  );
  res.status(200);
  res.send();
};

module.exports = {
  listCommunityGroups,
  getCommunityGroup,
  addCommunityGroup,
  updateCommunityGroup,
  deleteCommunityGroup
};
