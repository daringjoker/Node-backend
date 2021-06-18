const chansModel = require("../models/chans");
const threadsModel = require("../models/thread");

const create = async (data, creator) => {
  if (typeof data.chan_id === "string") {
    data.chan_id = await chansModel.getId(data.chan_id);
  }
  let result = await threadsModel.create({ ...data, creator });
  if (result) return result;
  else return false;
};

const getAllInChan = async (identifier) => {
  let chanId = await chansModel.getId(identifier);
  let result = await threadsModel.getAllByChan(chanId);
  if (result) return result;
  else return false;
};

module.exports = {
  create,
  getAllInChan,
};
