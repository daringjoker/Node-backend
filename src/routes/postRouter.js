const express = require("express");
const chanCreateSchema = require("../validator/chans");
const validateSchema = require("../middlewares/validator");
const authenticate = require("../middlewares/authentication");
const postsController = require("../controllers/postController");

const postRouter = express.Router();
postRouter.get("/", authenticate, postsController.getAll);
postRouter.put("/", authenticate, postsController.create);
postRouter.delete("/:postId", authenticate, postsController.remove);
// postRouter.get("/:identifier", authenticate, postsController.getThreads);
module.exports = postRouter;
