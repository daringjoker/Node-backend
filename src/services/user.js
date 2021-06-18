const userModel = require("../models/users");

const getUserDeep = async (username) => {
  let userData = await userModel.getByUsername(username);
  delete userData.hash;
  return userData;
};

const getUserShallow = async (username) => {
  let userData = await userModel.getByUsername(username);
  delete userData.hash;
  delete userData.is_deleted;
  delete userData.email;
  delete userData.updated_at;
  return userData;
};

const getId = async (username) => {
  let id = await userModel.getId(username);
  return id[0].id;
};
const getById = async (id) => {
  let userData = await userModel.getUserByField("id", id);
  delete userData.hash;
  delete userData.is_deleted;
  delete userData.email;
  delete userData.updated_at;
  return userData;
};
module.exports = {
  getUserDeep,
  getUserShallow,
  getId,
  getById,
};
