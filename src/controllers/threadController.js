const postServices = require("../services/post");
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
  const thread_id = req.params.threadId;
  const allThreads = await postServices.getAllPostsInThread(thread_id);
  if (allThreads) sendSuccess(res, "Succesfully Obtained All posts" + thread_id, allThreads);
  else sendFailure(res, "Thread Retreival Failed");
};

module.exports = {
  create,
  getAll,
};
