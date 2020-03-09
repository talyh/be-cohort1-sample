const fs = require("fs");
const { promisify } = require("util");

const { ERROR_CODES } = require("../../middleware/error-handler");

const data = require("../../../db/communityGroups.data.json");

const writeFile = promisify(fs.writeFile);

const dbPath = "db/communityGtoups.data.json";

// return all community groups
const listCommunityGroups = (req, res) => {
  return res.status(200).json(data);
};

// get a community group by its id if it exists
const getCommunityGroup = (req, res) => {
  const record = data.filter(
    record => record.id === parseInt(req.params.id)
  )[0];

  if (!record) {
    throw new Error(
      JSON.stringify({
        status: ERROR_CODES.NOT_FOUND,
        message: "Record not found"
      })
    );
  }

  return res.status(200).json(record);
};

// add a community group
const addCommunityGroup = async (req, res) => {
  const id = data.length + 1;
  const newCommunityGroupsData = [...data, { id, ...req.body }];
  await writeFile(dbPath, JSON.stringify(newCommunityGroupsData));
  return res.status(201).json({
    id,
    ...req.body
  });
};

// update a communityGroup by its id
const updateCommunityGroup = async (req, res) => {
  let groupData;

  const newCommunityGroupsData = data.map(group => {
    if (group.id === parseInt(req.params.id)) {
      groupData = { ...group, ...req.body };
      return groupData;
    }

    return group;
  });

  await writeFile(dbPath, JSON.stringify(newCommunityGroupsData));

  // to avoid overexposure of data, we don't inform if the requested record wasn't available
  return res.status(200).json(groupData);
};

// delete a communityGroup by its id if it exists
const deleteCommunityGroup = async (req, res) => {
  const newCommunityGroupsData = data.filter(
    group => group.id !== parseInt(req.params.id)
  );
  await writeFile(dbPath, JSON.stringify(newCommunityGroupsData));

  // to avoid overexposure of data, we don't inform if the requested record wasn't available
  return res.status(200).send();
};

module.exports = {
  listCommunityGroups,
  getCommunityGroup,
  addCommunityGroup,
  updateCommunityGroup,
  deleteCommunityGroup
};
