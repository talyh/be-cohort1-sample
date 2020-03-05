const fs = require("fs");
const { promisify } = require("util");

const data = require("../../../db/communityGtoups.data.json");

const writeFile = promisify(fs.writeFile);

const listCommunityGroups = (req, res) => {
  return res.json(data);
};

const getCommunityGroup = (req, res) => {
  console.log(req.params.id);
  const record = data.filter(record => record.id === parseInt(req.params.id));
  console.log(record);
  res.send(record);
};

const addCommunityGroup = async (req, res) => {
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

module.exports = {
  listCommunityGroups,
  getCommunityGroup,
  addCommunityGroup
};
