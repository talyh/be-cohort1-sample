const data = require("../../../db/communityGtoups.data.json");

const listCommunityGroups = (req, res) => {
  return res.json(data);
};

const getCommunityGroup = (req, res) => {
  console.log(req.params.id);
  // const record = data.filter(record => record.id === req.params.id);
  // console.log(record);
};

module.exports = {
  listCommunityGroups,
  getCommunityGroup
};
