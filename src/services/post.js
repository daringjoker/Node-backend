const chansModel = require("../models/chans");
const threadsModel = require("../models/thread");
const postsModel = require("../models/posts");
const create = async (data, creator) => {
  let result = await threadsModel.create({ ...data, creator });
  if (result) return result;
  else return false;
};
const getAllPostsInThread = async (thread_id) => {
  let result = await postsModel.getByThread(thread_id);
  if (result) return result;
  else return false;
};

module.exports = {
  create,
  getAllPostsInThread,
};
