const express = require("express");
const threadCreateSchema = require("../validator/thread");
const validateSchema = require("../middlewares/validator");
const authenticate = require("../middlewares/authentication");
const threadController = require("../controllers/threadController");

const threadRouter = express.Router();
threadRouter.get("/:threadId/posts", authenticate, threadController.getAllPosts);
threadRouter.put("/", authenticate, validateSchema(threadCreateSchema), threadController.create);

module.exports = threadRouter;
