const threadsModel = require("../models/thread");
const create = async (data, creator) => {
  let result = await threadsModel.create({ ...data, creator });
  if (result) return result;
  else return false;
};
const getAllInChan = async (chan_id) => {
  let result = await threadsModel.getAllByChan(chan_id);
  if (result) return result;
  else return false;
};

module.exports = {
  create,
  getAllInChan,
};
