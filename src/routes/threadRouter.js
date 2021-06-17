const express = require("express");
const threadCreateSchema = require("../validator/thread");
const validateSchema = require("../middlewares/validator");
const authenticate = require("../middlewares/authentication");
const threadController = require("../controllers/threadController");

const threadRouter = express.Router();
threadRouter.get("/:chan_id", authenticate, threadController.getAll);
threadRouter.put("/", authenticate, validateSchema(threadCreateSchema), threadController.create);

module.exports = threadRouter;
