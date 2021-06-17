const userServices = require("../services/user");
const threadServices = require("../services/thread");
const { sendSuccess, sendFailure } = require("../utiliities/responses");

const create = async (req, res) => {
  let userId = await userServices.getId(req.verifiedUser.username);
  let result = await threadServices.create(req.body, userId);
  if (result) sendSuccess(res, "Successfully Created Thread", result);
  else sendFailure(res, "Thread Creation Failed");
};

const getAll = async (req, res) => {
  const chan_id = req.body.chan_id;
  const allThreads = await threadServices.getAllInChan(chan_id);
  if (allThreads) sendSuccess(res, "Succesfully Obtained All Threads For Chan " + chan_id, allThreads);
  else sendFailure(res, "Thread Retreival Failed");
};
module.exports = {
  create,
  getAll,
};
