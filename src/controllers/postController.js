const postServices = require("../services/post");
const userServices = require("../services/user");
const threadServices = require("../services/thread");
const { sendSuccess, sendFailure } = require("../utiliities/responses");

const create = async (req, res) => {
  let userId = await userServices.getId(req.verifiedUser.username);
  let result = await postServices.create(req.body, userId);
  if (result) sendSuccess(res, "Post Created Successfully", result);
  else sendFailure(res, "Post Creation Failed");
};

const getAllPosts = async (req, res) => {
  const thread_id = req.params.threadId;
  const requester = req.verifiedUser.username;
  const allThreads = await postServices.getAllPostsInThread(thread_id, requester);
  if (allThreads) sendSuccess(res, "Succesfully Obtained All posts", allThreads);
  else sendFailure(res, "Thread Retreival Failed");
};
const getAll = async (req, res) => {
  const requester = req.verifiedUser.username;
  const allThreads = await postServices.getAllPosts(requester);
  if (allThreads) sendSuccess(res, "Succesfully Obtained All posts", allThreads);
  else sendFailure(res, "Thread Retreival Failed");
};
const remove = async (req, res) => {
  let post_id = req.params.postId;
  let requester = req.verifiedUser.username;
  const result = postServices.remove(post_id, requester);
  if (result) sendSuccess(res, "Successfully Deleted Post", result);
  else sendFailure(res, "Failed to delete post");
};
module.exports = {
  create,
  getAllPosts,
  remove,
  getAll,
};
