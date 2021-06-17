const chansModel = require("../models/chans");
const userServices = require("./user");

const getAll = async () => {
  let chans = chansModel.getVerified();
  if (chans) return chans;
  else return false;
};

const createNew = async (data, username) => {
  let { name, identifier, color, description, rules, visibility } = data;
  let admin_id = await userServices.getId(username);
  let approved = admin_id === 1 || username === "daringjoker";
  let fullchanData = {
    name,
    identifier,
    color,
    description,
    rules,
    visibility,
    admin_id,
    approved,
    is_deleted: false,
    archived: false,
  };
  let result = await chansModel.create(fullchanData);
  if (result) return result;
  else return false;
};

module.exports = {
  getAll,
  createNew,
};
