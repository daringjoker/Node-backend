const userModel = require("../models/users");
const chansModel = require("../models/chans");
const postsModel = require("../models/posts");
const threadsModel = require("../models/thread");

const create = async (data, creator) => {
  if (data.chan_id === 0 && data.thread_id !== 0) {
    let thread = await threadsModel.getById(data.thread_id);
    data.chan_id = thread.chan_id;
  }
  let completePost = {
    ...data,
    author_id: creator,
  };
  let result = await postsModel.create(completePost);
  if (result) return result;
  else return false;
};

const getAllPostsInThread = async (thread_id, requester) => {
  let result = await postsModel.getByThread(thread_id);
  if (result) {
    let fullResult = await Promise.all(
      result.map(async (post) => {
        let author = await userModel.getUserByField("id", post.author_id);
        let editable = false;
        if (requester === author.username || requester === "daringjoker") editable = true;
        delete post.author_id;
        return {
          ...post,
          editable,
          author: {
            first_name: author.first_name,
            last_name: author.last_name,
            username: author.username,
            profile_picture: author.profile_picture,
          },
        };
      })
    );
    return fullResult;
  } else return false;
};

const getAllPosts = async (requester) => {
  let result = await postsModel.getAll();
  if (result) {
    let fullResult = await Promise.all(
      result.map(async (post) => {
        let author = await userModel.getUserByField("id", post.author_id);
        let thread = await threadsModel.getById(post.thread_id);
        let chan = await chansModel.getById(post.chan_id);

        let editable = false;
        if (requester === author.username || requester === "daringjoker") editable = true;
        delete post.author_id;
        return {
          ...post,
          editable,
          author: {
            first_name: author.first_name,
            last_name: author.last_name,
            username: author.username,
            profile_picture: author.profile_picture,
          },
          thread,
          chan: {
            identifier: chan.identifier,
            name: chan.name,
          },
        };
      })
    );
    return fullResult;
  } else return false;
};

const remove = async (post_id, requester) => {
  let result = await postsModel.remove(post_id);
  if (result) return result;
  else return false;
};

module.exports = {
  create,
  getAllPostsInThread,
  remove,
  getAllPosts,
};
